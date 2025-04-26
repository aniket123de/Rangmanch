import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContentSuggestion.css';

const ContentSuggestionPage = () => {
  const [creatorNiche, setCreatorNiche] = useState('');
  const [pastContent, setPastContent] = useState('');
  const [audience, setAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  // In ContentSuggestionPage.jsx
const generateSuggestions = async () => {
    if (!creatorNiche) {
      setError('Please enter your content niche');
      return;
    }
  
    setLoading(true);
    setError('');
    
    try {
      // Use relative path which will work in both development and production
      const response = await axios.post('/api/generate-suggestions', {
        creatorNiche,
        pastContent,
        audience
      });
      
      setSuggestions(response.data.suggestions);
    } catch (err) {
      setError('Failed to generate suggestions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-suggestion-page">
      <div className="content-suggestion-container">
        <h1>Content <span className="highlight">Inspiration</span> Engine</h1>
        <p className="subtitle">AI-powered suggestions tailored to your creative needs</p>
        
        <div className="input-section">
          <div className="input-group">
            <label htmlFor="creatorNiche">What's your content niche?</label>
            <input
              id="creatorNiche"
              type="text"
              value={creatorNiche}
              onChange={(e) => setCreatorNiche(e.target.value)}
              placeholder="e.g., Travel vlogs, Tech tutorials, Fitness coaching"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="pastContent">Describe your past content (optional)</label>
            <textarea
              id="pastContent"
              value={pastContent}
              onChange={(e) => setPastContent(e.target.value)}
              placeholder="Share some of your most successful content topics"
              rows={4}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="audience">Tell us about your audience (optional)</label>
            <textarea
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Age range, interests, engagement patterns"
              rows={4}
            />
          </div>
          
          <button 
            className="generate-btn"
            onClick={generateSuggestions}
            disabled={loading}
          >
            {loading ? 'Generating Ideas...' : 'Generate Content Ideas'}
          </button>
          
          {error && <p className="error-message">{error}</p>}
        </div>
        
        {suggestions.length > 0 && (
          <div className="suggestions-container">
            <h2>Your Content Suggestions</h2>
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="suggestion-item">
                  <h3>{suggestion.title}</h3>
                  <p>{suggestion.description}</p>
                  <div className="suggestion-meta">
                    <span className="tag">Estimated engagement: {suggestion.engagement}</span>
                    <span className="tag">Difficulty: {suggestion.difficulty}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSuggestionPage;