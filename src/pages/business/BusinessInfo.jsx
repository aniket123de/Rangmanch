import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { createOrUpdateBrandProfile, getBrandProfile } from '../../firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { FaCog, FaPlus, FaUpload } from 'react-icons/fa';

const BusinessInfo = () => {
  const { isDark } = useContext(ThemeContext);
  const user = getAuth().currentUser;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    businessSize: '',
    yearsInBusiness: '',
    website: '',
    linkedin: '',
    instagram: '',
    twitter: '',
    logoUrl: '',
    brandImagesUrl: '',
    brandGuidelinesUrl: ''
  });

  useEffect(() => {
    const fetchBrandProfile = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const data = await getBrandProfile(user.uid);
        setFormData({
          name: data.name || '',
          industry: data.industry || '',
          location: data.location || '',
          businessSize: data.businessSize || '',
          yearsInBusiness: data.yearsInBusiness || '',
          website: data.website || '',
          linkedin: data.linkedin || '',
          instagram: data.instagram || '',
          twitter: data.twitter || '',
          logoUrl: data.logoUrl || '',
          brandImagesUrl: data.brandImagesUrl || '',
          brandGuidelinesUrl: data.brandGuidelinesUrl || ''
        });
      } catch (error) {
        // If not found, keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchBrandProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to update your business profile.');
      return;
    }
    setLoading(true);
    try {
      await createOrUpdateBrandProfile(user.uid, formData);
      alert('Business profile updated successfully!');
    } catch (error) {
      alert(error.message || 'Failed to update business profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(getAuth());
    window.location.href = '/business/login';
  };

  if (!user) {
    return <div className="text-center text-gray-600 dark:text-gray-400 p-8">Please log in to update your business profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Business Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your business profile and information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Business Profile */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 mb-8 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Business Profile</h2>
                <p className="text-gray-600 dark:text-gray-400">Manage your business information visible to creators</p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-[#9d4edd] to-[#c77dff] text-white rounded-lg hover:from-[#8b3ad3] hover:to-[#b96ef7] transition-all duration-200 flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaCog className={`text-sm ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </div>
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Business Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="Enter your business name"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Industry *</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="Enter your industry"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="Enter your location"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Business Size</label>
                  <input
                    type="text"
                    name="businessSize"
                    value={formData.businessSize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="e.g., 1-10 employees"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Years in Business</label>
                  <input
                    type="text"
                    name="yearsInBusiness"
                    value={formData.yearsInBusiness}
                    onChange={handleInputChange}
                    className="w-full md:w-1/2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="e.g., 5 years"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Online Presence */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Online Presence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="https://www.example.com"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="https://linkedin.com/company/..."
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="@yourbusiness"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Twitter</label>
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="@yourbusiness"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default BusinessInfo;