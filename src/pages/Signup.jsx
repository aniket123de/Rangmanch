import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <StyledWrapper $isDark={isDark}>
      <div className="flex items-center justify-center min-h-screen pt-32 pb-20 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-300">
        <div id="form-ui">
          <form action="" method="post" id="form">
            <div id="form-body">
              <div id="welcome-lines">
                <div id="welcome-line-1">Rangmanch</div>
                <div id="welcome-line-2">Create Your Account</div>
              </div>
              <div id="input-area">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div className="section-title">Personal Information</div>
                    <div className="form-inp">
                      <input placeholder="Full Name" type="text" required />
                    </div>
                    <div className="form-row">
                      <div className="form-inp half">
                        <input placeholder="Age" type="number" required />
                      </div>
                      <div className="form-inp half">
                        <input placeholder="Location" type="text" required />
                      </div>
                    </div>
                    <div className="form-inp">
                      <input placeholder="Email Address" type="email" required />
                    </div>
                    <div className="form-inp">
                      <input placeholder="Password" type="password" required />
                    </div>
                    <div className="form-inp">
                      <input placeholder="Confirm Password" type="password" required />
                    </div>
                  </div>

                  {/* Social Media Profiles */}
                  <div className="space-y-4">
                    <div className="section-title">Social Media Profiles</div>
                    <div className="form-inp">
                      <input placeholder="Instagram Handle" type="text" />
                    </div>
                    <div className="form-inp">
                      <input placeholder="YouTube Channel" type="text" />
                    </div>
                    <div className="form-inp">
                      <input placeholder="TikTok Username" type="text" />
                    </div>
                    <div className="form-inp">
                      <input placeholder="Twitter Handle" type="text" />
                    </div>

                    {/* Professional Details */}
                    <div className="section-title">Professional Details</div>
                    <div className="form-inp">
                      <select defaultValue="">
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
                      <input placeholder="Years of Experience" type="number" />
                    </div>
                  </div>
                </div>
              </div>
              <div id="submit-button-cvr">
                <button id="submit-button" type="submit">Create Account</button>
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
`;

export default Signup; 