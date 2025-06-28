// src/context/ChatbotContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getAIResponse, 
  generateContent, 
  checkPlagiarism,
  storeConversationHistory, 
  getConversationHistory 
} from '../services/aiService';

// Updated training data without topic restrictions
const initialTrainingData = [
  // Greetings
  { input: "hello", response: "Hi! I'm your AI assistant. I specialize in content creation and plagiarism checking, but I'm happy to help with any questions you have. How can I assist you today?" },
  { input: "hi", response: "Hello! I'm here to help with content creation, plagiarism checking, and any other questions you might have. What would you like to know?" },
  
  // Capabilities
  { input: "what can you do", response: "I can help with content creation, plagiarism checking, answer general questions, provide explanations, assist with research, and much more. I'm here to be helpful with whatever you need!" },
  { input: "help", response: "I'm an AI assistant ready to help! I'm particularly good at content creation and plagiarism checking, but I can assist with various topics. What do you need help with?" },
  
  // Content creation
  { input: "write content", response: "I'd be happy to help create content! I can write articles, blog posts, marketing copy, social media content, emails, and more. What type of content do you need?" },
  { input: "content ideas", response: "I'll suggest creative content ideas based on your niche, audience, and goals. Share your topic, industry, or target audience for personalized content suggestions." },
  
  // Plagiarism
  { input: "check plagiarism", response: "I can analyze content for originality, detect potential similarity issues, suggest proper citations, and provide rewriting recommendations. Share your content for a thorough analysis." },
  { input: "originality", response: "I'll evaluate your content's originality, identify potential issues, and suggest improvements to ensure it's unique and authentic. Feel free to share your text for analysis." },
  
  // General helpfulness
  { input: "explain", response: "I'm great at explaining complex topics in simple terms! Whether it's science, technology, history, or any other subject, I can break it down clearly. What would you like me to explain?" },
  { input: "question", response: "I'm here to answer your questions on virtually any topic! From factual information to creative problems, I'll do my best to provide helpful, accurate responses." },
  
  // Goodbyes
  { input: "goodbye", response: "Goodbye! Feel free to return anytime for help with content creation, plagiarism checking, or any other questions you might have." },
  { input: "bye", response: "Bye! I'm here whenever you need assistance with anything - content creation, research, general questions, or just a friendly chat." },
  { input: "thank you", response: "You're very welcome! I'm always happy to help with any questions or tasks you have. Don't hesitate to ask if you need anything else!" },
  { input: "thanks", response: "My pleasure! I'm here to help with whatever you need, so feel free to ask about anything anytime." }
];

const ChatbotContext = createContext();

export const useChatbot = () => useContext(ChatbotContext);

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! 👋 I\'m your AI assistant specializing in content creation and plagiarism checking, but I\'m happy to help with any topic. I provide precise, helpful responses. How can I assist you today?' }
  ]);
  const [trainingData, setTrainingData] = useState(() => {
    // Try to load saved training data from memory
    try {
      return window.chatbotTraining || initialTrainingData;
    } catch (e) {
      console.error('Error loading training data:', e);
      return initialTrainingData;
    }
  });
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState('');
  const [activeMode, setActiveMode] = useState('general'); // general, content, plagiarism
  const [hasStartedConversation, setHasStartedConversation] = useState(false);

  // Load conversation history on mount
  useEffect(() => {
    const history = getConversationHistory();
    if (history.length > 0) {
      setMessages(history);
      setHasStartedConversation(true);
    }
  }, []);

  // Save conversation history when messages change
  useEffect(() => {
    storeConversationHistory(messages);
  }, [messages]);

  // Save training data to memory whenever it changes
  useEffect(() => {
    try {
      window.chatbotTraining = trainingData;
    } catch (e) {
      console.error('Error saving training data:', e);
    }
  }, [trainingData]);

  // Enhanced function to find local responses without restrictions
  const findLocalResponse = (userInput) => {
    const normalizedInput = userInput.toLowerCase().trim();
    
    // Try exact match
    const exactMatch = trainingData.find(item => 
      item.input.toLowerCase() === normalizedInput
    );
    
    if (exactMatch) return exactMatch.response;
    
    // Try partial match
    const partialMatch = trainingData.find(item => 
      normalizedInput.includes(item.input.toLowerCase()) || 
      item.input.toLowerCase().includes(normalizedInput)
    );
    
    if (partialMatch) return partialMatch.response;
    
    return null;
  };

  // Function to learn from interactions
  const learnFromInteraction = (userInput, botResponse) => {
    const existingEntryIndex = trainingData.findIndex(item => 
      item.input.toLowerCase() === userInput.toLowerCase()
    );
    
    if (existingEntryIndex >= 0) {
      const updatedTrainingData = [...trainingData];
      updatedTrainingData[existingEntryIndex].response = botResponse;
      setTrainingData(updatedTrainingData);
    } else {
      // Only add to training data if it's a meaningful interaction
      if (userInput.length > 2 && botResponse.length > 10) {
        setTrainingData(prev => [...prev, { input: userInput, response: botResponse }]);
      }
    }
  };

  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;
    
    // Mark that conversation has started
    setHasStartedConversation(true);
    
    // Add user message to chat
    const userMessage = { type: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      let response;
      
      // First check for local response
      const localResponse = findLocalResponse(userInput);
      if (localResponse) {
        response = localResponse;
      } else {
        // Use AI service based on active mode
        switch (activeMode) {
          case 'content':
            response = await generateContent(userInput);
            break;
          case 'plagiarism':
            response = await checkPlagiarism(userInput);
            break;
          default:
            response = await getAIResponse(userInput, conversationContext);
        }
        
        // Learn from this interaction
        learnFromInteraction(userInput, response);
      }
      
      // Add bot response after a short delay
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { type: 'bot', text: response }]);
        // Update conversation context
        setConversationContext(prev => `${prev}\nUser: ${userInput}\nAssistant: ${response}`.slice(-1500)); // Keep last 1500 chars
      }, 800);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Sorry, I encountered an error. Please try again and I\'ll do my best to help!' 
      }]);
    }
  };

  const setMode = (mode) => {
    // Allow the three main modes
    if (!['general', 'content', 'plagiarism'].includes(mode)) return;
    setActiveMode(mode);
    
    const modeMessages = {
      general: 'Switched to General mode. I can help with any questions or topics you\'d like to discuss. What can I help you with?',
      content: 'Switched to Content Creation mode. I\'ll help you create articles, blogs, marketing copy, and other written content. What content do you need?',
      plagiarism: 'Switched to Plagiarism Checking mode. I\'ll analyze content for originality and provide improvement suggestions. Share your content for analysis.'
    };
    
    setMessages(prev => [...prev, { 
      type: 'bot', 
      text: modeMessages[mode]
    }]);
  };

  const resetChat = () => {
    setMessages([
      { type: 'bot', text: 'Hello! 👋 I\'m your AI assistant specializing in content creation and plagiarism checking, but I\'m happy to help with any topic. I provide precise, helpful responses. How can I assist you today?' }
    ]);
    setConversationContext('');
    setActiveMode('general');
    setHasStartedConversation(false);
  };

  const value = {
    isOpen,
    setIsOpen,
    messages,
    isTyping,
    sendMessage,
    resetChat,
    trainingData,
    setTrainingData,
    activeMode,
    setMode,
    hasStartedConversation
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};