import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaChartPie, FaComments, FaSmile, FaMeh, FaFrown, FaThumbsUp, FaThumbsDown, FaUser, FaClock, FaHeart } from 'react-icons/fa';
import BackgroundPattern from '../components/common/BackgroundPattern';
import AnimatedButton2 from '../components/common/AnimatedButton2';
import { getDirectApiUrl } from '../config/api';

const SentimentAnalysis = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate Instagram URL format
    const instagramUrlRegex = /https:\/\/www\.instagram\.com\/(p|reel)\/[A-Za-z0-9_-]+/;
    if (!instagramUrlRegex.test(url)) {
      setError('Please enter a valid Instagram post or reel URL');
      setIsLoading(false);
      return;
    }

    try {
      // Use the configured API URL from config
      const apiUrl = getDirectApiUrl('/analyze-sentiment');
      console.log('Making request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_url: url }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = `API request failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If we can't parse error JSON, use the default message
          const textError = await response.text();
          errorMessage = textError || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      // Transform the backend response to match frontend expectations
      const transformedResults = {
        post_info: data.post_info || { username: 'Unknown', shortcode: 'Unknown' },
        stats: {
          total_comments: data.stats?.total_comments || 0,
          avg_sentiment: data.stats?.avg_sentiment || 0,
          avg_confidence: data.stats?.avg_confidence || 0,
          sentiment_strength: data.stats?.sentiment_strength || 'Neutral',
          positive_count: data.stats?.positive_count || 0,
          negative_count: data.stats?.negative_count || 0,
          neutral_count: data.stats?.neutral_count || 0,
          positive_pct: data.stats?.positive_pct || 0,
          negative_pct: data.stats?.negative_pct || 0,
          neutral_pct: data.stats?.neutral_pct || 0
        },
        highlights: {
          most_positive: data.highlights?.most_positive || null,
          most_negative: data.highlights?.most_negative || null
        },
        comments: (data.comments || []).map(comment => ({
          ...comment,
          sentiment: comment.sentiment?.toLowerCase() || 'neutral',
          compound: comment.compound || 0,
          confidence: comment.confidence || 0,
          username: comment.username || 'Unknown',
          text: comment.text || '',
          reasoning: comment.reasoning || ''
        }))
      };

      setResults(transformedResults);
    } catch (err) {
      console.error('Error analyzing sentiment:', err);
      
      // Enhanced error handling for different types of errors
      let userFriendlyMessage = 'Failed to analyze sentiment. Please try again later.';
      
      if (err.message.includes('Authentication token was not provided')) {
        userFriendlyMessage = 'API configuration error: Authentication token not provided. Please contact support.';
      } else if (err.message.includes('APIFY_API_KEY not configured')) {
        userFriendlyMessage = 'Service temporarily unavailable: API key not configured. Please try again later.';
      } else if (err.message.includes('Invalid Instagram URL')) {
        userFriendlyMessage = 'Invalid Instagram URL. Please check the URL format and try again.';
      } else if (err.message.includes('No data returned from API')) {
        userFriendlyMessage = 'No comments found for this post or the post is private.';
      } else if (err.message.includes('Failed to fetch') || err.message.includes('Network Error')) {
        userFriendlyMessage = 'Network error: Unable to connect to the server. Please check your internet connection.';
      } else if (err.message) {
        userFriendlyMessage = err.message;
      }
      
      setError(userFriendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentIcon = (sentiment, size = "text-xl") => {
    const lowerSentiment = sentiment?.toLowerCase() || 'neutral';
    switch (lowerSentiment) {
      case 'positive':
        return <FaSmile className={`text-green-500 ${size}`} />;
      case 'neutral':
        return <FaMeh className={`text-yellow-500 ${size}`} />;
      case 'negative':
        return <FaFrown className={`text-red-500 ${size}`} />;
      default:
        return <FaMeh className={`text-gray-500 ${size}`} />;
    }
  };

  const getSentimentColor = (sentiment) => {
    const lowerSentiment = sentiment?.toLowerCase() || 'neutral';
    switch (lowerSentiment) {
      case 'positive':
        return 'from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border-green-100 dark:border-green-900/30';
      case 'neutral':
        return 'from-yellow-50 to-yellow-100/50 dark:from-yellow-900/20 dark:to-yellow-800/10 border-yellow-100 dark:border-yellow-900/30';
      case 'negative':
        return 'from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/10 border-red-100 dark:border-red-900/30';
      default:
        return 'from-gray-50 to-gray-100/50 dark:from-gray-700/20 dark:to-gray-600/10 border-gray-100 dark:border-gray-700/30';
    }
  };

  const getSentimentBadgeColor = (sentiment) => {
    const lowerSentiment = sentiment?.toLowerCase() || 'neutral';
    switch (lowerSentiment) {
      case 'positive':
        return 'bg-green-500/10 text-green-500';
      case 'neutral':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'negative':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <BackgroundPattern>
      <div className="min-h-screen w-full dark:bg-dark-bg transition-colors duration-300 pt-32 pb-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header with gradient text */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Instagram Sentiment Analysis
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mx-auto">
                Discover how people feel about your Instagram posts through comprehensive comment analysis
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-gray-100 dark:border-gray-700">
              {/* URL Input Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500 focus-within:bg-white dark:focus-within:bg-gray-700">
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-lg">
                    <FaInstagram className="text-2xl text-white" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter Instagram post URL (e.g., https://www.instagram.com/p/ABC123/)"
                    className="flex-1 p-3 bg-transparent border-none outline-none dark:text-white text-lg"
                    required
                  />
                </div>
                <AnimatedButton2 type="submit" disabled={isLoading} className="w-full py-4 text-lg font-medium">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                      <span>Analyzing comments...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FaChartPie className="text-lg" />
                      <span>Analyze Sentiment</span>
                    </div>
                  )}
                </AnimatedButton2>
              </form>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg border border-red-100 dark:border-red-900/30"
                >
                  <div className="flex items-center gap-2">
                    <FaFrown className="text-red-500" />
                    <span className="font-medium">Analysis Failed</span>
                  </div>
                  <p className="mt-1">{error}</p>
                  {error.includes('API key') && (
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>For Developers:</strong> This error indicates that the backend API keys are not properly configured. 
                        Please set up the APIFY_API_KEY and GROQ_API_KEY environment variables in your backend.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 space-y-8"
                >
                  {/* Post Info */}
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-xl p-6 border border-purple-100 dark:border-purple-900/30">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
                        <FaUser className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                          @{results.post_info?.username || 'Unknown'}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Post ID: {results.post_info?.shortcode || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Comments */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900/30 shadow-lg shadow-blue-500/5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg">
                          <FaComments className="text-white text-lg" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300">
                          Total Comments
                        </h3>
                      </div>
                      <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                        {results.stats?.total_comments || 0}
                      </span>
                    </motion.div>

                    {/* Overall Sentiment */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-xl p-6 border border-purple-100 dark:border-purple-900/30 shadow-lg shadow-purple-500/5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg shadow-lg">
                          <FaChartPie className="text-white text-lg" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300">
                          Sentiment Score
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                          {(results.stats?.avg_sentiment * 100).toFixed(1) || 0}%
                        </span>
                        {getSentimentIcon(results.stats?.sentiment_strength, "text-2xl")}
                      </div>
                    </motion.div>

                    {/* Positive Comments */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-xl p-6 border border-green-100 dark:border-green-900/30 shadow-lg shadow-green-500/5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg shadow-lg">
                          <FaThumbsUp className="text-white text-lg" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300">
                          Positive
                        </h3>
                      </div>
                      <div className="space-y-1">
                        <span className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                          {results.stats?.positive_count || 0}
                        </span>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          ({(results.stats?.positive_pct || 0).toFixed(1)}%)
                        </div>
                      </div>
                    </motion.div>

                    {/* Negative Comments */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gradient-to-br from-red-500/10 to-rose-500/10 dark:from-red-500/20 dark:to-rose-500/20 rounded-xl p-6 border border-red-100 dark:border-red-900/30 shadow-lg shadow-red-500/5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-br from-red-500 to-rose-600 p-2 rounded-lg shadow-lg">
                          <FaThumbsDown className="text-white text-lg" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300">
                          Negative
                        </h3>
                      </div>
                      <div className="space-y-1">
                        <span className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
                          {results.stats?.negative_count || 0}
                        </span>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          ({(results.stats?.negative_pct || 0).toFixed(1)}%)
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Highlights Section */}
                  {(results.highlights?.most_positive || results.highlights?.most_negative) && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                        Comment Highlights
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Most Positive */}
                        {results.highlights?.most_positive && (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border-green-100 dark:border-green-900/30 rounded-xl p-6 border shadow-lg"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="bg-green-500/10 text-green-500 p-3 rounded-full">
                                <FaHeart className="text-xl" />
                              </div>
                              <div>
                                <h4 className="font-bold text-green-800 dark:text-green-200">Most Positive Comment</h4>
                                <p className="text-sm text-green-600 dark:text-green-400">
                                  Score: {(results.highlights.most_positive.compound * 100).toFixed(1)}%
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">
                              "{results.highlights.most_positive.text}"
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                                {results.highlights.most_positive.username?.charAt(0).toUpperCase() || 'U'}
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                @{results.highlights.most_positive.username || 'Unknown'}
                              </span>
                            </div>
                          </motion.div>
                        )}

                        {/* Most Negative */}
                        {results.highlights?.most_negative && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/10 border-red-100 dark:border-red-900/30 rounded-xl p-6 border shadow-lg"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="bg-red-500/10 text-red-500 p-3 rounded-full">
                                <FaFrown className="text-xl" />
                              </div>
                              <div>
                                <h4 className="font-bold text-red-800 dark:text-red-200">Most Critical Comment</h4>
                                <p className="text-sm text-red-600 dark:text-red-400">
                                  Score: {(results.highlights.most_negative.compound * 100).toFixed(1)}%
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">
                              "{results.highlights.most_negative.text}"
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-red-500 to-rose-500 text-white flex items-center justify-center text-xs font-bold">
                                {results.highlights.most_negative.username?.charAt(0).toUpperCase() || 'U'}
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                @{results.highlights.most_negative.username || 'Unknown'}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Comments Analysis with Better Layout */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                        All Comments Analysis
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaClock className="text-xs" />
                        <span>Showing latest {results.comments?.length || 0} comments</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                      {!results.comments || results.comments.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                          <FaComments className="text-4xl mx-auto mb-3 opacity-50" />
                          <p>No comments available for analysis</p>
                        </div>
                      ) : (
                        results.comments.map((comment, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.01, x: 4 }}
                            transition={{ delay: index * 0.05 }}
                            className={`
                              rounded-xl p-5 shadow-md border transition-all duration-300
                              ${getSentimentColor(comment.sentiment)}
                            `}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`
                                p-3 rounded-full flex-shrink-0
                                ${getSentimentBadgeColor(comment.sentiment)}
                              `}>
                                {getSentimentIcon(comment.sentiment)}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                                    {comment.username?.charAt(0).toUpperCase() || 'U'}
                                  </div>
                                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                                    @{comment.username || 'Unknown'}
                                  </span>
                                  <div className={`
                                    px-2 py-1 rounded-full text-xs font-bold capitalize flex-shrink-0
                                    ${comment.sentiment === 'positive' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                      comment.sentiment === 'neutral' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}
                                  `}>
                                    {comment.sentiment}
                                  </div>
                                </div>
                                
                                <p className="text-gray-800 dark:text-gray-200 font-medium mb-3 leading-relaxed">
                                  {comment.text}
                                </p>
                                
                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                  <div className="flex items-center gap-1">
                                    <span>Confidence:</span>
                                    <span className="font-medium">
                                      {((comment.confidence || 0) * 100).toFixed(0)}%
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span>Score:</span>
                                    <span className="font-medium">
                                      {((comment.compound || 0) * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                  {comment.reasoning && (
                                    <div className="flex items-center gap-1 italic">
                                      <span>"{comment.reasoning}"</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Enhanced Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Get valuable insights into how your audience reacts to your Instagram content
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                <span>✨ AI-Powered Analysis</span>
                <span>•</span>
                <span>🔒 Privacy Focused</span>
                <span>•</span>
                <span>⚡ Real-time Results</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </BackgroundPattern>
  );
};

export default SentimentAnalysis;