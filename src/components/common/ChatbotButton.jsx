import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useChatbot } from '../../context/ChatbotContext';
import ReactMarkdown from 'react-markdown';

// Refined animations and styled components
const pulseAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(157, 78, 221, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(157, 78, 221, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(157, 78, 221, 0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const botEntry = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const ChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;
  background: linear-gradient(45deg, #9d4edd, #c77dff, #ff9e00, #ddff00, #9d4edd);
  background-size: 300% 300%;
  animation: ${gradientAnimation} 6s ease infinite;
  border: 2px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    animation: ${gradientAnimation} 3s ease infinite;
  }

  svg {
    width: 28px;
    height: 28px;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const ChatPopup = styled.div`
  position: fixed;
  bottom: 95px;
  left: 24px;
  width: 480px;
  height: 490px; /* Increased height to ensure all content fits */
  background: linear-gradient(170deg, #1f1033, #120821);
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 999;
  transform-origin: bottom left;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: ${props => props.isOpen ? 1 : 0};
  transform: ${props => props.isOpen ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(30px)'};
  pointer-events: ${props => props.isOpen ? 'all' : 'none'};
  border: 1px solid rgba(199, 125, 255, 0.3);
  display: flex;
  flex-direction: column; /* Ensure proper layout flow */

  @media (max-width: 600px) {
    left: 50%;
    top: 50%;
    bottom: unset;
    width: 90vw;
    aspect-ratio: 5 / 4;
    max-width: 100vw;
    max-height: 100dvh;
    border-radius: 16px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.25);
    border: none;
    padding-bottom: 0;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(90deg, #6e2dc4, #9d4edd);
  color: white;
  padding: 16px 20px;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 0.5px;
  flex-shrink: 0; /* Prevent header from shrinking */
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const ChatBody = styled.div`
  padding: 18px;
  flex: 1; /* Take up all available space */
  overflow-y: auto;
  background: rgba(17, 5, 28, 0.8);
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(157, 78, 221, 0.5);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(157, 78, 221, 0.7);
  }
`;

const Message = styled.div`
  margin-bottom: 12px;
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.5;
  animation: ${fadeIn} 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const BotMessage = styled(Message)`
  opacity: 0;
  transform: translateY(10px) scale(0.95);
  animation: ${fadeIn} 0.4s ease forwards;
  background: linear-gradient(135deg, #362855, #3a2257);
  color: #f0e6ff;
  border-left: 3px solid #9d4edd;
  margin-bottom: 16px;
  font-size: 1rem;
  line-height: 1.7;
  white-space: pre-line;
  word-break: break-word;
  
  & h1, & h2, & h3, & h4, & h5, & h6 {
    color: #e2c0ff;
    margin: 0.6em 0 0.3em 0;
    font-weight: 600;
  }
  
  & ul, & ol {
    margin-left: 1.5em;
    margin-bottom: 0.6em;
  }
  
  & li {
    margin-bottom: 0.3em;
  }
  
  & strong {
    color: #e2c0ff;
    font-weight: 600;
  }
  
  & em {
    color: #ffca80;
    font-style: italic;
  }
  
  & code {
    background: #232136;
    color: #ffb700;
    padding: 3px 6px;
    border-radius: 4px;
    font-size: 0.9em;
    font-family: 'Consolas', monospace;
  }
`;

const UserMessage = styled(Message)`
  background: linear-gradient(135deg, #7d46a8, #6a3d8a);
  color: white;
  border-right: 3px solid #c77dff;
  align-self: flex-end;
  box-shadow: 0 2px 10px rgba(109, 40, 217, 0.2);
`;

const InputArea = styled.div`
  display: flex;
  padding: 14px 16px;
  background: rgba(20, 10, 35, 0.95);
  border-top: 1px solid rgba(157, 78, 221, 0.2);
  min-height: 70px; /* Fixed minimum height */
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  flex-shrink: 0; /* Prevent input area from shrinking */
`;

const MessageInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(157, 78, 221, 0.3);
  border-radius: 22px;
  padding: 10px 18px;
  color: white;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  height: 44px;
  
  &:focus {
    border-color: #c77dff;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const sendingAnimation = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  30% { transform: scale(1.15) rotate(-10deg); }
  60% { transform: scale(0.95) rotate(8deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(45deg, #9d4edd, #c77dff);
  border: none;
  margin-left: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(157, 78, 221, 0.4);
  
  &:hover {
    transform: scale(1.08);
    background: linear-gradient(45deg, #b85cff, #d193ff);
    box-shadow: 0 4px 12px rgba(157, 78, 221, 0.6);
  }
  
  &:active {
    transform: scale(0.95);
  }

  &.sending {
    animation: ${sendingAnimation} 0.5s linear;
  }
  
  svg {
    width: 18px;
    height: 18px;
    fill: white;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0 16px 0;
  padding: 8px 16px;
  align-self: flex-start;
  background: rgba(58, 34, 87, 0.5);
  border-radius: 16px;
  
  span {
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background-color: #c77dff;
    border-radius: 50%;
    display: inline-block;
    opacity: 0.7;
    animation: bounce 1.5s infinite ease-in-out;
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
  
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }
`;

const ModeSelector = styled.div`
  display: flex;
  gap: 8px;
  padding: 14px 16px;
  background: rgba(28, 16, 45, 0.95);
  border-bottom: 1px solid rgba(157, 78, 221, 0.2);
  justify-content: space-between;
  flex-shrink: 0; /* Prevent mode selector from shrinking */
`;

const ModeButton = styled.button`
  padding: 8px 14px;
  border-radius: 18px;
  border: 1px solid ${props => props.active ? '#c77dff' : 'rgba(157, 78, 221, 0.2)'};
  background: ${props => props.active ? 'rgba(157, 78, 221, 0.25)' : 'rgba(157, 78, 221, 0.05)'};
  color: ${props => props.active ? '#f0e6ff' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 13px;
  font-weight: ${props => props.active ? '500' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.active ? '0 2px 8px rgba(157, 78, 221, 0.3)' : 'none'};
  
  &:hover {
    background: rgba(157, 78, 221, 0.2);
    border-color: rgba(157, 78, 221, 0.5);
    color: #f0e6ff;
  }
`;

const TypingText = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: pre-wrap;
  word-break: break-word;
`;

const cursorBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const TypingCursor = styled.span`
  display: inline-block;
  width: 3px;
  height: 1.2em;
  background-color: #c77dff;
  margin-left: 2px;
  animation: ${cursorBlink} 1s infinite;
  vertical-align: text-bottom;
  box-shadow: 0 0 5px rgba(199, 125, 255, 0.5);
`;

// Sample training data - you can expand this
const initialTrainingData = [
  { input: "hello", response: "Hi I'm BolBacchan AI, how can I help you today?" },
  { input: "hi", response: "Hello I'm BolBacchan AI! What can I do for you?" },
  { input: "how are you", response: "I'm doing well, thanks for asking! How about you?" },
  { input: "what can you do", response: "I can answer questions, provide information, and assist with various tasks. What would you like help with?" },
  { input: "goodbye", response: "Goodbye! Feel free to chat again whenever you need assistance." },
  { input: "bye", response: "Bye! Have a great day!" }
];

// Persistent cache for displayed bot messages
const botMessageDisplayCache = new Map();
// Persistent set for currently animating messages
const botMessageAnimatingSet = new Set();

const ChatbotButton = () => {
  const { 
    isOpen, 
    setIsOpen, 
    messages, 
    sendMessage, 
    resetChat, 
    activeMode, 
    setMode,
    isTyping: contextIsTyping
  } = useChatbot();
  const [input, setInput] = useState('');
  const [trainingData, setTrainingData] = useState(initialTrainingData);
  const [isSending, setIsSending] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const typingMessagesRef = useRef(new Set());
  
  const chatRef = useRef();
  const bodyRef = useRef();
  const API_KEY = 'AIzaSyDwC9ycT1bAbTgeSLmI7sk_AaUjM6IZCTA'; // Your Google API key

  // Typing animation component
  const TypingMessage = ({ message, index }) => {
    const [displayedText, setDisplayedText] = useState(() => {
      const messageId = `bot-${index}-${message.text}`;
      // If this message was already animated, show it immediately
      if (botMessageDisplayCache.has(messageId)) {
        return botMessageDisplayCache.get(messageId);
      }
      return '';
    });
    const [isTypingComplete, setIsTypingComplete] = useState(() => {
      const messageId = `bot-${index}-${message.text}`;
      return botMessageDisplayCache.has(messageId);
    });
    const messageId = `bot-${index}-${message.text}`;

    // Identify system/initial messages
    const isInitialMessage = index === 0 && message.type === 'bot';
    const isSystemMessage = message.text.startsWith('Switched to') || 
                           message.text.startsWith('Set to') || 
                           message.text.startsWith('Tone set to') ||
                           message.text.startsWith('I apologize, but I encountered a technical issue');

    useEffect(() => {
      // If already cached, do nothing (prevents animation/blank on remount)
      if (botMessageDisplayCache.has(messageId)) return;
      // Mark as animating
      botMessageAnimatingSet.add(messageId);
      if (typingMessagesRef.current.has(messageId)) {
        return; // Already typing this message
      }
      // For the initial message or system messages, show them immediately without animation
      if (isInitialMessage || isSystemMessage) {
        setDisplayedText(message.text);
        setIsTypingComplete(true);
        botMessageDisplayCache.set(messageId, message.text);
        botMessageAnimatingSet.delete(messageId);
        return;
      }
      typingMessagesRef.current.add(messageId);
      let currentIndex = 0;
      const text = message.text;
      const typingSpeed = 20; // milliseconds per character - faster typing speed
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          // Scroll to bottom during typing animation
          if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
          }
          setTimeout(typeNextChar, typingSpeed);
        } else {
          setDisplayedText(text);
          setIsTypingComplete(true);
          typingMessagesRef.current.delete(messageId);
          botMessageDisplayCache.set(messageId, text);
          botMessageAnimatingSet.delete(messageId);
          // Final scroll to bottom when typing is complete
          if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
          }
        }
      };
      // Start typing after a small delay
      setTimeout(typeNextChar, 100);
      // Cleanup: remove from animating set if unmounted
      return () => {
        botMessageAnimatingSet.delete(messageId);
      };
    }, [message.text, index, messageId]);

    if (!displayedText && isTypingComplete && !isInitialMessage && !isSystemMessage) {
      return null;
    }
    return (
      <BotMessage key={`bot-${index}`}>
        <TypingText>
          {displayedText}
        </TypingText>
        {!isTypingComplete && <TypingCursor />}
      </BotMessage>
    );
  };

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  };

  // Effect to scroll down whenever messages change
  useEffect(() => {
    // Only scroll if there are messages, we're not in the middle of typing, and input is not focused
    if (messages.length > 0 && !contextIsTyping && !isInputFocused) {
      // Use a small delay to ensure the DOM has updated
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [messages.length, contextIsTyping, isInputFocused]);

  // Additional effect to scroll during typing animation
  useEffect(() => {
    if (contextIsTyping) {
      const intervalId = setInterval(() => {
        scrollToBottom();
      }, 100);
      
      return () => clearInterval(intervalId);
    }
  }, [contextIsTyping]);

  const toggleChatbot = (e) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = (e) => {
    if (chatRef.current && !chatRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Simple function to find a response from our training data
  const findResponse = (userInput) => {
    const normalizedInput = userInput.toLowerCase().trim();
    
    // First try to find an exact match
    const exactMatch = trainingData.find(item => 
      item.input.toLowerCase() === normalizedInput
    );
    
    if (exactMatch) return exactMatch.response;
    
    // If no exact match, try to find a partial match
    const partialMatch = trainingData.find(item => 
      normalizedInput.includes(item.input.toLowerCase())
    );
    
    if (partialMatch) return partialMatch.response;
    
    // Default response if no match is found
    return "I'm still learning! Could you please rephrase that or ask something else?";
  };

  // Function to call external AI API (Google's API in this case)
  const getAIResponse = async (userInput) => {
    try {
      // This is a placeholder for actual API implementation
      // You would replace this with actual Google AI API calls
      
      // For demonstration, we'll use our local matching function
      return findResponse(userInput);
      
      // Actual implementation would look something like:
      /*
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userInput }] }]
        })
      });
      
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
      */
    } catch (error) {
      console.error('Error getting AI response:', error);
      return "Sorry, I encountered an error. Please try again.";
    }
  };

  // Function to add a new training example
  const learnFromInteraction = (userInput, botResponse) => {
    // Check if we already have this exact input
    const existingEntry = trainingData.find(item => 
      item.input.toLowerCase() === userInput.toLowerCase()
    );
    
    if (!existingEntry) {
      setTrainingData(prev => [...prev, { input: userInput, response: botResponse }]);
    }
  };

  const summarizeText = (text, wordLimit = 100) => {
    const words = text.split(/\s+/);
    if (words.length <= wordLimit) return text;
    // Try to summarize by keeping the first 50 and last 50 words
    return words.slice(0, 50).join(' ') + ' ... ' + words.slice(-50).join(' ');
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setIsSending(true);
    const userInput = input;
    setInput('');
    await sendMessage(userInput);
    setIsSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handlePaste = (e) => {
    // Prevent any default paste behavior that might cause scrolling
    e.stopPropagation();
  };

  return (
    <>
      <ChatButton onClick={toggleChatbot} aria-label="Open chat">
        <svg 
          height="24px"
          fill="white" 
          xmlSpace="preserve" 
          viewBox="0 0 1000 1000" 
          y="0px" 
          x="0px" 
          version="1.1"
        >
          <path d="M881.1,720.5H434.7L173.3,941V720.5h-54.4C58.8,720.5,10,671.1,10,610.2v-441C10,108.4,58.8,59,118.9,59h762.2C941.2,59,990,108.4,990,169.3v441C990,671.1,941.2,720.5,881.1,720.5L881.1,720.5z M935.6,169.3c0-30.4-24.4-55.2-54.5-55.2H118.9c-30.1,0-54.5,24.7-54.5,55.2v441c0,30.4,24.4,55.1,54.5,55.1h54.4h54.4v110.3l163.3-110.2H500h381.1c30.1,0,54.5-24.7,54.5-55.1V169.3L935.6,169.3z M717.8,444.8c-30.1,0-54.4-24.7-54.4-55.1c0-30.4,24.3-55.2,54.4-55.2c30.1,0,54.5,24.7,54.5,55.2C772.2,420.2,747.8,444.8,717.8,444.8L717.8,444.8z M500,444.8c-30.1,0-54.4-24.7-54.4-55.1c0-30.4,24.3-55.2,54.4-55.2c30.1,0,54.4,24.7,54.4,55.2C554.4,420.2,530.1,444.8,500,444.8L500,444.8z M282.2,444.8c-30.1,0-54.5-24.7-54.5-55.1c0-30.4,24.4-55.2,54.5-55.2c30.1,0,54.4,24.7,54.4,55.2C336.7,420.2,312.3,444.8,282.2,444.8L282.2,444.8z" />
        </svg>
      </ChatButton>

      <ChatPopup isOpen={isOpen} ref={chatRef}>
        <ChatHeader>
          <div>Bol Bacchan AI</div>
          <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
        </ChatHeader>
        
        <ModeSelector>
          <ModeButton 
            active={activeMode === 'general'} 
            onClick={() => setMode('general')}
          >
            General
          </ModeButton>
          <ModeButton 
            active={activeMode === 'content'} 
            onClick={() => setMode('content')}
          >
            Content
          </ModeButton>
          <ModeButton 
            active={activeMode === 'plagiarism'} 
            onClick={() => setMode('plagiarism')}
          >
            Plagiarism
          </ModeButton>
        </ModeSelector>
        
        <ChatBody ref={bodyRef}>
          {messages.map((message, index) => (
            message.type === 'bot' && message.text.trim() !== '' ? (
              <TypingMessage key={`bot-${index}`} message={message} index={index} />
            ) : message.type === 'user' ? (
              <UserMessage key={`user-${index}`}>
                {message.text}
              </UserMessage>
            ) : null
          ))}
          
          {contextIsTyping && (
            <TypingIndicator>
              <span></span>
              <span></span>
              <span></span>
            </TypingIndicator>
          )}
        </ChatBody>
        
        <InputArea>
          <MessageInput 
            type="text" 
            placeholder={`Type your message for ${activeMode} mode...`}
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <SendButton onClick={handleSendMessage} className={isSending || contextIsTyping ? 'sending' : ''} disabled={isSending || contextIsTyping}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SendButton>
        </InputArea>
      </ChatPopup>
    </>
  );
};

export default ChatbotButton;