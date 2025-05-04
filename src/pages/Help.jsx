import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const HelpContainer = styled.div`
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
    margin: 1.5rem auto;
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
    margin: 1rem 0;
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
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
  }
`;

const ContentBox = styled.div`
  padding: 1rem 0;
  border-top: 1px solid rgba(157, 78, 221, 0.2);

  @media (max-width: 768px) {
    padding: 0.8rem 0;
  }
`;

const Highlight = styled.span`
  color: #ddff00;
  font-weight: 500;
`;

const TipBox = styled.div`
  background: rgba(157, 78, 221, 0.1);
  padding: 1.5rem;
  border-radius: 10px;
  border: 2px solid #9d4edd;
  margin: 2rem 0;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1.5rem 0;
  }
`;

const HelpCenter = () => {
  const [openSections, setOpenSections] = useState(new Set());

  const toggleSection = (index) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  const commonIssues = [
    {
      title: "Unable to Log In",
      content: `<b>Problem:</b><br/>
      Users sometimes face login errors due to forgotten passwords, incorrect credentials, or technical glitches.<br/><br/>
      <b>Solution:</b><br/>
      - Double-check your email and password<br/>
      - Use the "Forgot Password" feature<br/>
      - Check spam/junk folder for reset emails<br/>
      - Contact support@rangmanch.ai if issues persist`
    },
    {
      title: "Content Idea Generator Not Loading",
      content: `<b>Problem:</b><br/>
      AI content suggestion tool sometimes gets stuck loading or fails to deliver results.<br/><br/>
      <b>Solution:</b><br/>
      - Ensure stable internet connection<br/>
      - Clear browser cache and cookies<br/>
      - Log out and log back in<br/>
      - Report the issue through Help > Submit a Bug`
    },
    {
      title: "Delay in Sentiment Analysis Results",
      content: `<b>Problem:</b><br/>
      Audience sentiment analysis tool takes longer to process or shows incomplete results.<br/><br/>
      <b>Solution:</b><br/>
      - Ensure uploaded file meets format guidelines (CSV/JSON)<br/>
      - Avoid very large datasets (>10,000 comments)<br/>
      - Wait for processing time or contact support if exceeding 10 minutes`
    },
    {
      title: "Can't Find the Right Creator or Brand",
      content: `<b>Problem:</b><br/>
      Brands and creators sometimes struggle with matching or discoverability.<br/><br/>
      <b>Solution for Brands:</b><br/>
      - Use advanced search filters<br/>
      - Post detailed campaign briefs<br/><br/>
      <b>Solution for Creators:</b><br/>
      - Keep profile updated<br/>
      - Engage actively on the platform`
    },
    {
      title: "Payment Delays",
      content: `<b>Problem:</b><br/>
      Creators experience payment delays post-project completion.<br/><br/>
      <b>Solution:</b><br/>
      - Ensure bank/payment details are correctly filled<br/>
      - Wait 7 working days for processing<br/>
      - Raise a Payment Issue ticket if delay exceeds timeline`
    },
    {
      title: "Issues with Campaign Submissions",
      content: `<b>Problem:</b><br/>
      Creators face difficulty submitting deliverables.<br/><br/>
      <b>Solution:</b><br/>
      - Compress large files<br/>
      - Use recommended file formats (JPEG, PNG, MP4, PDF)<br/>
      - Click "Submit for Review" after uploading`
    },
    {
      title: "Account Deactivation or Deletion",
      content: `<b>Problem:</b><br/>
      Users are unsure how to deactivate or permanently delete accounts.<br/><br/>
      <b>Solution:</b><br/>
      - Go to Settings > Account Management > Deactivate Account for temporary pause<br/>
      - For permanent deletion, request via Settings > Privacy > Request Account Deletion<br/>
      - Confirm deletion via email; note deletion is irreversible`
    },
    {
      title: "Notifications Not Received",
      content: `<b>Problem:</b><br/>
      Users miss important alerts, collaborations, or campaign updates.<br/><br/>
      <b>Solution:</b><br/>
      - Check notification settings in your account<br/>
      - Allow notifications in browser/device settings<br/>
      - Check spam or promotion folders in email`
    },
    {
      title: "Profile Verification Delays",
      content: `<b>Problem:</b><br/>
      Verification of creator/business profiles takes longer than expected.<br/><br/>
      <b>Solution:</b><br/>
      - Ensure correct and valid documents are uploaded<br/>
      - Wait 48-72 hours for verification<br/>
      - Contact support if delayed beyond 5 days`
    },
    {
      title: "Unable to Upload Files or Media",
      content: `<b>Problem:</b><br/>
      Users face upload failures due to file size or unsupported formats.<br/><br/>
      <b>Solution:</b><br/>
      - Check maximum file size (usually 25MB)<br/>
      - Supported formats: JPEG, PNG, MP4, PDF<br/>
      - Use compression tools if needed`
    },
    {
      title: "Difficulty Accessing Premium Features",
      content: `<b>Problem:</b><br/>
      Users with paid plans unable to access premium tools/features.<br/><br/>
      <b>Solution:</b><br/>
      - Confirm subscription is active<br/>
      - Refresh the page or log out/in<br/>
      - If still inaccessible, raise a support request`
    },
    {
      title: "Project/Deal Disputes",
      content: `<b>Problem:</b><br/>
      Disagreement between brand and creator regarding deliverables or payment.<br/><br/>
      <b>Solution:</b><br/>
      - Use in-app chat to clarify deliverables<br/>
      - If unresolved, escalate via "Raise Dispute" option<br/>
      - Admin team will mediate within 5 working days`
    },
    {
      title: "Two-Factor Authentication (2FA) Issues",
      content: `<b>Problem:</b><br/>
      Trouble setting up or using 2FA while logging in.<br/><br/>
      <b>Solution:</b><br/>
      - Check if authentication app (Google Authenticator/Authy) is synced<br/>
      - Re-scan QR code if initial setup fails<br/>
      - Contact support for manual 2FA reset`
    }
  ];
  

  const troubleshooting = [
    "Refresh the page and retry",
    "Check for browser updates",
    "Log out and log back in",
    "Clear cookies/cache",
    "Try different device"
  ];

  const proactiveTips = [
    "Keep profile updated",
    "Regularly save content drafts",
    "Follow format guidelines",
    "Read campaign requirements carefully"
  ];

  return (
    <HelpContainer>
      <GradientHeader>Help Center</GradientHeader>

      {/* Common Issues */}
      {commonIssues.map((issue, index) => (
        <Section key={index}>
          <SectionHeader onClick={() => toggleSection(index)}>
            <NumberBadge>{index + 1}</NumberBadge>
            {issue.title}
            {openSections.has(index) ? 
              <FiChevronUp style={{ marginLeft: 'auto', color: '#c77dff' }} /> :
              <FiChevronDown style={{ marginLeft: 'auto', color: '#c77dff' }} />
            }
          </SectionHeader>
          {openSections.has(index) && (
            <ContentBox dangerouslySetInnerHTML={{ __html: issue.content }} />
          )}
        </Section>
      ))}

      {/* Troubleshooting Checklist */}
      <Section>
        <SectionHeader>
          <NumberBadge>!</NumberBadge>
          General Troubleshooting Checklist
        </SectionHeader>
        <ContentBox>
          {troubleshooting.map((item, index) => (
            <div key={index}>✦ {item}</div>
          ))}
        </ContentBox>
      </Section>

      {/* Proactive Tips */}
      <Section>
        <SectionHeader>
          <NumberBadge>🌟</NumberBadge>
          Proactive Tips
        </SectionHeader>
        <ContentBox>
          {proactiveTips.map((tip, index) => (
            <div key={index}>◈ {tip}</div>
          ))}
        </ContentBox>
      </Section>

      {/* Contact Section */}
      <TipBox>
        <h3 style={{ color: '#c77dff' }}>Need More Help?</h3>
        <p>📧 Email: <Highlight>support@rangmanch.ai</Highlight></p>
        <p>📞 Hotline: Monday–Saturday, 10 AM – 6 PM IST</p>
        <p>⏳ Response Time: Within 24 hours</p>
      </TipBox>
    </HelpContainer>
  );
};

export default HelpCenter;