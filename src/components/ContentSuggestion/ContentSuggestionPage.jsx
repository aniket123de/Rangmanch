import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './ContentSuggestion.css';

const StyledInputContainer = styled.div`
  .input-container {
    display: flex;
    background: white;
    border-radius: 1rem;
    background: linear-gradient(173deg, #23272f 0%, #14161a 100%);
    box-shadow: 10px 10px 20px #0e1013, -10px -10px 40px #383e4b;
    padding: 0.3rem;
    gap: 0.3rem;
    margin-bottom: 1.5rem;
  }

  .input-container input, 
  .input-container textarea {
    border-radius: 0.8rem;
    background: #23272f;
    box-shadow: inset 5px 5px 10px #0e1013, inset -5px -5px 10px #383e4b,
      0px 0px 100px rgba(255, 212, 59, 0), 0px 0px 100px rgba(255, 102, 0, 0);
    width: 100%;
    flex-basis: 100%;
    padding: 1rem;
    border: none;
    border: 1px solid transparent;
    color: white;
    transition: all 0.2s ease-in-out;
    font-family: 'Poppins', sans-serif;
  }

  .input-container textarea {
    min-height: 120px;
    resize: vertical;
  }

  .input-container input:focus, 
  .input-container textarea:focus {
    border: 1px solid #9d4edd;
    outline: none;
    box-shadow: inset 0px 0px 10px rgba(157, 78, 221, 0.5),
      inset 0px 0px 10px rgba(199, 125, 255, 0.5),
      0px 0px 100px rgba(157, 78, 221, 0.3),
      0px 0px 100px rgba(199, 125, 255, 0.3);
  }

  label {
    display: block;
    margin-bottom: 0.8rem;
    color: #ddff00;
    font-weight: 500;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
  }

  .label-icon {
    margin-right: 10px;
    font-size: 1.2rem;
  }

  @media (max-width: 500px) {
    .input-container {
      flex-direction: column;
    }

    .input-container input {
      border-radius: 0.8rem;
    }
  }
`;

const ContentSuggestionPage = () => {
  const [creatorNiche, setCreatorNiche] = useState('');
  const [pastContent, setPastContent] = useState('');
  const [audience, setAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  const generateSuggestions = async () => {
    if (!creatorNiche) {
      setError('Please enter your content niche');
      return;
    }
  
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('https://backend-rang-1.onrender.com/api/generate-suggestions', {
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
    <div className="content-suggestion-page" style={{ paddingTop: '10rem' }}>
      <div className="content-suggestion-container">
        <header className="page-header">
          <h1>Content <span className="highlight">Inspiration</span> Engine</h1>
          <p className="subtitle">AI-powered suggestions tailored to your creative needs</p>
          <div className="header-decoration"></div>
        </header>
        
        <div className="input-section">
          <StyledInputContainer>
            <div className="input-group">
              <label htmlFor="creatorNiche">
                <span className="label-icon">✏️</span> What's your content niche?
              </label>
              <div className="input-container">
                <input
                  id="creatorNiche"
                  type="text"
                  value={creatorNiche}
                  onChange={(e) => setCreatorNiche(e.target.value)}
                  placeholder="e.g., Travel vlogs, Tech tutorials, Fitness coaching"
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="pastContent">
                <span className="label-icon">📚</span> Describe your past content (optional)
              </label>
              <div className="input-container">
                <textarea
                  id="pastContent"
                  value={pastContent}
                  onChange={(e) => setPastContent(e.target.value)}
                  placeholder="Share some of your most successful content topics"
                  rows={4}
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="audience">
                <span className="label-icon">👥</span> Tell us about your audience (optional)
              </label>
              <div className="input-container">
                <textarea
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="Age range, interests, engagement patterns"
                  rows={4}
                />
              </div>
            </div>
          </StyledInputContainer>
          
          <div className="action-section">
            <button 
              className="generate-btn"
              onClick={generateSuggestions}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating Ideas...
                </>
              ) : (
                <>
                  <span className="btn-icon">✨</span> 
                  Generate Content Ideas
                </>
              )}
            </button>
            
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
        
        {suggestions.length > 0 && (
          <div className="suggestions-container">
            <h2>
              <span className="section-icon">💡</span> 
              Your Personalized Content Suggestions
            </h2>
            <p className="suggestions-subtitle">We analyzed your niche and audience to create these recommendations</p>
            
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="suggestion-item">
                  <div className="suggestion-number">{index + 1}</div>
                  <div className="suggestion-content">
                    <h3>{suggestion.title}</h3>
                    <p className="suggestion-description">{suggestion.description}</p>
                    <div className="suggestion-meta">
                      <span className="tag engagement-tag">
                        <span className="tag-icon">🔥</span> 
                        {suggestion.engagement}
                      </span>
                      <span className="tag difficulty-tag">
                        <span className="tag-icon">⚙️</span> 
                        {suggestion.difficulty}
                      </span>
                    </div>
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