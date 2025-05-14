from flask import Flask, request, jsonify
import requests
import pandas as pd
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import re
from flask_cors import CORS
import logging
from requests.exceptions import RequestException

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["https://rangmanch.vercel.app", "http://localhost:3000"]}})

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Download VADER lexicon for sentiment analysis
nltk.download('vader_lexicon', quiet=True)

# Initialize sentiment analyzer
sid = SentimentIntensityAnalyzer()

@app.route('/api/analyze-sentiment', methods=['POST'])
def analyze_sentiment_api():
    """API endpoint to analyze Instagram post sentiment"""
    logger.debug("Received request: %s", request.get_json())
    
    data = request.get_json()
    
    if not data or 'post_url' not in data:
        logger.error("Missing post_url parameter")
        return jsonify({'error': 'Missing post_url parameter'}), 400
    
    post_url = data['post_url']
    api_key = "apify_api_DAzioTzy8gewH5OU9dPaZJYyUYk9Lg0a2z83"  # TODO: Replace with your Apify API key
    
    try:
        post_info, comments = extract_comments_with_apify(post_url, api_key)
        
        if isinstance(comments, str):
            logger.error("Apify error: %s", comments)
            return jsonify({'error': comments}), 400
        
        sentiment_results = analyze_sentiment(comments)
        summary_data = generate_summary_data(post_info, sentiment_results)
        
        logger.debug("Returning response: %s", summary_data)
        return jsonify(summary_data)
    
    except Exception as e:
        logger.error("Server error: %s", str(e))
        return jsonify({'error': 'Internal server error: ' + str(e)}), 500

def extract_comments_with_apify(post_url: str, api_key: str, max_comments: int = 200) -> tuple:
    """
    Extract Instagram comments using Apify API
    """
    logger.debug("Processing post URL: %s", post_url)
    
    shortcode_match = re.search(r'instagram\.com/(?:p|reel)/([^/?]+)', post_url)
    if not shortcode_match:
        return None, "Invalid Instagram URL"
    
    shortcode = shortcode_match.group(1)
    logger.debug("Extracted shortcode: %s", shortcode)
    
    api_url = "https://api.apify.com/v2/actor-tasks/deaniket1234~instagram-comments-scraper-task/run-sync-get-dataset-items"
    params = {"token": api_key}
    
    payload = {
        "directUrls": [post_url],
        "maxComments": max_comments,
        "maxPages": 10
    }
    
    headers = {"Content-Type": "application/json"}
    
    for attempt in range(3):
        try:
            response = requests.post(api_url, json=payload, headers=headers, params=params, timeout=30)
            if response.status_code in [200, 201]:
                break
            logger.warning("Attempt %d failed with status %d: %s", attempt + 1, response.status_code, response.text)
        except RequestException as e:
            logger.warning("Attempt %d failed: %s", attempt + 1, str(e))
            if attempt == 2:
                return None, f"API request failed after 3 attempts: {str(e)}"
    
    if response.status_code not in [200, 201]:
        return None, f"API request failed with status code {response.status_code}: {response.text}"
    
    data = response.json()
    logger.debug("Total items in response: %d", len(data))
    
    if not data:
        return None, "No data returned from API"
    
    post_data = None
    for item in data:
        if 'postData' in item or 'postInfo' in item:
            post_data = item.get('postData', item.get('postInfo', {}))
            break
        
        if (item.get('isPostAuthor', False) and 
            (item.get('isVerified', False) or item.get('isCaption', False))):
            post_data = item
            break
    
    if not post_data and len(data) > 0:
        post_data = data[0]
    
    post_info = {'username': 'Unknown', 'shortcode': shortcode}
    
    if post_data and isinstance(post_data, dict):
        if 'ownerUsername' in post_data:
            post_info['username'] = post_data.get('ownerUsername')
        elif 'owner' in post_data and 'username' in post_data.get('owner', {}):
            post_info['username'] = post_data.get('owner', {}).get('username')
    
    if post_info['username'] == 'Unknown':
        for item in data:
            if item.get('isPostAuthor', False) or item.get('isCaption', False):
                if 'ownerUsername' in item:
                    post_info['username'] = item.get('ownerUsername')
                    break
        
        if post_info['username'] == 'Unknown' and len(data) > 0 and 'ownerUsername' in data[0]:
            post_info['username'] = data[0].get('ownerUsername')
    
    comments = []
    for item in data:
        if item.get('isCaption', False):
            logger.debug("Skipping caption: %s", item)
            continue
        
        if 'text' in item or 'commentText' in item:
            comment_text = item.get('text', item.get('commentText', ''))
            comment_username = item.get('ownerUsername', item.get('username', 'Unknown'))
            comments.append({
                'username': comment_username,
                'text': comment_text
            })
            logger.debug("Collected comment %d: %s", len(comments), comment_text)
    
    logger.debug("Total comments extracted: %d", len(comments))
    return post_info, comments

