import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const PrivacyContainer = styled.div`
  background: #111420;
  min-height: 100vh;
  padding: 8rem 2rem;
  color: #e0e0e0;
  line-height: 1.6;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 7rem 1rem;
    font-size: 0.9rem;
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

const PrivacyPolicy = () => {
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
      content: `At Rangmanch, your privacy is a top priority. This Privacy Policy explains how we collect, use, store, and protect your information when you use our platform, including AI content suggestion, brand-creator matchmaking, and audience analysis features. By using Rangmanch, you agree to the practices described in this Privacy Policy.`
    },
    {
      title: "Information We Collect",
      content: `We collect the following types of information:<br/><br/>
      <b>Personal Information:</b><br/>
      - Name, email address, phone number, location, profile photo<br/><br/>
      <b>Account Information:</b><br/>
      - Username, password, creator/brand details<br/><br/>
      <b>Content Data:</b><br/>
      - Uploaded portfolios, projects, social media handles, campaign details<br/><br/>
      <b>Usage Data:</b><br/>
      - Browser type, IP address, device information, pages visited, session duration<br/><br/>
      <b>Communications:</b><br/>
      - Messages between users, feedback, support tickets<br/><br/>
      <b>AI Interaction Data:</b><br/>
      - Prompts given to AI tools, content suggestions made, user choices`
    },
    {
      title: "How We Use Your Information",
      content: `We use the information to:<br/><br/>
      - Provide personalized content suggestions<br/>
      - Match creators and brands effectively<br/>
      - Analyze audience sentiment for better insights<br/>
      - Improve platform performance and user experience<br/>
      - Communicate important updates or promotional offers<br/>
      - Ensure security and prevent fraudulent activities<br/>
      - Comply with legal obligations`
    },
    {
      title: "Sharing of Information",
      content: `We may share information:<br/><br/>
      - With brands (if you are a creator) or with creators (if you are a brand), only as per collaboration intent<br/>
      - With trusted third-party services (e.g., cloud hosting, analytics providers)<br/>
      - With law enforcement agencies if legally required<br/><br/>
      <b>We do not sell or rent your personal data to any third party.</b>`
    },
    {
      title: "Data Storage and Security",
      content: `Your data is stored securely using encrypted databases and servers. We implement technical and organizational measures to protect your data from unauthorized access, loss, or misuse. Despite our efforts, no platform can guarantee 100% security.`
    },
    {
      title: "Cookies and Tracking Technologies",
      content: `Rangmanch uses cookies to personalize your experience and improve platform performance. Cookies help remember your preferences, login sessions, and measure site usage. You can manage cookie settings through your browser.`
    },
    {
      title: "Your Rights",
      content: `You have the right to:<br/><br/>
      - Access your personal data<br/>
      - Update or correct your data<br/>
      - Request deletion of your account and data<br/>
      - Opt-out of marketing communications at any time<br/><br/>
      To exercise these rights, please contact us at <Highlight>privacy@rangmanch.ai</Highlight>.`
    },
    {
      title: "Third-Party Links",
      content: `Rangmanch may contain links to external sites. We are not responsible for the privacy practices or content of such third-party sites. Please review their policies independently.`
    },
    {
      title: "Children's Privacy",
      content: `Our services are not intended for users under the age of 18. We do not knowingly collect personal data from children. If we discover such data, we will delete it promptly.`
    },
    {
      title: "Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised "Last Updated" date. We encourage you to review the Privacy Policy periodically.`
    },
    {
      title: "Contact Us",
      content: `For any questions or concerns regarding this Privacy Policy, reach out to:`
    }
  ];

  return (
    <PrivacyContainer>
      <GradientHeader>Privacy Policy</GradientHeader>

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
              {index === 10 ? (
                <ContactBox>
                  <Highlight>📧 Email:</Highlight> privacy@rangmanch.ai<br/>
                  <Highlight>📍 Address:</Highlight> Rangmanch Technologies Pvt Ltd, Kolkata, India<br/><br/>
                  <Highlight>📝 Last Updated:</Highlight> April 29, 2025
                </ContactBox>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              )}
            </SectionContent>
          )}
        </Section>
      ))}
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;