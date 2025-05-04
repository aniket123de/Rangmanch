import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeContext";
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import Icon from '../../assets/icon.png';
import { useAuth } from '../../contexts/authContext';
import AnimatedButton from '../common/AnimatedButton';
import { useBusinessAuth } from '../../pages/business/businessAuthContext'; 

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

const ThemeSwitchWrapper = styled.div`
  #theme-toggle-button {
    font-size: 12px;
    position: relative;
    display: inline-block;
    width: 5em;
    cursor: pointer;
  }

  #toggle {
    opacity: 0;
    width: 0;
    height: 0;
  }

  #container,
  #patches,
  #stars,
  #button,
  #sun,
  #moon,
  #cloud {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.25s;
  }

  #toggle:checked + svg #container {
    fill: #2b4360;
  }

  #toggle:checked + svg #button {
    transform: translate(26px, 2.333px);
  }

  #sun {
    opacity: 1;
  }

  #toggle:checked + svg #sun {
    opacity: 0;
  }

  #moon {
    opacity: 0;
  }

  #toggle:checked + svg #moon {
    opacity: 1;
  }

  #cloud {
    opacity: 1;
  }

  #toggle:checked + svg #cloud {
    opacity: 0;
  }

  #stars {
    opacity: 0;
  }

  #toggle:checked + svg #stars {
    opacity: 1;
  }
`;

const MobileMenuWrapper = styled.div`
  .mobile-menu {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: ${props => props.theme === 'dark' ? 'rgba(22, 22, 22, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 20px;
    margin: 0 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transform-origin: top;
    z-index: 40;
  }

  .menu-item {
    padding: 12px 16px;
    margin: 8px 0;
    border-radius: 12px;
    transition: all 0.3s ease;
    color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
    
    &:hover {
      background: ${props => props.theme === 'dark' ? 'rgba(157, 78, 221, 0.1)' : 'rgba(157, 78, 221, 0.1)'};
      color: #9d4edd;
    }
  }

  .mobile-login-btn {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    padding: 12px;
    border-radius: 12px;
    background: linear-gradient(45deg, #9d4edd, #c77dff);
    color: white;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(45deg, #ff9e00, #ddff00);
      transform: translateY(-2px);
    }
  }
`;

const NavLinks = [
  {
    id: 1,
    title: "About",
    link: "/about",
  },
  {
    id: 2,
    title: "Services",
    link: "/#services",
  },
  {
    id: 3,
    title: "Features",
    link: "/#banner",
  },
  {
    id: 4,
    title: "Contact",
    link: "/#newsletter",
  },
];

const NavLink = ({ href, children }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      const elementId = href.substring(2);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="relative text-lg font-semibold dark:text-dark-text group transition-colors duration-300"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-rose-400 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
    </a>
  );
};

const Navbar = () => {
  const { isDark } = useContext(ThemeContext);
  const { userLoggedIn, currentUser } = useAuth();
  const { currentUser: businessUser } = useBusinessAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on an auth page
  const isAuthPage = ['/login','/faq','/tnc', '/PP','/help','/signup', '/forgot-password'].includes(location.pathname);

  const getFirstName = () => {
    return currentUser?.displayName?.split(' ')[0] || 'User';
  };

  const getProfilePicture = () => {
    return currentUser?.photoURL || 'https://via.placeholder.com/150';
  };

  const isCleanNavbar = ['/login','/faq','/tnc', '/PP', '/about','/help', '/content-suggestion'].includes(location.pathname);

  const filteredNavLinks = isCleanNavbar ? [] : NavLinks;

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
              className="w-10 h-10 md:w-12 md:h-12 object-contain border border-gray-300 dark:border-gray-700 rounded-full"
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
          {isCleanNavbar ? null : (
            filteredNavLinks.map((link) => (
              <NavLink key={link.id} href={link.link}>
                {link.title}
              </NavLink>
            ))
          )}
        </div>

        {/* Right section - Login/Signup and Profile */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-4">
            {/* For Business Button - Only show if no user is logged in (business or regular) */}
            {!userLoggedIn && !businessUser && !isAuthPage && (
              <>
                <AnimatedButton 
                  onClick={() => navigate('/for-business')}
                  variant="outline"
                  size="sm"
                  className="px-4 py-1.5"
                >
                  For Business
                </AnimatedButton>

                {/* Divider */}
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              </>
            )}

            {/* Conditional rendering of Login/Profile */}
            {!isAuthPage && (
              !userLoggedIn ? (
                <AnimatedButton 
                  onClick={() => navigate('/login')}
                  variant="filled"
                  size="sm"
                  className="px-4 py-1.5"
                >
                  Login / Sign Up
                </AnimatedButton>
              ) : (
                <div className="relative flex items-center gap-3">
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                    Hey, {getFirstName()}
                  </span>
                  <button
                    onClick={() => setIsProfileOpen(true)}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-yellow-600 transition-colors duration-200"
                  >
                    <img
                      src={getProfilePicture()}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg
              className="w-5 h-5"
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

          {/* Mobile Profile Button */}
          {userLoggedIn && (
            <button
              onClick={() => setIsProfileOpen(true)}
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <img
                src={getProfilePicture()}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-purple-500"
              />
            </button>
          )}
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <MobileMenuWrapper theme={isDark ? 'dark' : 'light'}>
  {isMenuOpen && (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.2 }}
      className="mobile-menu"
    >
      <div className="flex flex-col px-4 py-4 space-y-4">
        {/* Navigation Links */}
        {NavLinks.filter(link => link.title !== 'Home').map((link) => (
          <NavLink
            key={link.id}
            href={link.link}
            onClick={() => setIsMenuOpen(false)}
            className="py-3 px-3 text-base font-medium rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {link.title}
          </NavLink>
        ))}
        
        {/* For Business Button */}
        {!userLoggedIn && !businessUser && (
          <AnimatedButton
            onClick={() => {
              navigate('/for-business');
              setIsMenuOpen(false);
            }}
            variant="text"
            size="sm"
            className="justify-start py-3 px-3 text-base font-medium rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            For Business
          </AnimatedButton>
        )}
        
        {/* Login/Signup Button */}
        {!isAuthPage && !userLoggedIn && (
          <AnimatedButton
            onClick={() => {
              navigate('/login');
              setIsMenuOpen(false);
            }}
            variant="filled"
            size="sm"
            className="w-full py-3 text-base font-medium rounded-lg mt-2"
          >
            Login / Sign Up
          </AnimatedButton>
        )}
        
        {/* User Profile Section */}
        {userLoggedIn && (
          <div className="flex items-center gap-4 mt-6 px-3 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <img
              src={getProfilePicture()}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover"
            />
            <div>
              <span className="text-gray-700 dark:text-gray-300 font-medium text-base block">
                Hey, {getFirstName()}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Welcome back!
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )}
</MobileMenuWrapper>

      {/* Profile Sidebar */}
      <ProfileSidebar 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </div>
  );
};

export default Navbar;
