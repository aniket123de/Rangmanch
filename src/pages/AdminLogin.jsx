import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Hardcoded admin credentials
  const ADMIN_USERID = 'admin';
  const ADMIN_PASSWORD = 'rangmanch123';

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggingIn && userid && password) {
      setIsLoggingIn(true);
      setErrorMessage('');

      // Simulate login delay
      setTimeout(() => {
        if (userid === ADMIN_USERID && password === ADMIN_PASSWORD) {
          // Store admin session
          localStorage.setItem('adminLoggedIn', 'true');
          navigate('/admin/dashboard');
        } else {
          setErrorMessage('Invalid credentials. Please try again.');
        }
        setIsLoggingIn(false);
      }, 1000);
    }
  }

  return (
    <StyledWrapper $isDark={isDark}>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-300">
        <div id="form-ui">
          <form onSubmit={onSubmit} id="form">
            <div id="form-body">
              <div id="welcome-lines">
                <div id="welcome-line-1">Admin Portal</div>
                <div id="welcome-line-2">Rangmanch Administration</div>
              </div>
              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}
              <div id="input-area">
                <div className="form-inp">
                  <input
                    placeholder="User ID"
                    type="text"
                    value={userid}
                    onChange={(e) => setUserid(e.target.value)}
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
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? 'Logging in...' : 'Login as Admin'}
                </button>
              </div>
              <div className="demo-credentials">
                <p>Demo Credentials:</p>
                <p>User ID: admin</p>
                <p>Password: rangmanch123</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  #form-ui {
    max-width: 350px;
    margin: auto;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 16px;
  }

  #form-body {
    background-color: ${props => props.$isDark ? '#1e1e1e' : '#fff'};
    border: 1px solid ${props => props.$isDark ? '#333' : '#d4d4d4'};
    box-shadow: 0 5px 20px rgba(0, 0, 0, ${props => props.$isDark ? '0.3' : '0.1'});
    border-radius: 15px;
    padding: 50px;
    transition: all 0.3s ease;
  }

  #welcome-lines {
    text-align: center;
    line-height: 1;
  }

  #welcome-line-1 {
    color: ${props => props.$isDark ? '#fff' : '#333'};
    font-weight: 600;
    font-size: 35px;
    margin-bottom: 10px;
    background: linear-gradient(45deg, #9d4edd, #c77dff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  #welcome-line-2 {
    color: ${props => props.$isDark ? '#ccc' : '#777'};
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 40px;
  }

  .error-message {
    background-color: #fee;
    color: #c33;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid #fcc;
    text-align: center;
    font-size: 14px;
  }

  .demo-credentials {
    margin-top: 20px;
    padding: 15px;
    background-color: ${props => props.$isDark ? '#2a2a2a' : '#f8f9fa'};
    border-radius: 8px;
    border: 1px solid ${props => props.$isDark ? '#444' : '#e9ecef'};
    
    p {
      margin: 5px 0;
      font-size: 12px;
      color: ${props => props.$isDark ? '#ccc' : '#666'};
    }
    
    p:first-child {
      font-weight: 600;
      color: ${props => props.$isDark ? '#fff' : '#333'};
    }
  }

  #input-area {
    margin-bottom: 25px;
  }

  .form-inp {
    position: relative;
    margin-bottom: 25px;
  }

  .form-inp input {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    padding: 0 15px;
    border: 1.5px solid ${props => props.$isDark ? '#444' : '#d0d7de'};
    border-radius: 8px;
    outline: none;
    background: ${props => props.$isDark ? '#2a2a2a' : '#fff'};
    color: ${props => props.$isDark ? '#fff' : '#333'};
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
      border-color: #9d4edd;
      box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.1);
    }

    &::placeholder {
      color: ${props => props.$isDark ? '#888' : '#999'};
    }
  }

  #submit-button-cvr {
    margin-bottom: 25px;
  }

  #submit-button {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    background: linear-gradient(135deg, #9d4edd, #c77dff);
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(157, 78, 221, 0.3);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    &:hover:not(:disabled)::before {
      left: 100%;
    }
  }
`;

export default AdminLogin;
