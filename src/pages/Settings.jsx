import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../contexts/authContext';
import { FaUser, FaBell, FaPalette, FaLock, FaGlobe, FaSave } from 'react-icons/fa';
import HeartSwitch from '../components/common/HeartSwitch';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  background: #111420;
  min-height: 100vh;
  padding: 8rem 1rem 4rem;
`;

const GradientHeader = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #9d4edd, #c77dff, #ff9e00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: -1px;

  @media (min-width: 768px) {
    font-size: 4rem;
    margin-bottom: 3rem;
  }
`;

const SettingsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #1a1a2e;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

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
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src={currentUser?.photoURL || "https://i.pravatar.cc/150?img=1"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 p-1"
        />
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
          Change Photo
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={settings.profile.displayName}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, displayName: e.target.value }
            })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={settings.profile.email}
            disabled
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            value={settings.profile.bio}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, bio: e.target.value }
            })}
            rows="4"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications about {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                </p>
              </div>
              <HeartSwitch
                isChecked={value}
                onChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, [key]: checked }
                })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dark Mode</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Switch between light and dark theme
            </p>
          </div>
          <HeartSwitch isChecked={isDark} onChange={toggleTheme} />
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Public Profile</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Anyone can view your profile
              </p>
            </div>
            <HeartSwitch
              isChecked={settings.privacy.profileVisibility === 'public'}
              onChange={(checked) => setSettings({
                ...settings,
                privacy: { ...settings.privacy, profileVisibility: checked ? 'public' : 'private' }
              })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Show Email</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Display your email on your profile
              </p>
            </div>
            <HeartSwitch
              isChecked={settings.privacy.showEmail}
              onChange={(checked) => setSettings({
                ...settings,
                privacy: { ...settings.privacy, showEmail: checked }
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              value={settings.preferences.language}
              onChange={(e) => setSettings({
                ...settings,
                preferences: { ...settings.preferences, language: e.target.value }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Timezone
            </label>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => setSettings({
                ...settings,
                preferences: { ...settings.preferences, timezone: e.target.value }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

  return (
    <SettingsContainer>
      <GradientHeader>Settings</GradientHeader>
      <SettingsContent>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tabs.find(tab => tab.id === activeTab)?.label} Settings
                </h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </motion.button>
              </div>
              
              {renderContent()}
            </div>
          </div>
        </div>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default Settings; 