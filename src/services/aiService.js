// src/services/aiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Helper function to count words accurately
const countWords = (text) => {
  if (!text || typeof text !== 'string') return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// Helper function to truncate to exactly specified word count
const truncateToWordCount = (text, maxWords = 100) => {
  if (!text || typeof text !== 'string') return '';
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
};

// Helper function to check if query is relevant to allowed topics
const isRelevantQuery = (message) => {
  if (!message || typeof message !== 'string') return false;
  
  const allowedTopics = [
    // Content creation keywords
    'content', 'write', 'create', 'article', 'blog', 'post', 'text', 'copy', 'draft',
    'generate', 'compose', 'writing', 'story', 'essay', 'paragraph', 'headline',
    'title', 'description', 'marketing', 'social media', 'email', 'newsletter',
    
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
  return "I specialize in content creation and plagiarism checking. Please ask questions related to these topics, and I'll provide helpful assistance within my expertise areas.";
};

// Enhanced error handling wrapper
const handleAIRequest = async (requestFn, fallbackMessage) => {
  try {
    return await requestFn();
  } catch (error) {
    console.error('AI Service Error:', error);
    
    // Handle specific error types
    if (error.message?.includes('API_KEY')) {
      return "API key error. Please check your configuration.";
    }
    if (error.message?.includes('quota') || error.message?.includes('limit')) {
      return "Service temporarily unavailable due to usage limits. Please try again later.";
    }
    if (error.message?.includes('network') || error.message?.includes('fetch')) {
      return "Network error. Please check your connection and try again.";
    }
    
    return fallbackMessage || "Sorry, I encountered a technical issue. Please try again.";
  }
};

/**
 * Get a response from Gemini AI
 * @param {string} message - The user's message
 * @param {string} context - Additional context for the conversation
 * @param {number} maxWords - Maximum words in response (default: 100)
 * @returns {Promise<string>} - The AI's response
 */
export const getAIResponse = async (message, context = '', maxWords = 100) => {
  if (!message || typeof message !== 'string') {
    return "Please provide a valid message.";
  }

  return handleAIRequest(async () => {
    // Check if the query is relevant
    if (!isRelevantQuery(message)) {
      return getIrrelevantResponse();
    }

    // Enhanced instruction for precise word limit
    const summaryInstruction = `
    CRITICAL INSTRUCTIONS:
    1. Your response must be EXACTLY ${maxWords} words or less
    2. Focus only on content creation or plagiarism checking topics
    3. Be concise, clear, and directly answer the question
    4. Do not exceed ${maxWords} words under any circumstances
    5. If the topic is outside your expertise (content, plagiarism), politely redirect
    6. Count your words carefully and stay within the limit
    `;
    
    const prompt = context
      ? `${context}\n\nUser: ${message}\n\n${summaryInstruction}\n\nAssistant:`
      : `User: ${message}\n\n${summaryInstruction}\n\nAssistant:`;

    const generationConfig = {
      maxOutputTokens: Math.min(maxWords * 2, 200), // Approximate token limit
      temperature: 0.3, // Lower for more controlled responses
      topK: 20,
      topP: 0.8,
      candidateCount: 1
    };

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    let responseText = response.text();
    
    // Clean up response
    responseText = responseText.trim();
    
    // Ensure the response doesn't exceed word limit
    responseText = truncateToWordCount(responseText, maxWords);
    
    return responseText;
  }, "Sorry, I encountered a technical issue. Please try again with questions about content creation or plagiarism checking.");
};

/**
 * Generate content based on a prompt
 * @param {string} prompt - The content generation prompt
 * @param {Object} options - Generation options
 * @returns {Promise<string>} - Generated content
 */
export const generateContent = async (prompt, options = {}) => {
  if (!prompt || typeof prompt !== 'string') {
    return "Please provide a valid content generation prompt.";
  }

  return handleAIRequest(async () => {
    // Check if the query is relevant to content creation
    if (!isRelevantQuery(prompt)) {
      return getIrrelevantResponse();
    }

    const maxWords = options.maxWords || 100;
    const enhancedPrompt = `
    Create content based on: ${prompt}
    
    REQUIREMENTS:
    - Response must be EXACTLY ${maxWords} words or less
    - Focus on content creation assistance
    - Be practical and actionable
    - Maintain high quality despite word limit
    - Count words carefully to stay within limit
    `;

    const generationConfig = {
      temperature: options.temperature || 0.6,
      topK: options.topK || 25,
      topP: options.topP || 0.85,
      maxOutputTokens: options.maxOutputTokens || Math.min(maxWords * 2, 200),
      candidateCount: 1
    };

    const result = await model.generateContent({
      contents: [{ parts: [{ text: enhancedPrompt }] }],
      generationConfig,
    });

    const response = await result.response;
    let responseText = response.text().trim();
    
    // Ensure word limit compliance
    responseText = truncateToWordCount(responseText, maxWords);
    
    return responseText;
  }, "Error generating content. Please try again.");
};

/**
 * Check content for plagiarism indicators
 * @param {string} content - The content to check
 * @param {number} maxWords - Maximum words in response
 * @returns {Promise<string>} - Plagiarism analysis results
 */
export const checkPlagiarism = async (content, maxWords = 100) => {
  if (!content || typeof content !== 'string') {
    return "Please provide valid content to check for plagiarism.";
  }

  return handleAIRequest(async () => {
    const prompt = `
    Analyze this content for potential plagiarism indicators: "${content.slice(0, 500)}"
    
    Provide analysis covering:
    1. Common phrase patterns
    2. Citation requirements
    3. Originality assessment
    4. Areas needing rewriting
    5. Improvement suggestions
    
    STRICT REQUIREMENT: Response must be exactly ${maxWords} words or less. Provide specific, actionable feedback.
    `;
    
    const generationConfig = {
      maxOutputTokens: Math.min(maxWords * 2, 200),
      temperature: 0.3,
      topK: 15,
      topP: 0.7,
      candidateCount: 1
    };

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    let responseText = response.text().trim();
    
    return truncateToWordCount(responseText, maxWords);
  }, "Error checking content for plagiarism. Please try again.");
};

/**
 * Store conversation history (using memory instead of localStorage)
 * @param {Array} history - Array of conversation objects
 */
export const storeConversationHistory = (history) => {
  try {
    if (!Array.isArray(history)) {
      console.warn('Invalid history format. Expected array.');
      return;
    }
    
    // Store in memory instead of localStorage for artifacts compatibility
    if (typeof window !== 'undefined') {
      window.chatbotHistory = history;
    }
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
    if (typeof window !== 'undefined' && window.chatbotHistory) {
      return Array.isArray(window.chatbotHistory) ? window.chatbotHistory : [];
    }
    return [];
  } catch (error) {
    console.error('Error retrieving conversation history:', error);
    return [];
  }
};

/**
 * Clear conversation history
 */
export const clearConversationHistory = () => {
  try {
    if (typeof window !== 'undefined') {
      window.chatbotHistory = [];
    }
  } catch (error) {
    console.error('Error clearing conversation history:', error);
  }
};

/**
 * Validate API configuration
 * @returns {boolean} - Whether the API is properly configured
 */
export const validateAPIConfig = () => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    return !!(apiKey && apiKey.length > 10);
  } catch (error) {
    console.error('Error validating API config:', error);
    return false;
  }
};