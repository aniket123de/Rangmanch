// src/services/aiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * Get a response from Gemini AI
 * @param {string} message - The user's message
 * @param {string} context - Additional context for the conversation
 * @returns {Promise<string>} - The AI's response
 */
export const getAIResponse = async (message, context = '') => {
  try {
    const prompt = context ? `${context}\n\nUser: ${message}` : message;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in AI request:', error);
    return "Sorry, I encountered a technical issue. Please try again later.";
  }
};

/**
 * Generate content based on a prompt
 * @param {string} prompt - The content generation prompt
 * @param {Object} options - Generation options
 * @returns {Promise<string>} - Generated content
 */
export const generateContent = async (prompt, options = {}) => {
  try {
    const generationConfig = {
      temperature: options.temperature || 0.7,
      topK: options.topK || 40,
      topP: options.topP || 0.95,
      maxOutputTokens: options.maxOutputTokens || 1024,
    };

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

/**
 * Get SEO optimization suggestions
 * @param {string} content - The content to optimize
 * @returns {Promise<Object>} - SEO suggestions
 */
export const getSEOSuggestions = async (content) => {
  try {
    const prompt = `Analyze the following content for SEO optimization and provide specific suggestions:\n\n${content}\n\nProvide suggestions for:\n1. Keyword optimization\n2. Meta description\n3. Title tag\n4. Content structure\n5. Internal linking opportunities`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting SEO suggestions:', error);
    throw error;
  }
};

/**
 * Check content for plagiarism
 * @param {string} content - The content to check
 * @returns {Promise<Object>} - Plagiarism analysis results
 */
export const checkPlagiarism = async (content) => {
  try {
    const prompt = `Analyze the following content for potential plagiarism and provide a detailed analysis:\n\n${content}\n\nCheck for:\n1. Similarity with common phrases\n2. Potential citation needs\n3. Originality score\n4. Areas that need rewriting`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error checking plagiarism:', error);
    throw error;
  }
};

/**
 * Store conversation history for learning
 * @param {Array} history - Array of conversation objects
 */
export const storeConversationHistory = (history) => {
  try {
    localStorage.setItem('chatbot_history', JSON.stringify(history));
  } catch (error) {
    console.error('Error storing conversation history:', error);
  }
};

/**
 * Retrieve conversation history
 * @returns {Array} - Stored conversation history or empty array
 */
export const getConversationHistory = () => {
  try {
    const history = localStorage.getItem('chatbot_history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error retrieving conversation history:', error);
    return [];
  }
};