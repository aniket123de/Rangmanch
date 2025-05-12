import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../contexts/authContext';
import { FaUser, FaBell, FaPalette, FaLock, FaGlobe, FaSave, FaCamera } from 'react-icons/fa';
import ToggleSwitch from '../components/common/ToggleSwitch';

const Settings = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Mock settings state
  const [settings, setSettings] = useState({
    profile: {
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
      bio: '',
      location: '',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      commentNotifications: true,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showLocation: true,
    },
    preferences: {
      language: 'en',
      timezone: 'UTC',
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
    { id: 'privacy', label: 'Privacy', icon: <FaLock /> },
    { id: 'preferences', label: 'Preferences', icon: <FaGlobe /> },
  ];

  const renderProfileSettings = () => (
    <div className="space-y-8">
      <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6">
        <div className="relative group">
          <img
            src={currentUser?.photoURL || "https://i.pravatar.cc/150?img=1"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-600 shadow-lg transition-all duration-300 group-hover:opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors">
              <FaCamera size={18} />
            </button>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex-1">
          <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">
            {settings.profile.displayName || 'User'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {settings.profile.email}
          </p>
          <div className="mt-3">
            <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-all shadow-md hover:shadow-lg">
              Change Photo
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={settings.profile.displayName}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, displayName: e.target.value }
            })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all"
            placeholder="Your name"
          />
        </div>
        
        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={settings.profile.email}
            disabled
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 cursor-not-allowed shadow-sm"
          />
        </div>

        <div className="md:col-span-2 transition-all duration-300 hover:translate-y-[-2px]">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            value={settings.profile.bio}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, bio: e.target.value }
            })}
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all"
            placeholder="Tell us about yourself..."
          />
        </div>
        
        <div className="transition-all duration-300 hover:translate-y-[-2px]">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={settings.profile.location}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, location: e.target.value }
            })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all"
            placeholder="Your location"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-6 text-purple-600 dark:text-purple-400">Email Notifications</h3>
        <div className="space-y-6">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications about {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                </p>
              </div>
              <ToggleSwitch
                isChecked={value}
                onChange={(checked) => {
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, [key]: checked }
                  });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400">Dark Mode</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Switch between light and dark theme
            </p>
          </div>
          <ToggleSwitch 
            isChecked={isDark} 
            onChange={toggleTheme} 
          />
        </div>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-all hover:shadow-md">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Light Mode</h4>
            <div className="h-24 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
              <div className="w-3/4 bg-gray-100 h-4 rounded"></div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-all hover:shadow-md">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Dark Mode</h4>
            <div className="h-24 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
              <div className="w-3/4 bg-gray-700 h-4 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-6 text-purple-600 dark:text-purple-400">Profile Visibility</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Public Profile</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Anyone can view your profile
              </p>
            </div>
            <ToggleSwitch
              isChecked={settings.privacy.profileVisibility === 'public'}
              onChange={(checked) => setSettings({
                ...settings,
                privacy: { ...settings.privacy, profileVisibility: checked ? 'public' : 'private' }
              })}
            />
          </div>
          
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Show Email</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Display your email on your profile
              </p>
            </div>
            <ToggleSwitch
              isChecked={settings.privacy.showEmail}
              onChange={(checked) => setSettings({
                ...settings,
                privacy: { ...settings.privacy, showEmail: checked }
              })}
            />
          </div>
          
          <div className="flex items-center justify-between pb-2">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Show Location</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Display your location on your profile
              </p>
            </div>
            <ToggleSwitch
              isChecked={settings.privacy.showLocation}
              onChange={(checked) => setSettings({
                ...settings,
                privacy: { ...settings.privacy, showLocation: checked }
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-6 text-purple-600 dark:text-purple-400">Your Preferences</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="transition-all duration-300 hover:translate-y-[-2px]">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={settings.preferences.language}
                onChange={(e) => setSettings({
                  ...settings,
                  preferences: { ...settings.preferences, language: e.target.value }
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div className="transition-all duration-300 hover:translate-y-[-2px]">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Timezone
              </label>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => setSettings({
                  ...settings,
                  preferences: { ...settings.preferences, timezone: e.target.value }
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="GMT">GMT</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'preferences':
        return renderPreferencesSettings();
      default:
        return null;
    }
  };

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Keep the original header as requested */}
        <h1 
          className="text-4xl md:text-5xl text-center font-bold mb-12 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent"
          style={{ 
            background: "linear-gradient(45deg, #9d4edd, #c77dff, #ff9e00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
            letterSpacing: "-1px"
          }}
        >
          Settings
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-64 bg-gray-50 dark:bg-gray-900 p-4">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 border-l border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-gray-700 pb-5">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <span className="mr-3 text-purple-600 dark:text-purple-400">
                      {tabs.find(tab => tab.id === activeTab)?.icon}
                    </span>
                    {tabs.find(tab => tab.id === activeTab)?.label} Settings
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    <FaSave />
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                  </motion.button>
                </div>
                
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={contentVariants}
                  key={activeTab}
                >
                  {renderContent()}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;