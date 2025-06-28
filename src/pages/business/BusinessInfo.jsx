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
    <>
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 mb-4 float-right"
      >
        Logout
      </button>
      <form onSubmit={handleSubmit}>
        {/* Business Profile */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Business Profile</h2>
              <p className="text-gray-600 dark:text-gray-400">Manage your business information visible to creators</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 md:mt-0 px-4 py-2 bg-gradient-to-r from-[#9d4edd] to-[#c77dff] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <FaCog className="text-sm" /> {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Business Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your business name"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your industry"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your location"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Business Size</label>
              <input
                type="text"
                name="businessSize"
                value={formData.businessSize}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your business size"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Years in Business</label>
              <input
                type="text"
                name="yearsInBusiness"
                value={formData.yearsInBusiness}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter years in business"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your website"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your LinkedIn profile"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Instagram</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your Instagram handle"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Twitter</label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your Twitter handle"
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BusinessInfo;