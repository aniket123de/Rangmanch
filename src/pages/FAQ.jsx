import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQContainer = styled.div`
  background: #111420;
  min-height: 100vh;
  padding: 8rem 1rem 4rem; /* Adjusted padding for mobile responsiveness */
`;

const GradientHeader = styled.h1`
  font-size: 2.5rem; /* Adjusted font size for smaller screens */
  text-align: center;
  margin-bottom: 2rem; /* Adjusted margin for better spacing */
  background: linear-gradient(45deg, #9d4edd, #c77dff, #ff9e00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: -1px;

  @media (min-width: 768px) {
    font-size: 4rem; /* Larger font size for tablets and above */
    margin-bottom: 3rem;
  }
`;

const FAQItem = styled.div`
  max-width: 100%; /* Full width for mobile */
  margin: 1rem auto;
  border-radius: 15px;
  background: #1a1a2e;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;

  @media (min-width: 768px) {
    max-width: 800px; /* Restrict width for larger screens */
  }
`;

const QuestionButton = styled.button`
  width: 100%;
  padding: 1rem; /* Adjusted padding for smaller screens */
  text-align: left;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1rem; /* Adjusted font size for smaller screens */
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(157, 78, 221, 0.1);
  }

  @media (min-width: 768px) {
    padding: 1.5rem; /* Larger padding for tablets and above */
    font-size: 1.2rem; /* Larger font size for tablets and above */
  }
`;

const AnswerContent = styled.div`
  padding: ${props => props.isActive ? '1rem' : '0'}; /* Adjusted padding for smaller screens */
  color: #c7c7c7;
  line-height: 1.4; /* Adjusted line height for better readability */
  height: ${props => props.isActive ? 'auto' : '0'};
  opacity: ${props => props.isActive ? '1' : '0'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: 768px) {
    line-height: 1.6; /* Larger line height for tablets and above */
  }
`;

const IconWrapper = styled.span`
  color: #c77dff;
  font-size: 1.5rem;
  margin-left: 1rem;
  transition: transform 0.3s ease;
`;

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { isDark } = useTheme();

  const faqs = [
    {
      question: "What is Rangmanch?",
      answer: "Rangmanch is an AI-powered content and creator platform that helps brands discover ideal creators, generate smarter content ideas, analyze audience sentiment, and optimize marketing campaigns in real time."
    },
    {
      question: "How does Rangmanch help brands?",
      answer: "Brands can find the best-matched creators using AI matchmaking, predict campaign performance before launch, and monitor real-time sentiment and engagement — saving time, money, and maximizing impact."
    },
    {
      question: "How does Rangmanch assist content creators?",
      answer: "Creators get AI-generated content ideas, audience growth insights, a personalized posting calendar, and visibility to brands looking for collaborations — helping them scale faster and smarter."
    },
    {
      question: "What makes Rangmanch different from traditional influencer platforms?",
      answer: "Unlike traditional platforms, Rangmanch uses real-time trend detection, sentiment heatmaps, and campaign simulators to create dynamic, data-backed experiences for both creators and brands."
    },
    {
      question: "How accurate is the AI-driven sentiment analysis?",
      answer: "Our machine learning models are trained on large datasets and refined continuously to deliver sentiment analysis with high accuracy, helping users truly understand their audience's emotions."
    },
    {
      question: "Is there a cost to use Rangmanch?",
      answer: "Rangmanch offers flexible models — a free basic plan for creators, and paid plans for brands with advanced AI features like Campaign Predictor and TrendPulse."
    },
    {
      question: "How secure is my data on Rangmanch?",
      answer: "Data privacy and security are our top priorities. Rangmanch follows strict data protection policies and complies with industry standards to ensure user information is safe."
    },
    {
      question: "Can I integrate my social media accounts with Rangmanch?",
      answer: "Yes, Rangmanch supports secure integration with platforms like Instagram, YouTube, and Twitter for better analytics, trend tracking, and automated content suggestions."
    },
    {
      question: "How are creators matched with brands?",
      answer: "Our AI matchmaking engine analyzes content style, audience demographics, past engagement, and brand needs to suggest the best creator-brand partnerships automatically."
    },
    {
      question: "How quickly can I start seeing results?",
      answer: "Users typically start seeing smarter content suggestions, better engagement insights, and improved campaign planning within the first week of using Rangmanch."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <FAQContainer>
      <GradientHeader>Frequently Asked Questions</GradientHeader>
      
      {faqs.map((faq, index) => (
        <FAQItem key={index}>
          <QuestionButton onClick={() => toggleFAQ(index)}>
            <span>{faq.question}</span>
            <IconWrapper>
              {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
            </IconWrapper>
          </QuestionButton>
          <AnswerContent isActive={activeIndex === index}>
            {faq.answer}
          </AnswerContent>
        </FAQItem>
      ))}
    </FAQContainer>
  );
};

export default FAQ;