// src/context/ChatbotContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getAIResponse, 
  generateContent, 
  getSEOSuggestions, 
  checkPlagiarism,
  storeConversationHistory, 
  getConversationHistory 
} from '../services/aiService';

// Initial training data
const initialTrainingData = [
  { input: "hello", response: "Hi there! How can I help you today?" },
  { input: "hi", response: "Hello! What can I do for you?" },
  { input: "how are you", response: "I'm doing well, thanks for asking! How about you?" },
  { input: "what can you do", response: "I can answer questions, provide information, and assist with various tasks. What would you like help with?" },
  { input: "goodbye", response: "Goodbye! Feel free to chat again whenever you need assistance." },
  { input: "bye", response: "Bye! Have a great day!" },
  { input: "thank you", response: "You're welcome! Is there anything else I can help with?" },
  { input: "thanks", response: "Happy to help! Need anything else?" }
];

const ChatbotContext = createContext();

export const useChatbot = () => useContext(ChatbotContext);

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! 👋 I\'m your AI assistant. I can help you with content creation, SEO optimization, and plagiarism checking. How can I assist you today?' }
  ]);
  const [trainingData, setTrainingData] = useState(() => {
    // Try to load saved training data from localStorage
    try {
      const savedData = localStorage.getItem('chatbot_training');
      return savedData ? JSON.parse(savedData) : initialTrainingData;
    } catch (e) {
      console.error('Error loading training data:', e);
      return initialTrainingData;
    }
  });
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState('');
  const [activeMode, setActiveMode] = useState('chat'); // chat, content, seo, plagiarism

  // Load conversation history on mount
  useEffect(() => {
    const history = getConversationHistory();
    if (history.length > 0) {
      setMessages(history);
    }
  }, []);

  // Save conversation history when messages change
  useEffect(() => {
    storeConversationHistory(messages);
  }, [messages]);

  // Save training data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('chatbot_training', JSON.stringify(trainingData));
    } catch (e) {
      console.error('Error saving training data:', e);
    }
  }, [trainingData]);

  // Simple function to find a response from our training data
  const findLocalResponse = (userInput) => {
    const normalizedInput = userInput.toLowerCase().trim();
    
    // First try to find an exact match
    const exactMatch = trainingData.find(item => 
      item.input.toLowerCase() === normalizedInput
    );
    
    if (exactMatch) return exactMatch.response;
    
    // If no exact match, try to find a partial match
    const partialMatch = trainingData.find(item => 
      normalizedInput.includes(item.input.toLowerCase()) || 
      item.input.toLowerCase().includes(normalizedInput)
    );
    
    if (partialMatch) return partialMatch.response;
    
    // No local match found, return null to use the API
    return null;
  };

  // Function to learn from interactions
  const learnFromInteraction = (userInput, botResponse) => {
    // Check if we already have this exact input
    const existingEntryIndex = trainingData.findIndex(item => 
      item.input.toLowerCase() === userInput.toLowerCase()
    );
    
    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedTrainingData = [...trainingData];
      updatedTrainingData[existingEntryIndex].response = botResponse;
      setTrainingData(updatedTrainingData);
    } else {
      // Add new entry
      setTrainingData(prev => [...prev, { input: userInput, response: botResponse }]);
    }
  };

  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;
    
    // Add user message to chat
    const userMessage = { type: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      let response;
      
      switch (activeMode) {
        case 'content':
          response = await generateContent(userInput);
          break;
        case 'seo':
          response = await getSEOSuggestions(userInput);
          break;
        case 'plagiarism':
          response = await checkPlagiarism(userInput);
          break;
        default:
          response = await getAIResponse(userInput, conversationContext);
      }
      
      // Add bot response after a short delay
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { type: 'bot', text: response }]);
        // Update conversation context
        setConversationContext(prev => `${prev}\nUser: ${userInput}\nAssistant: ${response}`);
      }, 500);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Sorry, I encountered an error processing your request.' 
      }]);
    }
  };

  const setMode = (mode) => {
    setActiveMode(mode);
    setMessages(prev => [...prev, { 
      type: 'bot', 
      text: `Switched to ${mode} mode. How can I help you with ${mode}?` 
    }]);
  };

  const resetChat = () => {
    setMessages([
      { type: 'bot', text: 'Hello! 👋 I\'m your AI assistant. I can help you with content creation, SEO optimization, and plagiarism checking. How can I assist you today?' }
    ]);
    setConversationContext('');
    setActiveMode('chat');
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
    setMode
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};