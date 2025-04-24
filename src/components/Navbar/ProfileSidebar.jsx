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

  const menuItems = [
    { icon: <FaUser />, label: 'Profile', link: '/profile' },
    { icon: <FaBell />, label: 'Notifications', link: '/notifications' },
    { icon: <FaBookmark />, label: 'Saved Posts', link: '/saved' },
    { icon: <FaHistory />, label: 'History', link: '/history' },
    { icon: <FaCog />, label: 'Settings', link: '/settings' },
    { icon: <FaQuestionCircle />, label: 'Help & Support', link: '/help' },
  ];

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
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className={`fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-50 overflow-y-auto`}
          >
            {/* Profile Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <img
                  src={currentUser?.photoURL || "https://i.pravatar.cc/150?img=1"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-2 border-purple-500"
                />
                <div>
                  <h2 className="text-xl font-bold dark:text-white">
                    {getFirstName()}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm break-all">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="flex items-center space-x-3 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className="text-lg text-purple-500">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-6 py-3 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <span className="text-lg"><FaSignOutAlt /></span>
                <span>Logout</span>
              </button>
            </div>

            {/* Theme Toggle */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg text-purple-500">
                    {isDark ? <FaSun /> : <FaMoon />}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </div>
                <Switch isChecked={isDark} onChange={toggleTheme} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileSidebar; 