// src/context/ChatbotContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getAIResponse, 
  generateContent, 
  checkPlagiarism,
  storeConversationHistory, 
  getConversationHistory 
} from '../services/aiService';

// Focused training data for relevant topics only (SEO removed)
const initialTrainingData = [
  // Greetings
  { input: "hello", response: "Hi! I specialize in content creation and plagiarism checking. How can I help you with these topics today?" },
  { input: "hi", response: "Hello! I'm here to assist with content creation and plagiarism checking. What would you like help with?" },
  
  // Capabilities
  { input: "what can you do", response: "I provide assistance with: 1) Content creation and writing 2) Plagiarism detection and originality checking. Please ask questions related to these areas." },
  { input: "help", response: "I'm specialized in content creation and plagiarism checking. Ask me about writing, content strategy, or originality verification." },
  
  // Content creation
  { input: "write content", response: "I can help create various content types: articles, blog posts, marketing copy, social media content, and more. What specific content do you need?" },
  { input: "content ideas", response: "I'll suggest content ideas based on your niche, audience, and goals. Share your topic or industry for targeted content suggestions." },
  
  // Plagiarism
  { input: "check plagiarism", response: "I analyze content for originality, similarity detection, citation needs, and provide rewriting suggestions. Paste your content for plagiarism analysis." },
  { input: "originality", response: "I'll evaluate content originality, identify potential issues, and suggest improvements to ensure unique, authentic content. Share your text for analysis." },
  
  // Goodbyes
  { input: "goodbye", response: "Goodbye! Feel free to return for content creation or plagiarism checking assistance anytime." },
  { input: "bye", response: "Bye! I'm here whenever you need help with content or plagiarism checking." },
  { input: "thank you", response: "You're welcome! Happy to help with content creation or plagiarism checking anytime." },
  { input: "thanks", response: "Glad I could help! Return anytime for content or plagiarism assistance." }
];

const ChatbotContext = createContext();

export const useChatbot = () => useContext(ChatbotContext);

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! 👋 I\'m your specialized AI assistant for content creation and plagiarism checking. I provide precise, 100-word responses within these expertise areas. How can I assist you today?' }
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

  // Save training data to memory whenever it changes
  useEffect(() => {
    try {
      window.chatbotTraining = trainingData;
    } catch (e) {
      console.error('Error saving training data:', e);
    }
  }, [trainingData]);

  // Helper function to check if input is relevant
  const isRelevantInput = (input) => {
    const relevantKeywords = [
      'content', 'write', 'create', 'plagiarism', 'original',
      'article', 'blog', 'copy', 'text', 'check', 'help', 'hello',
      'hi', 'thanks', 'thank you', 'bye', 'goodbye', 'what', 'how', 'can you'
    ];
    
    const lowerInput = input.toLowerCase();
    return relevantKeywords.some(keyword => lowerInput.includes(keyword));
  };

  // Enhanced function to find local responses with relevance checking
  const findLocalResponse = (userInput) => {
    if (!isRelevantInput(userInput)) {
      return "I specialize in content creation and plagiarism checking. Please ask questions related to these topics for helpful assistance.";
    }

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

  // Function to learn from relevant interactions only
  const learnFromInteraction = (userInput, botResponse) => {
    // Only learn from relevant interactions
    if (!isRelevantInput(userInput)) return;

    const existingEntryIndex = trainingData.findIndex(item => 
      item.input.toLowerCase() === userInput.toLowerCase()
    );
    
    if (existingEntryIndex >= 0) {
      const updatedTrainingData = [...trainingData];
      updatedTrainingData[existingEntryIndex].response = botResponse;
      setTrainingData(updatedTrainingData);
    } else {
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
        // Update conversation context with relevant interactions only
        if (isRelevantInput(userInput)) {
          setConversationContext(prev => `${prev}\nUser: ${userInput}\nAssistant: ${response}`.slice(-1000)); // Keep last 1000 chars
        }
      }, 800);
    } catch (error) {
      console.error('Error in sendMessage:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Sorry, I encountered an error. Please try again with questions about content creation or plagiarism checking.' 
      }]);
    }
  };

  const setMode = (mode) => {
    // Only allow specific modes (removed SEO)
    if (!['general', 'content', 'plagiarism'].includes(mode)) return;
    setActiveMode(mode);
    
    const modeMessages = {
      general: 'Switched to General mode. I can help with content creation and plagiarism checking. What do you need assistance with?',
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
      { type: 'bot', text: 'Hello! 👋 I\'m your specialized AI assistant for content creation and plagiarism checking. I provide precise, 100-word responses within these expertise areas. How can I assist you today?' }
    ]);
    setConversationContext('');
    setActiveMode('general');
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