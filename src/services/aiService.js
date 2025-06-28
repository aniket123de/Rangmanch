// src/services/aiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Helper function to count words
const countWords = (text) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// Helper function to truncate to exactly 100 words
const truncateTo100Words = (text) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= 100) return text;
  return words.slice(0, 100).join(' ') + '...';
};

// Helper function to check if query is relevant to allowed topics
const isRelevantQuery = (message) => {
  const allowedTopics = [
    // Content creation keywords
    'content', 'write', 'create', 'article', 'blog', 'post', 'text', 'copy', 'draft',
    'generate', 'compose', 'writing', 'story', 'essay', 'paragraph', 'headline',
    'title', 'description', 'marketing', 'social media', 'email', 'newsletter',
    
    // SEO keywords
    'seo', 'optimization', 'keyword', 'meta', 'search engine', 'ranking', 'traffic',
    'backlink', 'organic', 'serp', 'google', 'bing', 'search', 'optimize',
    
    // Plagiarism keywords
    'plagiarism', 'originality', 'duplicate', 'copy', 'citation', 'reference',
    'similarity', 'unique', 'original', 'check', 'verify', 'authenticity',
    
    // General AI assistance keywords
    'help', 'assist', 'question', 'answer', 'explain', 'clarify', 'understand',
    'how', 'what', 'why', 'when', 'where', 'can you', 'please', 'thanks', 'hello',
    'hi', 'goodbye', 'bye', 'thank you'
  ];
  
  const lowerMessage = message.toLowerCase();
  return allowedTopics.some(topic => lowerMessage.includes(topic));
};

// Standard response for irrelevant queries
const getIrrelevantResponse = () => {
  return "I specialize in content creation, SEO optimization, and plagiarism checking. Please ask questions related to these topics, and I'll provide helpful assistance within my expertise areas.";
};

/**
 * Get a response from Gemini AI
 * @param {string} message - The user's message
 * @param {string} context - Additional context for the conversation
 * @returns {Promise<string>} - The AI's response
 */
export const getAIResponse = async (message, context = '') => {
  try {
    // Check if the query is relevant
    if (!isRelevantQuery(message)) {
      return getIrrelevantResponse();
    }

    // Enhanced instruction for precise 100-word limit
    const summaryInstruction = `
    CRITICAL INSTRUCTIONS:
    1. Your response must be EXACTLY 100 words or less
    2. Focus only on content creation, SEO optimization, or plagiarism checking topics
    3. Be concise, clear, and directly answer the question
    4. Do not exceed 100 words under any circumstances
    5. If the topic is outside your expertise (content, SEO, plagiarism), politely redirect
    `;
    
    const prompt = context
      ? `${context}\n\nUser: ${message}\n\n${summaryInstruction}\n\nAssistant:`
      : `User: ${message}\n\n${summaryInstruction}\n\nAssistant:`;

    const generationConfig = {
      maxOutputTokens: 150, // Reduced for stricter control
      temperature: 0.5, // Lower temperature for more controlled responses
      topK: 20,
      topP: 0.8
    };

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    let responseText = response.text();
    
    // Ensure the response is exactly 100 words or less
    responseText = truncateTo100Words(responseText);
    
    return responseText;
  } catch (error) {
    console.error('Error in AI request:', error);
    return "Sorry, I encountered a technical issue. Please try again with questions about content creation, SEO optimization, or plagiarism checking.";
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
    // Check if the query is relevant to content creation
    if (!isRelevantQuery(prompt)) {
      return getIrrelevantResponse();
    }

    const enhancedPrompt = `
    Create content based on: ${prompt}
    
    REQUIREMENTS:
    - Response must be EXACTLY 100 words or less
    - Focus on content creation assistance
    - Be practical and actionable
    - Maintain high quality despite word limit
    `;

    const generationConfig = {
      temperature: options.temperature || 0.6,
      topK: options.topK || 25,
      topP: options.topP || 0.85,
      maxOutputTokens: options.maxOutputTokens || 150,
    };

    const result = await model.generateContent({
      contents: [{ parts: [{ text: enhancedPrompt }] }],
      generationConfig,
    });

    const response = await result.response;
    let responseText = response.text();
    
    // Ensure exactly 100 words or less
    responseText = truncateTo100Words(responseText);
    
    return responseText;
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
    const prompt = `
    Analyze for SEO optimization: ${content}
    
    Provide concise suggestions for:
    1. Keywords 2. Meta description 3. Title tag 4. Structure 5. Internal links
    
    LIMIT: Exactly 100 words or less. Be specific and actionable.
    `;
    
    const generationConfig = {
      maxOutputTokens: 150,
      temperature: 0.4,
      topK: 20,
      topP: 0.8
    };

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    let responseText = response.text();
    
    return truncateTo100Words(responseText);
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
    const prompt = `
    Analyze for plagiarism: ${content}
    
    Check: 1. Common phrases 2. Citation needs 3. Originality 4. Rewrite areas
    
    LIMIT: Exactly 100 words or less. Provide specific, actionable feedback.
    `;
    
    const generationConfig = {
      maxOutputTokens: 150,
      temperature: 0.3,
      topK: 15,
      topP: 0.7
    };

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    let responseText = response.text();
    
    return truncateTo100Words(responseText);
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
    // Store in memory instead of localStorage for artifacts compatibility
    window.chatbotHistory = history;
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
    return window.chatbotHistory || [];
  } catch (error) {
    console.error('Error retrieving conversation history:', error);
    return [];
  }
};