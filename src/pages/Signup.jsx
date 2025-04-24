import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import { Link, Navigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import { useAuth } from '../contexts/authContext';

const Signup = () => {
  const { isDark } = useContext(ThemeContext);
  const { userLoggedIn } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    location: '',
    email: '',
    password: '',
    confirmPassword: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    twitter: '',
    contentCategory: '',
    experience: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  });
  
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkPasswordStrength = (password) => {
    const strength = {
      score: 0,
      hasLength: password.length >= 8 && password.length <= 16,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    // Calculate score
    if (strength.hasLength) strength.score++;
    if (strength.hasUppercase) strength.score++;
    if (strength.hasLowercase) strength.score++;
    if (strength.hasNumber) strength.score++;
    if (strength.hasSpecial) strength.score++;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    const { score } = passwordStrength;
    if (score <= 2) return '#ef4444'; // red for weak
    if (score <= 4) return '#eab308'; // yellow for moderate
    return '#22c55e'; // green for strong
  };

  const getPasswordStrengthText = () => {
    const { score } = passwordStrength;
    if (score <= 2) return 'Weak';
    if (score <= 4) return 'Moderate';
    return 'Strong';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const validatePassword = () => {
    const { password } = formData;
    if (!passwordStrength.hasLength) {
      setErrorMessage('Password must be between 8 and 16 characters');
      return false;
    }
    if (!passwordStrength.hasUppercase) {
      setErrorMessage('Password must contain at least one uppercase letter');
      return false;
    }
    if (!passwordStrength.hasLowercase) {
      setErrorMessage('Password must contain at least one lowercase letter');
      return false;
    }
    if (!passwordStrength.hasNumber) {
      setErrorMessage('Password must contain at least one number');
      return false;
    }
    if (!passwordStrength.hasSpecial) {
      setErrorMessage('Password must contain at least one special character');
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSigningUp) return;

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    // Validate password requirements
    if (!validatePassword()) {
      return;
    }

    try {
      setIsSigningUp(true);
      setErrorMessage('');
      await doCreateUserWithEmailAndPassword(formData.email, formData.password, formData.fullName);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSigningUp(false);
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <StyledWrapper $isDark={isDark}>
      <div className="flex items-center justify-center min-h-screen pt-32 pb-20 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-300">
        <div id="form-ui">
          <form onSubmit={onSubmit} id="form">
            <div id="form-body">
              <div id="welcome-lines">
                <div id="welcome-line-1">Rangmanch</div>
                <div id="welcome-line-2">Create Your Account</div>
              </div>
              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}
              <div id="input-area">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div className="section-title">Personal Information</div>
                    <div className="form-inp">
                      <input
                        name="fullName"
                        placeholder="Full Name"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-inp half">
                        <input
                          name="age"
                          placeholder="Age"
                          type="number"
                          value={formData.age}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-inp half">
                        <input
                          name="location"
                          placeholder="Location"
                          type="text"
                          value={formData.location}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-inp">
                      <input
                        name="email"
                        placeholder="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-inp">
                      <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      {formData.password && (
                        <div className="password-strength">
                          <div className="strength-bar">
                            <div 
                              className="strength-fill"
                              style={{
                                width: `${(passwordStrength.score / 5) * 100}%`,
                                backgroundColor: getPasswordStrengthColor()
                              }}
                            />
                          </div>
                          <div className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                            {getPasswordStrengthText()}
                          </div>
                          <div className="password-requirements">
                            <div className={passwordStrength.hasLength ? 'met' : ''}>
                              • 8-16 characters
                            </div>
                            <div className={passwordStrength.hasUppercase ? 'met' : ''}>
                              • One uppercase letter
                            </div>
                            <div className={passwordStrength.hasLowercase ? 'met' : ''}>
                              • One lowercase letter
                            </div>
                            <div className={passwordStrength.hasNumber ? 'met' : ''}>
                              • One number
                            </div>
                            <div className={passwordStrength.hasSpecial ? 'met' : ''}>
                              • One special character
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="form-inp">
                      <input
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Social Media Profiles */}
                  <div className="space-y-4">
                    <div className="section-title">Social Media Profiles</div>
                    <div className="form-inp">
                      <input
                        name="instagram"
                        placeholder="Instagram Handle"
                        type="text"
                        value={formData.instagram}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-inp">
                      <input
                        name="youtube"
                        placeholder="YouTube Channel"
                        type="text"
                        value={formData.youtube}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-inp">
                      <input
                        name="tiktok"
                        placeholder="TikTok Username"
                        type="text"
                        value={formData.tiktok}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-inp">
                      <input
                        name="twitter"
                        placeholder="Twitter Handle"
                        type="text"
                        value={formData.twitter}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Professional Details */}
                    <div className="section-title">Professional Details</div>
                    <div className="form-inp">
                      <select
                        name="contentCategory"
                        value={formData.contentCategory}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Content Category</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="fashion">Fashion</option>
                        <option value="tech">Technology</option>
                        <option value="food">Food</option>
                        <option value="travel">Travel</option>
                        <option value="fitness">Fitness</option>
                        <option value="education">Education</option>
                        <option value="entertainment">Entertainment</option>
                      </select>
                    </div>
                    <div className="form-inp">
                      <input
                        name="experience"
                        placeholder="Years of Experience"
                        type="number"
                        value={formData.experience}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div id="submit-button-cvr">
                <button 
                  id="submit-button" 
                  type="submit"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
              <div id="forgot-pass">
                <Link to="/login">Already have an account? Login</Link>
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
    width: 100%;
    padding: 20px;
  }

  #form {
    position: relative;
    width: 100%;
    max-width: 900px;
    height: auto;
    padding: 40px;
    background-color: ${props => props.$isDark ? '#161616' : '#ffffff'};
    box-shadow: 0px 15px 60px ${props => props.$isDark ? '#9d4edd' : '#c77dff'};
    outline: 1px solid ${props => props.$isDark ? '#c77dff' : '#9d4edd'};
    border-radius: 20px;
    transition: all 0.3s ease;
  }

  #form-body {
    position: relative;
    width: 100%;
  }

  .section-title {
    color: ${props => props.$isDark ? '#c77dff' : '#9d4edd'};
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid ${props => props.$isDark ? '#c77dff30' : '#9d4edd30'};
  }

  #welcome-lines {
    text-align: center;
    line-height: 1;
    margin-bottom: 40px;
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

  .form-row {
    display: flex;
    gap: 15px;
  }

  .form-inp {
    position: relative;
    width: 100%;
  }

  .form-inp.half {
    width: 50%;
  }

  .form-inp input, .form-inp select {
    width: 100%;
    padding: 12px 25px;
    background: transparent;
    border: 1px solid ${props => props.$isDark ? '#c77dff' : '#9d4edd'};
    border-radius: 8px;
    font-size: 14px;
    color: ${props => props.$isDark ? '#c77dff' : '#9d4edd'};
    font-weight: 400;
    transition: all 0.3s ease;
  }

  .form-inp select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${props => props.$isDark ? '%23c77dff' : '%239d4edd'}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
  }

  .form-inp select option {
    background-color: ${props => props.$isDark ? '#161616' : '#ffffff'};
    color: ${props => props.$isDark ? '#c77dff' : '#9d4edd'};
  }

  .form-inp input:focus, .form-inp select:focus {
    outline: none;
    border: 1px solid #ff9e00;
    box-shadow: 0 0 10px rgba(255, 158, 0, 0.3);
  }

  .form-inp input::placeholder {
    color: ${props => props.$isDark ? '#666' : '#999'};
    font-size: 14px;
  }

  #submit-button-cvr {
    margin-top: 40px;
  }

  #submit-button {
    display: block;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background: linear-gradient(45deg, #9d4edd, #c77dff);
    color: white;
    font-weight: 600;
    font-size: 16px;
    padding: 16px;
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

  #forgot-pass {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  #forgot-pass a {
    color: ${props => props.$isDark ? '#c77dff' : '#9d4edd'};
    font-size: 14px;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  #forgot-pass a:hover {
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

  @media (max-width: 768px) {
    #form {
      padding: 25px;
    }
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

  #submit-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .password-strength {
    margin-top: 8px;
    padding: 8px;
    border-radius: 8px;
    background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  }

  .strength-bar {
    height: 4px;
    background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 2px;
    margin-bottom: 8px;
  }

  .strength-fill {
    height: 100%;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .strength-text {
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .password-requirements {
    font-size: 12px;
    color: ${props => props.$isDark ? '#666' : '#999'};

    div {
      margin: 4px 0;
      transition: color 0.3s ease;

      &.met {
        color: #22c55e;
      }
    }
  }
`;

export default Signup; 