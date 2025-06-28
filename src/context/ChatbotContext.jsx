// src/context/ChatbotContext.jsx - Enhanced with more flexible approach

import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getAIResponse, 
  generateContent, 
  checkPlagiarism,
  checkConceptualSimilarity,
  storeConversationHistory, 
  getConversationHistory 
} from '../services/aiService';

// Enhanced training data with broader coverage and more flexible responses
const initialTrainingData = [
  // Greetings - More natural and welcoming
  { input: "hello", response: "Hi there! I'm your AI assistant. I specialize in content creation and advanced plagiarism checking, but I'm genuinely excited to help with whatever you need - whether that's creative writing, research, answering questions, brainstorming, or just having an interesting conversation. What's on your mind?" },
  { input: "hi", response: "Hello! Great to meet you! I'm here to help with content creation, comprehensive plagiarism analysis, general questions, creative projects, research, or anything else you'd like to explore. What would you like to dive into today?" },
  { input: "hey", response: "Hey! I'm your friendly AI assistant. While I'm particularly good at content creation and plagiarism detection, I love helping with all sorts of topics - from creative projects to complex questions to casual conversations. How can I help you today?" },
  
  // Capabilities - More comprehensive and inviting
  { input: "what can you do", response: "I can help with a wide range of things! My specialties include content creation (articles, blogs, marketing copy, creative writing), advanced plagiarism checking (both textual and conceptual originality), but I also love helping with research, explaining complex topics, brainstorming ideas, creative problem-solving, coding help, academic support, and engaging conversations on virtually any subject. What interests you most?" },
  { input: "help", response: "I'm here to help with whatever you need! Whether it's content creation, plagiarism analysis, answering questions, creative projects, research assistance, problem-solving, or just exploring interesting topics together - I'm genuinely excited to assist. What would you like to work on?" },
  { input: "capabilities", response: "I have broad capabilities! I excel at content creation, comprehensive plagiarism analysis, research assistance, creative writing, explaining complex concepts, brainstorming, problem-solving, coding help, academic support, and engaging discussions on diverse topics. I aim to be helpful, knowledgeable, and genuinely useful for whatever you're working on." },
  
  // Content creation - More enthusiastic and comprehensive
  { input: "write content", response: "I'd love to help create content! I can craft engaging articles, blog posts, marketing copy, social media content, creative stories, technical documentation, academic papers, emails, scripts, and more. I focus on creating compelling, original content tailored to your needs. What type of content are you looking to create?" },
  { input: "content ideas", response: "I'm great at generating creative content ideas! Whether you need blog topics, marketing campaigns, social media strategies, article angles, creative writing prompts, or content series concepts, I can provide fresh, engaging ideas tailored to your audience and goals. Tell me about your niche or what you're working on!" },
  { input: "creative writing", response: "I love creative writing! I can help with stories, poems, scripts, character development, plot ideas, world-building, dialogue, and any other creative projects. Whether you want to collaborate on something new or get feedback on existing work, I'm excited to explore creativity with you." },
  
  // Enhanced Plagiarism responses - More detailed and helpful
  { input: "check plagiarism", response: "I offer comprehensive plagiarism analysis that goes beyond simple text matching! I can evaluate conceptual originality, identify idea similarities with existing work, analyze semantic patterns, assess attribution needs, and provide detailed recommendations for strengthening originality. I check both textual similarity and conceptual uniqueness. Share your content or ideas for thorough analysis!" },
  { input: "originality", response: "I provide deep originality analysis covering multiple dimensions: textual uniqueness, conceptual novelty, idea similarity with existing theories/frameworks, attribution requirements, and specific recommendations for enhancing original contributions. I help ensure your work is both original and properly credited where needed." },
  { input: "plagiarism ideas", response: "I specialize in analyzing ideas and concepts for originality! I can identify if your concepts are similar to existing theories, frameworks, or established ideas in your field, suggest proper attributions, and help you develop more unique approaches. This goes beyond text-matching to true conceptual analysis." },
  { input: "idea plagiarism", response: "Conceptual plagiarism analysis is one of my key strengths! I examine whether your ideas are similar to existing work, identify what needs attribution, analyze conceptual overlaps with established theories, and provide specific guidance for strengthening your unique contributions while avoiding conceptual borrowing." },
  { input: "concept similarity", response: "I provide detailed conceptual similarity analysis, comparing your ideas to existing theories, frameworks, and established concepts in relevant fields. I identify overlaps, suggest ways to differentiate your approach, and help you develop more original perspectives while properly crediting foundational work." },
  
  // General helpfulness - More encouraging and broad
  { input: "explain", response: "I love explaining things! I can break down complex topics in science, technology, history, philosophy, arts, literature, current events, or any other subject you're curious about. I aim to make complicated concepts clear and engaging, using examples, analogies, and step-by-step explanations. What would you like to explore?" },
  { input: "question", response: "I'm here for all your questions! Whether they're factual, creative, analytical, hypothetical, or just things you're curious about, I enjoy diving deep into topics and providing thoughtful, comprehensive answers. Don't hesitate to ask about anything - I find most questions genuinely interesting!" },
  { input: "research", response: "I can help with various research needs! Whether you're looking for information on specific topics, need help organizing research, want assistance with analysis, or need guidance on research methodology, I'm here to support your research goals. What are you investigating?" },
  { input: "brainstorm", response: "I love brainstorming! I can help generate ideas for projects, solve creative problems, explore different approaches to challenges, develop innovative solutions, or just think through possibilities together. Brainstorming is often where the most interesting ideas emerge. What are we brainstorming about?" },
  
  // Learning and education
  { input: "learn", response: "I'm passionate about learning and teaching! Whether you want to explore new subjects, deepen your understanding of topics you know, get help with studies, or just satisfy your curiosity, I'm excited to learn alongside you. What would you like to discover today?" },
  { input: "study", response: "I can help with studying in many ways - explaining concepts, creating study guides, helping with practice questions, breaking down complex topics, providing different perspectives on subjects, or just being a study companion. What are you working on?" },
  
  // Creative and fun responses
  { input: "creative", response: "Creativity is one of my favorite areas! Whether it's creative writing, brainstorming innovative solutions, exploring artistic concepts, developing unique approaches to problems, or just thinking outside the box, I love engaging with creative challenges. What creative project are you working on?" },
  { input: "fun", response: "I believe learning and problem-solving can be genuinely fun! I enjoy exploring interesting topics, creative challenges, thought-provoking questions, and engaging conversations. I try to bring enthusiasm and curiosity to everything we discuss. What sounds fun to you?" },
  
  // Goodbyes - Warmer and more inviting
  { input: "goodbye", response: "It was great chatting with you! I really enjoyed our conversation. Feel free to come back anytime for content creation help, plagiarism analysis, creative projects, research assistance, or just to explore interesting topics together. Take care!" },
  { input: "bye", response: "Bye for now! I hope I was helpful today. Remember, I'm here whenever you need assistance with anything - whether it's content creation, plagiarism checking, creative projects, research, or just engaging conversation. Looking forward to our next chat!" },
  { input: "thank you", response: "You're very welcome! I genuinely enjoyed helping you today. It's always a pleasure to work on interesting projects and explore topics together. Don't hesitate to reach out whenever you need assistance with anything - I'm always here and happy to help!" },
  { input: "thanks", response: "My pleasure! I really enjoyed our conversation and I'm glad I could help. Whether you need content creation, plagiarism analysis, creative assistance, research help, or just want to chat about interesting topics, I'm always here and excited to help!" }
];

