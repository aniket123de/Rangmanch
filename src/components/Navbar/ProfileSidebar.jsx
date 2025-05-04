import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { doSignOut } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';
import { 
  FaUser, 
  FaCog, 
  FaSignOutAlt, 
  FaBell, 
  FaBookmark,
  FaHistory,
  FaQuestionCircle,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import Switch from './Switch';

const ProfileSidebar = ({ isOpen, onClose }) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Function to get user's first name
  const getFirstName = () => {
    if (currentUser?.displayName) {
      // Split the full name and get the first name
      return currentUser.displayName.split(' ')[0];
    }
    return 'User';
  };

  const handleLogout = async () => {
    try {
      await doSignOut();
      onClose(); // Close the sidebar
      navigate('/'); // Navigate to home page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDashboardClick = async () => {
    try {
      // Get the current user's token
      const token = await currentUser.getIdToken();
      // Redirect to the new dashboard URL
      window.location.href = `https://rangmanchdash-seven.vercel.app?token=${token}`;
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  const menuItems = [
    {
      icon: <FaUser />,
      label: 'Dashboard',
      onClick: handleDashboardClick
    },
    { 
      icon: <FaBookmark />, 
      label: 'Saved Posts', 
      link: '/saved' 
    },
    { 
      icon: <FaCog />, 
      label: 'Settings', 
      link: '/settings' 
    },
    { 
      icon: <FaQuestionCircle />, 
      label: 'Help & Support', 
      link: '/help' 
    },
  ];

  // Animation variants
  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { x: '100%', opacity: 0, transition: { type: 'spring', damping: 30, stiffness: 300 } }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: i => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: i * 0.05,
        duration: 0.3
      } 
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          {/* Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto rounded-l-2xl"
          >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Profile Header */}
            <div className="p-8 border-b border-gray-200 dark:border-gray-800">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={currentUser?.photoURL || "https://i.pravatar.cc/150?img=1"}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-purple-500 p-1 ring-4 ring-purple-100 dark:ring-purple-900"
                  />
                  <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900"></div>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {getFirstName()}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm break-all mt-1">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-6 px-4">
              {menuItems.map((item, index) => {
                const MenuItem = () => (
                  <motion.div
                    custom={index}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-2"
                  >
                    {item.onClick ? (
                      <button
                        onClick={item.onClick}
                        className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 group transition-all duration-200"
                      >
                        <span className="text-lg text-purple-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{item.icon}</span>
                        <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{item.label}</span>
                      </button>
                    ) : (
                      <Link
                        to={item.link}
                        className="flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 group transition-all duration-200"
                      >
                        <span className="text-lg text-purple-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{item.icon}</span>
                        <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{item.label}</span>
                      </Link>
                    )}
                  </motion.div>
                );
                
                return <MenuItem key={index} />;
              })}
              
              {/* Divider */}
              <div className="my-4 border-t border-gray-200 dark:border-gray-800"></div>
              
              {/* Logout Button */}
              <motion.div
                custom={menuItems.length}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
              >
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 group transition-all duration-200"
                >
                  <span className="text-lg"><FaSignOutAlt /></span>
                  <span className="font-medium">Logout</span>
                </button>
              </motion.div>
            </div>

            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="px-6 py-4 mx-4 mt-2 mb-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-500">
                    {isDark ? <FaSun /> : <FaMoon />}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </div>
                <Switch isChecked={isDark} onChange={toggleTheme} />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileSidebar;
