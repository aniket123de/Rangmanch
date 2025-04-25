import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';
import Icon from '../../assets/icon.png';
import { useBusinessAuth } from '../../contexts/businessAuthContext';

const StyledWrapper = styled.div`
  /* === removing default button style ===*/
  .button {
    margin: 0;
    height: auto;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  /* button styling */
  .button {
    --border-right: 6px;
    --text-stroke-color: ${props => props.theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'};
    --animation-color:rgb(177, 61, 255);
    --fs-size: 2em;
    letter-spacing: 3px;
    text-decoration: none;
    font-size: var(--fs-size);
    font-family: "Arial";
    position: relative;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 1px var(--text-stroke-color);
  }
  /* this is the text, when you hover on button */
  .hover-text {
    position: absolute;
    box-sizing: border-box;
    content: attr(data-text);
    color: var(--animation-color);
    width: 0%;
    inset: 0;
    border-right: var(--border-right) solid var(--animation-color);
    overflow: hidden;
    transition: 0.5s;
    -webkit-text-stroke: 1px var(--animation-color);
  }
  /* hover */
  .button:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 23px var(--animation-color))
  }

  @media (max-width: 768px) {
    .button {
      --fs-size: 1.5em;
      letter-spacing: 2px;
    }
  }
`;

const NavLink = ({ href, children }) => {
  const handleClick = (e) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const elementId = href.substring(2);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="relative text-lg font-semibold dark:text-white group transition-colors duration-300"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-rose-400 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
    </a>
  );
};

const BusinessNavbar = () => {
  const { isDark } = useContext(ThemeContext);
  const { currentUser, logout } = useBusinessAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on a business auth page
  const isBusinessAuthPage = ['/business/login', '/business/signup', '/business/forgot-password'].includes(location.pathname);
  const showLoginButton = !isBusinessAuthPage && !currentUser;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/business/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-6">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white/60 backdrop-blur-xl rounded-full py-4 px-4 md:px-8 flex justify-between items-center dark:bg-dark-bg/40 shadow-lg"
      >
        {/* Logo section */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={Icon} 
              alt="Rangmanch" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <StyledWrapper theme={isDark ? 'dark' : 'light'}>
              <button className="button" data-text="RANGMANCH">
                <span className="actual-text">&nbsp;RANGMANCH&nbsp;</span>
                <span aria-hidden="true" className="hover-text">&nbsp;RANGMANCH&nbsp;</span>
              </button>
            </StyledWrapper>
          </Link>
        </div>

        {/* Link section - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/for-business">For Business</NavLink>
        </div>

        {/* Right section - Login/Logout */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-4">
            {showLoginButton ? (
              <Link 
                to="/business/login" 
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-rose-400 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                Business Login
              </Link>
            ) : currentUser && (
              <button 
                onClick={handleLogout}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-rose-400 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-24 left-4 right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4"
        >
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/for-business"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              For Business
            </Link>
            {showLoginButton ? (
              <Link
                to="/business/login"
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Business Login
              </Link>
            ) : currentUser && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BusinessNavbar; 