const ChatbotContext = createContext();

export const useChatbot = () => useContext(ChatbotContext);

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! 👋 I\'m your AI assistant, and I\'m genuinely excited to help you today! While I specialize in content creation and advanced plagiarism detection (including conceptual originality analysis), I love helping with all kinds of topics - creative projects, research, problem-solving, learning, or just having interesting conversations. What would you like to explore together?' }
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
  const [plagiarismAnalysisType, setPlagiarismAnalysisType] = useState('comprehensive');
  const [conversationTone, setConversationTone] = useState('helpful'); // helpful, casual, professional, creative

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

  // Enhanced function to find local responses with fuzzy matching
  const findLocalResponse = (userInput) => {
    const normalizedInput = userInput.toLowerCase().trim();
    
    // Try exact match first
    const exactMatch = trainingData.find(item => 
      item.input.toLowerCase() === normalizedInput
    );
    
    if (exactMatch) return exactMatch.response;
    
    // Try partial match with higher similarity threshold
    const partialMatch = trainingData.find(item => {
      const inputLower = item.input.toLowerCase();
      return normalizedInput.includes(inputLower) || 
             inputLower.includes(normalizedInput) ||
             // Check for word overlap
             normalizedInput.split(' ').some(word => 
               word.length > 2 && inputLower.includes(word)
             );
    });
    
    if (partialMatch) return partialMatch.response;
    
    return null;
  };

  // Function to learn from interactions with better filtering
  const learnFromInteraction = (userInput, botResponse) => {
    // Don't learn from very short or generic interactions
    if (userInput.length < 3 || botResponse.length < 20) return;
    
    const existingEntryIndex = trainingData.findIndex(item => 
      item.input.toLowerCase().trim() === userInput.toLowerCase().trim()
    );
    
    if (existingEntryIndex >= 0) {
      // Update existing entry with better response
      const updatedTrainingData = [...trainingData];
      updatedTrainingData[existingEntryIndex].response = botResponse;
      setTrainingData(updatedTrainingData);
    } else {
      // Add new training data for meaningful interactions
      if (userInput.length > 3 && botResponse.length > 15 && !botResponse.includes('error')) {
        setTrainingData(prev => [...prev, { 
          input: userInput.toLowerCase().trim(), 
          response: botResponse 
        }]);
      }
    }
  };

  // Enhanced plagiarism detection with better error handling
  const performPlagiarismAnalysis = async (userInput) => {
    try {
      let response;
      const inputLower = userInput.toLowerCase();
      
      // Determine analysis type based on content and user intent
      if (inputLower.includes('idea') || inputLower.includes('concept') || 
          inputLower.includes('theory') || inputLower.includes('framework')) {
        response = await checkConceptualSimilarity(userInput, 180);
      } else if (userInput.length > 150) {
        response = await checkPlagiarism(userInput, 200);
      } else {
        response = await checkPlagiarism(userInput, 150);
      }
      
      return response;
    } catch (error) {
      console.error('Plagiarism analysis error:', error);
      return "I encountered an issue with the plagiarism analysis. Let me try a different approach. I can analyze both textual similarity and conceptual originality - would you like me to focus on a specific aspect, or would you prefer to try submitting your content again?";
    }
  };

  // Enhanced message sending with better mode handling
  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;
    
    setHasStartedConversation(true);
    
    // Add user message to chat
    const userMessage = { type: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      let response;
      
      // Check for local response first
      const localResponse = findLocalResponse(userInput);
      if (localResponse) {
        response = localResponse;
      } else {
        // Determine appropriate word limit based on mode and content
        let wordLimit = 150; // Default increased limit
        
        if (activeMode === 'content') {
          wordLimit = 200;
        } else if (activeMode === 'plagiarism') {
          wordLimit = 200;
        } else if (userInput.length > 100) {
          wordLimit = 180; // More space for complex questions
        }
        
        // Use AI service based on active mode
        switch (activeMode) {
          case 'content':
            response = await generateContent(userInput, { maxWords: wordLimit });
            break;
          case 'plagiarism':
            response = await performPlagiarismAnalysis(userInput);
            break;
          default:
            response = await getAIResponse(userInput, conversationContext, wordLimit);
        }
        
        // Learn from this interaction
        learnFromInteraction(userInput, response);
      }
      
      // Add bot response with appropriate delay
      const delay = response.length > 100 ? 1200 : 800;
      setTimeout(() => {
        setIsTyping(false);
        const botMessage = { type: 'bot', text: response };
        setMessages(prev => [...prev, botMessage]);
        
        // Update conversation context with more recent history
        const newContext = `${conversationContext}\nUser: ${userInput}\nAssistant: ${response}`;
        setConversationContext(newContext.slice(-2000)); // Increased context window
      }, delay);
      
    } catch (error) {
      console.error('Error in sendMessage:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'I apologize, but I encountered a technical issue. Please try rephrasing your question or let me know if you\'d like help with something else. I\'m here to help with content creation, plagiarism checking, or any other topics you\'d like to explore!' 
      }]);
    }
  };

  // Enhanced mode setting with better feedback
  const setMode = (mode) => {
    if (!['general', 'content', 'plagiarism'].includes(mode)) return;
    setActiveMode(mode);
    
    const modeMessages = {
      general: 'Switched to General mode! I\'m ready to help with any questions, creative projects, research, learning, or just interesting conversations you\'d like to have. What\'s on your mind?',
      content: 'Switched to Content Creation mode! I\'m excited to help you create engaging articles, blogs, marketing copy, creative writing, or any other content you need. I can also help with brainstorming ideas, structuring content, and refining your writing. What would you like to create?',
      plagiarism: 'Switched to Advanced Plagiarism Analysis mode! I\'ll provide comprehensive analysis covering textual similarity, conceptual originality, idea attribution needs, and detailed recommendations for enhancing uniqueness. I can analyze both written content and ideas/concepts. Share what you\'d like me to analyze!'
    };
    
    setMessages(prev => [...prev, { 
      type: 'bot', 
      text: modeMessages[mode]
    }]);
  };

  // Enhanced plagiarism analysis type setting
  const setPlagiarismType = (type) => {
    if (!['comprehensive', 'conceptual', 'textual'].includes(type)) return;
    setPlagiarismAnalysisType(type);
    
    const typeMessages = {
      comprehensive: 'Set to Comprehensive Analysis: I\'ll examine both textual similarity and conceptual originality, providing detailed insights on uniqueness, attribution needs, and improvement recommendations.',
      conceptual: 'Set to Conceptual Analysis: I\'ll focus on idea similarity, concept originality, and how your thoughts relate to existing theories and frameworks in your field.',
      textual: 'Set to Textual Analysis: I\'ll focus on text-based similarity detection, paraphrasing identification, and linguistic pattern analysis.'
    };
    
    if (activeMode === 'plagiarism') {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: typeMessages[type]
      }]);
    }
  };

  // New function to set conversation tone
  const setTone = (tone) => {
    if (!['helpful', 'casual', 'professional', 'creative'].includes(tone)) return;
    setConversationTone(tone);
    
    const toneMessages = {
      helpful: 'Tone set to Helpful: I\'ll focus on being supportive, informative, and solution-oriented in our conversation.',
      casual: 'Tone set to Casual: I\'ll keep our conversation relaxed, friendly, and conversational.',
      professional: 'Tone set to Professional: I\'ll maintain a more formal, business-appropriate communication style.',
      creative: 'Tone set to Creative: I\'ll bring more imagination, brainstorming energy, and creative thinking to our discussion.'
    };
    
    setMessages(prev => [...prev, { 
      type: 'bot', 
      text: toneMessages[tone]
    }]);
  };

  // Enhanced chat reset with better user experience
  const resetChat = () => {
    setMessages([
      { type: 'bot', text: 'Hello! 👋 I\'m your AI assistant, and I\'m genuinely excited to help you today! While I specialize in content creation and advanced plagiarism detection (including conceptual originality analysis), I love helping with all kinds of topics - creative projects, research, problem-solving, learning, or just having interesting conversations. What would you like to explore together?' }
    ]);
    setConversationContext('');
    setActiveMode('general');
    setPlagiarismAnalysisType('comprehensive');
    setConversationTone('helpful');
    setHasStartedConversation(false);
  };

  // Function to export conversation
  const exportConversation = () => {
    const conversationText = messages.map(msg => 
      `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
    ).join('\n\n');
    
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chatbot-conversation-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to get conversation statistics
  const getConversationStats = () => {
    const userMessages = messages.filter(msg => msg.type === 'user');
    const botMessages = messages.filter(msg => msg.type === 'bot');
    const totalWords = messages.reduce((acc, msg) => 
      acc + msg.text.split(' ').length, 0
    );
    
    return {
      totalMessages: messages.length,
      userMessages: userMessages.length,
      botMessages: botMessages.length,
      totalWords,
      averageWordsPerMessage: Math.round(totalWords / messages.length)
    };
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
    plagiarismAnalysisType,
    setPlagiarismType,
    conversationTone,
    setTone,
    hasStartedConversation,
    exportConversation,
    getConversationStats
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};