def analyze_sentiment(comments: list) -> list:
    """
    Analyze sentiment of comments using VADER
    """
    if not comments or len(comments) == 0:
        return []
        
    results = []
    
    for comment in comments:
        text = comment.get('text', '')
        if not text or not isinstance(text, str):
            continue
            
        sentiment = sid.polarity_scores(text)
        
        analyzed_comment = {
            'username': comment.get('username', 'Unknown'),
            'text': text,
            'compound': sentiment['compound'],
            'positive': sentiment['pos'],
            'negative': sentiment['neg'],
            'neutral': sentiment['neu']
        }
        
        if sentiment['compound'] >= 0.05:
            analyzed_comment['sentiment'] = 'Positive'
        elif sentiment['compound'] <= -0.05:
            analyzed_comment['sentiment'] = 'Negative'
        else:
            analyzed_comment['sentiment'] = 'Neutral'
        
        results.append(analyzed_comment)
    
    return results

def generate_summary_data(post_info: dict, sentiment_results: list) -> dict:
    """
    Generate a detailed summary of sentiment analysis results
    """
    if not sentiment_results or len(sentiment_results) == 0:
        return {"error": "No comments to analyze or no valid sentiment results."}
    
    df = pd.DataFrame(sentiment_results)
    total_comments = len(df)
    
    sentiment_counts = df['sentiment'].value_counts()
    positive_count = sentiment_counts.get('Positive', 0)
    negative_count = sentiment_counts.get('Negative', 0)
    neutral_count = sentiment_counts.get('Neutral', 0)
    
    positive_pct = (positive_count / total_comments) * 100 if total_comments > 0 else 0
    negative_pct = (negative_count / total_comments) * 100 if total_comments > 0 else 0
    neutral_pct = (neutral_count / total_comments) * 100 if total_comments > 0 else 0
    
    avg_sentiment = df['compound'].mean() if total_comments > 0 else 0
    
    sentiment_strength = "Neutral"
    if avg_sentiment > 0.15:
        sentiment_strength = "Strongly Positive"
    elif avg_sentiment > 0.05:
        sentiment_strength = "Positive"
    elif avg_sentiment < -0.15:
        sentiment_strength = "Strongly Negative"
    elif avg_sentiment < -0.05:
        sentiment_strength = "Negative"
    
    most_positive_idx = df['compound'].idxmax() if total_comments > 0 else None
    most_negative_idx = df['compound'].idxmin() if total_comments > 0 else None
    
    most_positive = df.loc[most_positive_idx].to_dict() if most_positive_idx is not None else None
    most_negative = df.loc[most_negative_idx].to_dict() if most_negative_idx is not None else None
    
    return {
        "post_info": {
            "username": post_info.get('username', 'Unknown'),
            "shortcode": post_info.get('shortcode', 'Unknown')
        },
        "stats": {
            "total_comments": total_comments,
            "avg_sentiment": float(avg_sentiment),
            "sentiment_strength": sentiment_strength,
            "positive_count": int(positive_count),
            "negative_count": int(negative_count),
            "neutral_count": int(neutral_count),
            "positive_pct": float(positive_pct),
            "negative_pct": float(negative_pct),
            "neutral_pct": float(neutral_pct)
        },
        "highlights": {
            "most_positive": most_positive,
            "most_negative": most_negative
        },
        "comments": sentiment_results
    }

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)