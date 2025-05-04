import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const TermsContainer = styled.div`
  background: #111420;
  min-height: 100vh;
  padding: 8rem 2rem;
  color: #e0e0e0;
  line-height: 1.6;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 7rem 1rem;
  }
`;

const GradientHeader = styled.h1`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #9d4edd, #c77dff, #ff9e00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const Section = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  border-left: 4px solid #9d4edd;
  padding: 0 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-left-color: #ddff00;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionHeader = styled.div`
  color: #c77dff;
  font-size: 1.5rem;
  margin: 1.5rem 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NumberBadge = styled.span`
  background: linear-gradient(45deg, #9d4edd, #c77dff);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }
`;

const SectionContent = styled.div`
  padding: 1rem 0;
  border-top: 1px solid rgba(157, 78, 221, 0.2);

  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
`;

const Highlight = styled.span`
  color: #ddff00;
  font-weight: 500;
`;

const ContactBox = styled.div`
  background: rgba(157, 78, 221, 0.1);
  padding: 1.5rem;
  border-radius: 10px;
  border: 2px solid #9d4edd;
  margin: 2rem 0;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.9rem;
  }
`;

const TermsAndConditions = () => {
  const [openSections, setOpenSections] = useState(new Set());

  const toggleSection = (index) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  const sections = [
    {
      title: "Introduction",
      content: `Welcome to Rangmanch! These Terms and Conditions ("Terms") govern your use of our platform, including the AI-powered content suggestion tool, brand-creator matchmaking services, audience sentiment analysis, and campaign optimization features. By accessing or using Rangmanch, you acknowledge that you have read, understood, and agreed to these Terms.`
    },
    {
      title: "Eligibility",
      content: `You must be at least 18 years old to register and use Rangmanch. By using our platform, you represent that you have the authority and legal capacity to enter into a binding agreement.`
    },
    {
      title: "User Accounts",
      content: `You are required to create an account to access certain features of Rangmanch. You agree to provide accurate, current, and complete information during registration and to update such information as needed. You are responsible for maintaining the confidentiality of your login credentials. Rangmanch is not liable for any loss or damage arising from unauthorized access to your account.`
    },
    {
      title: "Services Provided",
      content: `Rangmanch offers the following services:
      - AI Content Suggestion: Personalized content ideas for creators and brands
      - Brand-Creator Matchmaking: AI-based discovery and collaboration opportunities
      - Audience Sentiment Analysis: Real-time insights based on user comments and engagement
      - Campaign Optimization: Predictive analysis to maximize campaign reach and ROI
      
      Note: Service availability and features may change, improve, or be discontinued at our discretion, without prior notice.`
    },
    {
      title: "User Responsibilities",
      content: `You agree to use Rangmanch for lawful purposes only. You must not upload or share any content that is offensive, defamatory, infringing, obscene, or illegal. You agree not to disrupt the operation of the platform, introduce malware, or attempt unauthorized access. You agree not to misuse AI outputs for harmful activities or false representation.`
    },
    {
      title: "Intellectual Property Rights",
      content: `<b>Ownership:</b> Rangmanch, including its AI models, design, logos, branding, and platform functionalities, are the exclusive intellectual property of Rangmanch Technologies Pvt Ltd.
      
      <b>License to Users:</b> Users retain rights to their uploaded content but grant Rangmanch a limited, non-exclusive, royalty-free license to display, promote, and use content for platform functionality (such as recommendations to brands).`
    },
    {
      title: "Payment Terms",
      content: `<b>Creators:</b> Free access to core features; premium analytics may involve subscription fees (future roadmap).
      
      <b>Brands:</b> Usage of advanced matchmaking tools and campaign prediction tools may require paid subscriptions or per-use charges.
      
      No refund policy once services are availed, unless explicitly mentioned under special offers.`
    },
    {
      title: "Content Guidelines",
      content: `You must ensure that any content posted (profile, portfolios, posts) complies with copyright laws. Prohibited content includes plagiarized material, abusive language, misleading claims, and content inciting violence or hatred.`
    },
    {
      title: "Limitation of Liability",
      content: `Rangmanch will not be liable for any indirect, incidental, special, or consequential damages, including but not limited to loss of profits, data, goodwill, or business opportunities. Rangmanch makes no guarantees regarding specific results (e.g., guaranteed brand deals, viral campaigns) arising from the use of its platform.`
    },
    {
      title: "Account Suspension and Termination",
      content: `Rangmanch reserves the right to suspend or terminate your account if you breach these Terms, without liability or refund. Users may also delete their account at any time by contacting our support team.`
    },
    {
      title: "Modifications to Terms",
      content: `We reserve the right to update or modify these Terms at any time. If changes are made, a notification will be sent via email or posted prominently on the platform. Continued use after modifications indicates your acceptance of the revised Terms.`
    },
    {
      title: "Privacy Policy",
      content: `For details on how Rangmanch collects, uses, and protects your personal data, please refer to our Privacy Policy.`
    },
    {
      title: "Governing Law and Jurisdiction",
      content: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts located in Kolkata, West Bengal.`
    },
    {
      title: "Contact Information",
      content: `For any questions or clarifications regarding these Terms, please reach out to:`
    }
  ];

  return (
    <TermsContainer>
      <GradientHeader>Terms & Conditions</GradientHeader>

      {sections.map((section, index) => (
        <Section key={index}>
          <SectionHeader onClick={() => toggleSection(index)}>
            <NumberBadge>{index + 1}</NumberBadge>
            {section.title}
            {openSections.has(index) ? 
              <FiChevronUp style={{ marginLeft: 'auto', color: '#c77dff' }} /> :
              <FiChevronDown style={{ marginLeft: 'auto', color: '#c77dff' }} />
            }
          </SectionHeader>
          {openSections.has(index) && (
            <SectionContent>
              {index === 13 ? (
                <ContactBox>
                  <Highlight>📧 Email:</Highlight> support@rangmanch.ai<br/>
                  <Highlight>📍 Address:</Highlight> Rangmanch Technologies Pvt Ltd, Kolkata, India
                </ContactBox>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }} />
              )}
            </SectionContent>
          )}
        </Section>
      ))}
    </TermsContainer>
  );
};

export default TermsAndConditions;