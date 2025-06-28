import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { signInWithGoogle, signIn } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';

const Login = () => {
  const { isDark } = useContext(ThemeContext);
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn && email && password) {
      try {
        setIsSigningIn(true);
        setErrorMessage('');
        await signIn(email, password);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  }

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      try {
        setIsSigningIn(true);
        setErrorMessage('');
        await signInWithGoogle();
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  }

  return (
    <>
      {userLoggedIn && <Navigate to="/" replace={true} />}
      <StyledWrapper $isDark={isDark}>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-300">
          <div id="form-ui">
            <form onSubmit={onSubmit} id="form">
              <div id="form-body">
                <div id="welcome-lines">
                  <div id="welcome-line-1">Rangmanch</div>
                  <div id="welcome-line-2">Login to Proceed</div>
                </div>
                {errorMessage && (
                  <div className="error-message">
                    {errorMessage}
                  </div>
                )}
                <div id="input-area">
                  <div className="form-inp">
                    <input
                      placeholder="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-inp">
                    <input
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div id="submit-button-cvr">
                  <button 
                    id="submit-button" 
                    type="submit"
                    disabled={isSigningIn}
                  >
                    {isSigningIn ? 'Logging in...' : 'Login'}
                  </button>
                </div>
                <div id="separator">
                  <span>OR</span>
                </div>
                <div id="google-button-cvr">
                  <button 
                    id="google-button" 
                    type="button"
                    onClick={onGoogleSignIn}
                    disabled={isSigningIn}
                  >
                    <img src="/google-icon.svg" alt="Google" />
                    {isSigningIn ? 'Signing in...' : 'Continue with Google'}
                  </button>
                </div>
                <div id="forgot-pass">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
                <div id="sign-up-link">
                  <Link to="/signup">Don't have an account? Sign up</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
}

const StyledWrapper = styled.div`
  #form-ui {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    margin-top: 60px;
  }

  #form {
    position: relative;
    width: 320px;
    height: auto;
    padding: 35px;
    background-color: ${props => props.$isDark ? '#161616' : '#ffffff'};
    box-shadow: 0px 15px 60px ${props => props.$isDark ? '#9d4edd' : '#c77dff'};
    outline: 1px solid ${props => props.$isDark ? '#c77dff' : '#9d4edd'};
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  #form-body {
    position: relative;
    width: 100%;
    margin-top: 5px;
  }

  #welcome-lines {
    text-align: center;
    line-height: 1;
    margin-bottom: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
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

  #input-area {
    margin-top: 40px;
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

  #separator {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0;
  }

  #separator::before,
  #separator::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${props => props.$isDark ? '#666' : '#e0e0e0'};
  }

  #separator span {
    padding: 0 10px;
    color: ${props => props.$isDark ? '#666' : '#999'};
    font-size: 12px;
  }

  #google-button-cvr {
    margin-top: 20px;
  }

  #google-button {
    width: 100%;
    padding: 12px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  #google-button:hover {
    background: #f5f5f5;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  #google-button img {
    width: 18px;
    height: 18px;
  }

  #google-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  #forgot-pass {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  #forgot-pass a {
    color: ${props => props.$isDark ? '#666' : '#999'};
    font-size: 12px;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  #forgot-pass a:hover {
    color: #ff9e00;
  }

  #sign-up-link {
    text-align: center;
    margin-top: 5px;
    padding-bottom: 10px;
  }

  #sign-up-link a {
    color: ${props => props.$isDark ? '#c77dff' : '#9d4edd'};
    font-size: 14px;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  #sign-up-link a:hover {
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

  .error-message {
    text-align: center;
    color: #ef4444;
    margin: 10px 0;
    padding: 8px;
    border-radius: 8px;
    background-color: ${props => props.$isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
    font-size: 14px;
  }

  #submit-button:disabled,
  #google-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default Login; 