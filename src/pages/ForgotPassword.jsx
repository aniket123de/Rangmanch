import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <StyledWrapper $isDark={isDark}>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-300">
        <div id="form-ui">
          <form action="" method="post" id="form">
            <div id="form-body">
              <div id="welcome-lines">
                <div id="welcome-line-1">Rangmanch</div>
                <div id="welcome-line-2">Reset Password</div>
              </div>
              <div id="message-box">
                <p>Enter your email address and we'll send you a link to reset your password.</p>
              </div>
              <div id="input-area">
                <div className="form-inp">
                  <input placeholder="Email Address" type="email" required />
                </div>
              </div>
              <div id="submit-button-cvr">
                <button id="submit-button" type="submit">Send Reset Link</button>
              </div>
              <div id="back-to-login">
                <Link to="/login">Back to Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #form-ui {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
  }

  #form {
    position: relative;
    width: 320px;
    height: auto;
    min-height: 400px;
    padding: 25px;
    background-color: ${props => props.$isDark ? '#161616' : '#ffffff'};
    box-shadow: 0px 15px 60px ${props => props.$isDark ? '#9d4edd' : '#c77dff'};
    outline: 1px solid ${props => props.$isDark ? '#c77dff' : '#9d4edd'};
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  #form-body {
    position: relative;
    width: 100%;
  }

  #welcome-lines {
    text-align: center;
    line-height: 1;
    margin-bottom: 25px;
  }

  #welcome-line-1 {
    background: linear-gradient(45deg, #9d4edd, #c77dff, #ff9e00, #ddff00);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 600;
    font-size: 40px;
    letter-spacing: -1px;
  }

  #welcome-line-2 {
    color: ${props => props.$isDark ? '#ffffff' : '#161616'};
    font-size: 18px;
    margin-top: 17px;
    transition: color 0.3s ease;
  }

  #message-box {
    text-align: center;
    margin-bottom: 25px;
    padding: 0 20px;
  }

  #message-box p {
    color: ${props => props.$isDark ? '#999' : '#666'};
    font-size: 14px;
    line-height: 1.4;
  }

  #input-area {
    margin-top: 25px;
  }

  .form-inp {
    position: relative;
    width: 100%;
    margin-bottom: 15px;
  }

  .form-inp input {
    width: 100%;
    padding: 11px 25px;
    background: transparent;
    border: 1px solid ${props => props.$isDark ? '#c77dff' : '#9d4edd'};
    border-radius: 8px;
    font-size: 13.4px;
    color: ${props => props.$isDark ? '#c77dff' : '#9d4edd'};
    font-weight: 400;
    transition: all 0.3s ease;
  }

  .form-inp input:focus {
    outline: none;
    border: 1px solid #ff9e00;
    box-shadow: 0 0 10px rgba(255, 158, 0, 0.3);
  }

  .form-inp input::placeholder {
    color: ${props => props.$isDark ? '#666' : '#999'};
    font-size: 13.4px;
  }

  #submit-button-cvr {
    margin-top: 30px;
  }

  #submit-button {
    display: block;
    width: 100%;
    background: linear-gradient(45deg, #9d4edd, #c77dff);
    color: white;
    font-weight: 600;
    font-size: 14px;
    margin: 0;
    padding: 14px 13px;
    border: 0;
    border-radius: 8px;
    line-height: 1;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  #submit-button:hover {
    background: linear-gradient(45deg, #ff9e00, #ddff00);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(157, 78, 221, 0.3);
  }

  #back-to-login {
    text-align: center;
    margin-top: 20px;
  }

  #back-to-login a {
    color: ${props => props.$isDark ? '#c77dff' : '#9d4edd'};
    font-size: 14px;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  #back-to-login a:hover {
    color: #ff9e00;
  }

  #bar {
    position: absolute;
    left: 50%;
    bottom: -80px;
    width: 28px;
    height: 8px;
    margin-left: -33px;
    background: linear-gradient(45deg, #9d4edd, #c77dff);
    border-radius: 10px;
  }

  #bar:before,
  #bar:after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background: ${props => props.$isDark ? '#ff9e00' : '#ddff00'};
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }

  #bar:before {
    right: -20px;
  }

  #bar:after {
    right: -38px;
  }
`;

export default ForgotPassword; 