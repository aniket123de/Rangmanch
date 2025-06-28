// src/services/aiService.js - Enhanced with modular and proportional plagiarism checking
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
const truncateToWordCount = (text, maxWords = 150) => {
  if (!text || typeof text !== 'string') return '';
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
};

// Track if this is the first interaction
let hasHadFirstInteraction = false;

// Helper function to check if this is a first-time interaction needing introduction
const needsIntroduction = (message) => {
  if (hasHadFirstInteraction) return false;
  
  const greetings = ['hello', 'hi', 'hey', 'start', 'begin'];
  const lowerMessage = message.toLowerCase().trim();
  
  return greetings.some(greeting => lowerMessage.includes(greeting)) || 
         lowerMessage.length < 15;
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
 * Check if the topic is relevant to core functionality (content creation/plagiarism)
 */
const isCoreFunctionality = (message) => {
  const coreKeywords = [
    'plagiarism', 'check', 'originality', 'similarity', 'content', 'write', 'create', 
    'generate', 'article', 'blog', 'copy', 'text', 'ideas', 'concept', 'attribution'
  ];
  
  const lowerMessage = message.toLowerCase();
  return coreKeywords.some(keyword => lowerMessage.includes(keyword));
};

/**
 * Determine the appropriate analysis depth based on content characteristics
 */
const determineAnalysisDepth = (content) => {
  const wordCount = countWords(content);
  const contentLower = content.toLowerCase();
  
  // Check for complexity indicators
  const hasSpecificTerms = /\b(theory|framework|methodology|concept|model|approach|strategy)\b/i.test(content);
  const hasAcademicLanguage = /\b(research|study|analysis|investigation|hypothesis|conclusion)\b/i.test(content);
  const isQuestion = content.includes('?') || contentLower.startsWith('what') || contentLower.startsWith('how');
  const isSimpleIdea = wordCount < 20 && !hasSpecificTerms;
  
  if (isSimpleIdea || isQuestion) {
    return 'light';
  } else if (wordCount < 50 && !hasAcademicLanguage) {
    return 'moderate';
  } else if (hasSpecificTerms || hasAcademicLanguage || wordCount > 100) {
    return 'comprehensive';
  } else {
    return 'moderate';
  }
};

/**
 * Get a response from Gemini AI with reduced restrictions for non-core topics
 */
export const getAIResponse = async (message, context = '', maxWords = 150) => {
  if (!message || typeof message !== 'string') {
    return "Please provide a valid message.";
  }

  return handleAIRequest(async () => {
    // Check if we need to provide introduction for first-time users
    if (needsIntroduction(message)) {
      hasHadFirstInteraction = true;
      return "Hello! I'm your AI assistant. While I specialize in content creation and plagiarism checking, I'm here to help with any questions or topics you'd like to discuss. What can I help you with today?";
    }
    
    // Mark that we've had an interaction
    hasHadFirstInteraction = true;

    // Determine if this is core functionality or general conversation
    const isCoreFunction = isCoreFunctionality(message);
    
    // Create more flexible prompts based on topic relevance
    const summaryInstruction = isCoreFunction 
      ? `
      INSTRUCTIONS:
      1. Your response should be around ${maxWords} words (flexible limit - can go slightly over if needed)
      2. Focus on being helpful with content creation and plagiarism detection
      3. Be thorough and detailed in your analysis
      4. Provide actionable insights and recommendations
      5. You're an expert in content creation and originality analysis
      ` 
      : `
      INSTRUCTIONS:
      1. Your response should be conversational and helpful (around ${maxWords} words, flexible)
      2. Be knowledgeable and engaging on any topic
      3. Provide useful information and insights
      4. Feel free to be creative and comprehensive in your responses
      5. You're a knowledgeable AI assistant ready to help with anything
      `;
    
    const prompt = context
      ? `Context: ${context}\n\nUser: ${message}\n\n${summaryInstruction}\n\nAssistant:`
      : `User: ${message}\n\n${summaryInstruction}\n\nAssistant:`;

    // More flexible generation config
    const generationConfig = {
      maxOutputTokens: isCoreFunction ? Math.min(maxWords * 2, 300) : Math.min(maxWords * 2.5, 400),
      temperature: isCoreFunction ? 0.7 : 0.8,
      topK: 40,
      topP: 0.9,
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
    
    // More flexible word limit for non-core topics
    const flexibleLimit = isCoreFunction ? maxWords : Math.floor(maxWords * 1.3);
    responseText = truncateToWordCount(responseText, flexibleLimit);
    
    return responseText;
  }, "Sorry, I encountered a technical issue. Please try again.");
};

/**
 * Generate content based on a prompt with enhanced flexibility
 */
export const generateContent = async (prompt, options = {}) => {
  if (!prompt || typeof prompt !== 'string') {
    return "Please provide a valid content generation prompt.";
  }

  return handleAIRequest(async () => {
    const maxWords = options.maxWords || 200;
    const enhancedPrompt = `
    Create high-quality content based on: ${prompt}
    
    REQUIREMENTS:
    - Response should be around ${maxWords} words (flexible - prioritize quality over exact count)
    - Be creative, engaging, and comprehensive
    - Provide valuable and actionable content
    - Use your expertise to create compelling material
    - Focus on delivering excellence rather than strict word limits
    `;

    const generationConfig = {
      temperature: options.temperature || 0.8,
      topK: options.topK || 40,
      topP: options.topP || 0.9,
      maxOutputTokens: options.maxOutputTokens || Math.min(maxWords * 2.5, 500),
      candidateCount: 1
    };

    const result = await model.generateContent({
      contents: [{ parts: [{ text: enhancedPrompt }] }],
      generationConfig,
    });

    const response = await result.response;
    let responseText = response.text().trim();
    
    // More flexible word limit for content generation
    responseText = truncateToWordCount(responseText, Math.floor(maxWords * 1.2));
    
    return responseText;
  }, "Error generating content. Please try again.");
};

/**
 * Enhanced plagiarism detection with modular analysis based on input complexity
 */
export const checkPlagiarism = async (content, maxWords = 200) => {
  if (!content || typeof content !== 'string') {
    return "Please provide valid content or ideas to check for originality.";
  }

  return handleAIRequest(async () => {
    const analysisDepth = determineAnalysisDepth(content);
    const wordCount = countWords(content);
    
    let prompt;
    let analysisWords = maxWords;
    
    if (analysisDepth === 'light') {
      // For simple ideas, questions, or short content
      analysisWords = Math.min(maxWords, 120);
      prompt = `
      QUICK ORIGINALITY CHECK

      Analyze this idea/content for originality: "${content.slice(0, 300)}"

      Provide a friendly, concise analysis covering:
      
      1. ORIGINALITY LEVEL: Is this a common/well-known idea or does it have unique elements?
      
      2. KEY INSIGHTS:
      - What makes this interesting or unique?
      - Any similar concepts you're aware of?
      - Simple suggestions for development or attribution if needed
      
      3. ENCOURAGEMENT: Brief positive feedback and next steps
      
      Keep it conversational and encouraging - around ${analysisWords} words. Focus on being helpful rather than overwhelming.
      `;
      
    } else if (analysisDepth === 'moderate') {
      // For medium-length content or moderate complexity
      analysisWords = Math.min(maxWords, 160);
      prompt = `
      BALANCED ORIGINALITY ANALYSIS

      Analyze this content for originality: "${content.slice(0, 400)}"

      Provide a helpful analysis covering:
      
      1. ORIGINALITY ASSESSMENT:
      - Overall uniqueness level and reasoning
      - Key original elements vs. common concepts
      
      2. RELEVANT CONNECTIONS:
      - Similar ideas or frameworks you're aware of
      - What attribution might be helpful
      
      3. DEVELOPMENT SUGGESTIONS:
      - Ways to strengthen unique aspects
      - Specific recommendations for improvement
      
      4. POSITIVE FEEDBACK: What's working well
      
      Aim for around ${analysisWords} words - thorough but not overwhelming.
      `;
      
    } else {
      // For complex content, academic work, or detailed analysis
      prompt = `
      COMPREHENSIVE PLAGIARISM & ORIGINALITY ANALYSIS

      Analyze this content/idea for originality: "${content.slice(0, 600)}"

      Perform detailed analysis covering:

      1. CONCEPTUAL ORIGINALITY:
      - Core ideas, concepts, arguments - are they commonly known or potentially borrowed?
      - Does this represent genuine original thinking or derivative work?
      - Well-known sources discussing similar concepts?

      2. SEMANTIC & STRUCTURAL ANALYSIS:
      - Potential paraphrasing of existing work?
      - Conceptual overlaps with established theories, frameworks, ideas?
      - Does logical structure mirror common academic or published patterns?

      3. ATTRIBUTION & SOURCING:
      - What concepts require proper citation?
      - Foundational theories or established ideas needing credit?
      - Original contributions vs. building on existing work?

      4. DETAILED ORIGINALITY ASSESSMENT:
      - Originality level (High/Medium/Low) with detailed justification
      - Most original and innovative aspects
      - Potentially problematic areas requiring attention

      5. ACTIONABLE RECOMMENDATIONS:
      - Specific ways to enhance originality
      - Proper attribution suggestions with examples
      - Strategies to strengthen unique contributions

      Provide comprehensive analysis around ${analysisWords} words. Focus on actionable insights.
      `;
    }
    
    const generationConfig = {
      maxOutputTokens: Math.min(analysisWords * 2.5, 500),
      temperature: 0.5, // Balanced for analysis
      topK: 30,
      topP: 0.8,
      candidateCount: 1
    };

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    let responseText = response.text().trim();
    
    // Flexible limit based on analysis depth
    const flexibleLimit = analysisDepth === 'light' ? 
      Math.floor(analysisWords * 1.1) : 
      Math.floor(analysisWords * 1.15);
    
    return truncateToWordCount(responseText, flexibleLimit);
  }, "Error analyzing content originality. Please try again.");
};

/**
 * Check for conceptual similarity with proportional analysis
 */
export const checkConceptualSimilarity = async (idea, maxWords = 180) => {
  if (!idea || typeof idea !== 'string') {
    return "Please provide a valid idea to analyze for conceptual similarity.";
  }

  return handleAIRequest(async () => {
    const analysisDepth = determineAnalysisDepth(idea);
    const wordCount = countWords(idea);
    
    let prompt;
    let analysisWords = maxWords;
    
    if (analysisDepth === 'light' || wordCount < 15) {
      // For simple ideas or brief concepts
      analysisWords = Math.min(maxWords, 100);
      prompt = `
      CONCEPT SIMILARITY CHECK

      Analyze this idea: "${idea.slice(0, 200)}"

      Quick assessment:
      1. Similar existing ideas or concepts you know of
      2. How common or unique this concept is
      3. Brief suggestions for development or differentiation
      4. Encouraging feedback on the concept's potential
      
      Keep it friendly and concise - around ${analysisWords} words.
      `;
      
    } else if (analysisDepth === 'moderate') {
      // For medium complexity ideas
      analysisWords = Math.min(maxWords, 140);
      prompt = `
      CONCEPTUAL SIMILARITY ANALYSIS

      Analyze this idea: "${idea.slice(0, 350)}"

      Balanced examination:
      1. Related theories, frameworks, or established concepts
      2. Level of conceptual overlap with existing knowledge
      3. What makes this idea unique or derivative
      4. Suggestions for strengthening originality
      5. Potential areas for proper attribution
      
      Aim for around ${analysisWords} words with helpful insights.
      `;
      
    } else {
      // For complex or detailed concepts
      prompt = `
      DETAILED CONCEPTUAL SIMILARITY ANALYSIS

      Analyze this idea for similarity to existing concepts: "${idea.slice(0, 400)}"

      Comprehensive examination:
      1. Similar established theories, frameworks, or models with specific examples
      2. Common academic or professional concepts this relates to
      3. Well-known works or authors discussing similar ideas
      4. Detailed level of conceptual overlap with existing knowledge
      5. What makes this idea unique or derivative - specific analysis
      6. Historical context and development of related concepts
      7. Potential gaps or opportunities for original contribution

      Provide specific examples, rate similarity level, and offer detailed insights.
      
      Provide thorough analysis around ${analysisWords} words with specific examples.
      `;
    }

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: Math.min(analysisWords * 2.5, 450),
        temperature: 0.5,
        topK: 35,
        topP: 0.8,
      },
    });

    const response = await result.response;
    const flexibleLimit = analysisDepth === 'light' ? 
      Math.floor(analysisWords * 1.1) : 
      Math.floor(analysisWords * 1.15);
    
    return truncateToWordCount(response.text().trim(), flexibleLimit);
  }, "Error analyzing conceptual similarity. Please try again.");
};

/**
 * Store conversation history (using memory instead of localStorage)
 */
export const storeConversationHistory = (history) => {
  try {
    if (!Array.isArray(history)) {
      console.warn('Invalid history format. Expected array.');
      return;
    }
    
    if (typeof window !== 'undefined') {
      window.chatbotHistory = history;
    }
  } catch (error) {
    console.error('Error storing conversation history:', error);
  }
};

/**
 * Retrieve conversation history
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
      hasHadFirstInteraction = false;
    }
  } catch (error) {
    console.error('Error clearing conversation history:', error);
  }
};

/**
 * Validate API configuration
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