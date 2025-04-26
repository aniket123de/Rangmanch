import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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
  bottom: 90px;
  left: 20px;
  width: 320px;
  height: 450px;
  background: linear-gradient(145deg, #2b1250, #1a0933);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 1000;
  transform-origin: bottom left;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: ${props => props.isOpen ? 1 : 0};
  transform: ${props => props.isOpen ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)'};
  pointer-events: ${props => props.isOpen ? 'all' : 'none'};
  border: 1px solid #c77dff;
`;

const ChatHeader = styled.div`
  background: linear-gradient(90deg, #9d4edd, #c77dff);
  color: white;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 2px 10px rgba(157, 78, 221, 0.3);
`;

const ChatBody = styled.div`
  padding: 15px;
  height: calc(100% - 80px);
  overflow-y: auto;
  background: rgba(26, 9, 51, 0.7);
`;

const WelcomeMessage = styled.div`
  background: rgba(157, 78, 221, 0.15);
  color: #f0e6ff;
  border-radius: 12px;
  padding: 12px 15px;
  margin-bottom: 10px;
  border-left: 3px solid #ddff00;
  font-size: 14px;
  line-height: 1.5;
  backdrop-filter: blur(5px);
`;

const ChatbotButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const chatRef = useRef();
  
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
  
    return (
      <>
        <ChatButton onClick={toggleChatbot} aria-label="Open chat">
          <svg 
            height="1.6em" 
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
          <ChatHeader>Virtual Assistant</ChatHeader>
          <ChatBody>
            <WelcomeMessage>
              <strong>Hello! 👋</strong><br />
              I'm your virtual assistant. How can I help you today?
            </WelcomeMessage>
          </ChatBody>
        </ChatPopup>
      </>
    );
  };
  
  export default ChatbotButton;