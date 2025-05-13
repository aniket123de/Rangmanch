import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../contexts/authContext';
import { FaUser, FaBell, FaPalette, FaLock, FaGlobe, FaSave } from 'react-icons/fa';
import ToggleSwitch from '../components/common/ToggleSwitch';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  background: ${({ theme }) => theme === 'dark' 
    ? 'linear-gradient(155deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(155deg, #ffffff 0%, #f8fafc 100%)'};
  min-height: 100vh;
  padding: 6rem 0.5rem 2rem;

  @media (min-width: 768px) {
    padding: 8rem 1rem 4rem;
  }
`;

const GradientHeader = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
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
  background: ${({ theme }) => theme === 'dark' 
    ? 'rgba(23, 25, 35, 0.9)'
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'};
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const StyledToggleSwitch = styled(ToggleSwitch)`
  .toggle-track {
    background: ${({ isChecked }) => isChecked ? 'linear-gradient(45deg, #8B5CF6,rgb(217, 241, 99))' : '#374151'};
    &:hover {
      background: ${({ isChecked }) => isChecked ? 'linear-gradient(45deg, #7C3AED, rgb(217, 241, 99)' : '#3F4A5C'};
    }
  }
`;

const Settings = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

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
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
    { id: 'privacy', label: 'Privacy', icon: <FaLock /> },
    { id: 'preferences', label: 'Preferences', icon: <FaGlobe /> },
  ];

  const renderProfileSettings = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col items-center space-y-4 mb-6 md:mb-8">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="relative group"
        >
          <img
            src={currentUser?.photoURL || "https://i.pravatar.cc/150?img=1"}
            alt="Profile"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-purple-500/30 p-1 shadow-xl group-hover:border-purple-500/60 transition-all"
          />
          <div className="absolute inset-0 bg-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
        <button className="px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
          <FaLock className="text-xs" />
          Change Photo
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={settings.profile.displayName}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, displayName: e.target.value }
            })}
            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl border border-gray-700 bg-gray-900/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={settings.profile.email}
            disabled
            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl border border-gray-700 bg-gray-800/50 text-gray-400 cursor-not-allowed"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            value={settings.profile.bio}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, bio: e.target.value }
            })}
            rows="4"
            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-xl border border-gray-700 bg-gray-900/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-gray-900/50 rounded-2xl p-4 md:p-6 border border-gray-800 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-200 flex items-center gap-2">
          <FaBell className="text-purple-400" />
          Email Notifications
        </h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-medium text-gray-300">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-400">
                  Receive notifications about {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                </p>
              </div>
              <StyledToggleSwitch
                id={`notification-${key}`}
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
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
              <FaPalette className="text-purple-400" />
              Dark Mode
            </h3>
            <p className="text-sm text-gray-400">
              Switch between light and dark theme
            </p>
          </div>
          <StyledToggleSwitch 
            id="dark-mode"
            isChecked={isDark} 
            onChange={toggleTheme} 
          />
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-200 flex items-center gap-2">
          <FaLock className="text-purple-400" />
          Profile Visibility
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-300">Public Profile</h4>
              <p className="text-sm text-gray-400">
                Anyone can view your profile
              </p>
            </div>
            <StyledToggleSwitch
              id="public-profile"
              isChecked={settings.privacy.profileVisibility === 'public'}
              onChange={(checked) => setSettings({
                ...settings,
                privacy: { ...settings.privacy, profileVisibility: checked ? 'public' : 'private' }
              })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-300">Show Email</h4>
              <p className="text-sm text-gray-400">
                Display your email on your profile
              </p>
            </div>
            <StyledToggleSwitch
              id="show-email"
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
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 backdrop-blur-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <FaGlobe className="text-purple-400" />
              Language
            </label>
            <select
              value={settings.preferences.language}
              onChange={(e) => setSettings({
                ...settings,
                preferences: { ...settings.preferences, language: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.2em]"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Timezone
            </label>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => setSettings({
                ...settings,
                preferences: { ...settings.preferences, timezone: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.2em]"
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
    <SettingsContainer theme={isDark ? 'dark' : 'light'}>
      <GradientHeader>Settings</GradientHeader>
      <SettingsContent theme={isDark ? 'dark' : 'light'}>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <span className="text-lg opacity-80">{tab.icon}</span>
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-gray-900/50 rounded-2xl shadow-sm p-4 md:p-6 border border-gray-800 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {tabs.find(tab => tab.id === activeTab)?.label} Settings
                </h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full md:w-auto flex items-center justify-center space-x-2 px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <FaSave className="text-xs" />
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