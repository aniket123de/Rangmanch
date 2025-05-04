import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useBusinessAuth } from './businessAuthContext';
import { supabase } from './supabaseClient';
import { FaCog, FaPlus, FaUpload } from 'react-icons/fa';

const BusinessInfo = () => {
  const { isDark } = useContext(ThemeContext);
  const { currentUser } = useBusinessAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    industry: '',
    location: '',
    business_size: '',
    years_in_business: '',
    website: '',
    linkedin: '',
    instagram: '',
    twitter: '',
    logo_url: '',
    brand_images_url: '',
    brand_guidelines_url: ''
  });

  // Log currentUser for debugging
  useEffect(() => {
    console.log('Current User:', currentUser);
  }, [currentUser]);

  // Fetch existing business profile data
  useEffect(() => {
    const fetchBusinessProfile = async () => {
      if (!currentUser || !currentUser.id) {
        console.log('No user logged in or user ID missing');
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('business_profiles')
          .select('*')
          .eq('user_id', currentUser.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
          throw error;
        }

        if (data) {
          setFormData({
            business_name: data.business_name || '',
            industry: data.industry || '',
            location: data.location || '',
            business_size: data.business_size || '',
            years_in_business: data.years_in_business || '',
            website: data.website || '',
            linkedin: data.linkedin || '',
            instagram: data.instagram || '',
            twitter: data.twitter || '',
            logo_url: data.logo_url || '',
            brand_images_url: data.brand_images_url || '',
            brand_guidelines_url: data.brand_guidelines_url || ''
          });
        }
      } catch (error) {
        console.error('Error fetching business profile:', error);
        alert('Failed to load business profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessProfile();
  }, [currentUser]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file uploads
  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!currentUser || !currentUser.id) {
      alert('Please log in to upload files.');
      return;
    }

    setLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${currentUser.id}/${field}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('brand-assets')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('brand-assets')
        .getPublicUrl(fileName);

      setFormData((prev) => ({ ...prev, [field]: urlData.publicUrl }));
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser.id) {
      alert('Please log in to update your business profile.');
      return;
    }

    setLoading(true);
    try {
      const updates = {
        user_id: currentUser.id,
        business_name: formData.business_name,
        industry: formData.industry,
        location: formData.location,
        business_size: formData.business_size,
        years_in_business: formData.years_in_business,
        website: formData.website,
        linkedin: formData.linkedin,
        instagram: formData.instagram,
        twitter: formData.twitter,
        logo_url: formData.logo_url,
        brand_images_url: formData.brand_images_url,
        brand_guidelines_url: formData.brand_guidelines_url,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('business_profiles')
        .upsert(updates, { onConflict: 'user_id' });

      if (error) {
        console.error('Supabase upsert error:', error);
        throw new Error(`Failed to update business profile: ${error.message}`);
      }

      alert('Business profile updated successfully!');
    } catch (error) {
      console.error('Error updating business profile:', error);
      alert(error.message || 'Failed to update business profile.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <div className="text-center text-gray-600 dark:text-gray-400 p-8">Please log in to update your business profile.</div>;
  }

  return (
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label className="text-gray-500 dark:text-gray-400 text-sm mb-1 block">Business Name</label>
            <input
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-gray-900 dark:text-white"
              placeholder="Enter business name"
            />
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label className="text-gray-500 dark:text-gray-400 text-sm mb-1 block">Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-gray-900 dark:text-white"
              placeholder="Enter industry"
            />
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label className="text-gray-500 dark:text-gray-400 text-sm mb-1 block">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-gray-900 dark:text-white"
              placeholder="Enter location"
            />
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label className="text-gray-500 dark:text-gray-400 text-sm mb-1 block">Business Size</label>
            <input
              type="text"
              name="business_size"
              value={formData.business_size}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-gray-900 dark:text-white"
              placeholder="Enter business size"
            />
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label className="text-gray-500 dark:text-gray-400 text-sm mb-1 block">Years in Business</label>
            <input
              type="text"
              name="years_in_business"
              value={formData.years_in_business}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-gray-900 dark:text-white"
              placeholder="Enter years in business"
            />
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label className="text-gray-500 dark:text-gray-400 text-sm mb-1 block">Email Address</label>
            <input
              type="email"
              value={currentUser?.email || 'Not specified'}
              disabled
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-gray-900 dark:text-white opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Social Media & Web Presence */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 mb-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Social Media & Web Presence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
            <label className="text-gray-900 dark:text-white font-medium mb-2 block">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-gray-900 dark:text-white"
              placeholder="https://yourwebsite.com"
            />
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
            <label className="text-gray-900 dark:text-white font-medium mb-2 block">LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-gray-900 dark:text-white"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
            <label className="text-gray-900 dark:text-white font-medium mb-2 block">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-gray-900 dark:text-white"
              placeholder="@yourusername"
            />
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
            <label className="text-gray-900 dark:text-white font-medium mb-2 block">Twitter</label>
            <input
              type="text"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-gray-900 dark:text-white"
              placeholder="@yourusername"
            />
          </div>
        </div>
      </div>

      {/* Brand Assets */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-gray-700">
  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Brand Assets</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="p-6 bg-gradient-to-br from-[#9d4edd]/10 to-[#c77dff]/10 dark:from-[#9d4edd]/20 dark:to-[#c77dff]/20 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all">
      <label htmlFor="logo-upload" className="cursor-pointer w-full flex flex-col items-center">
        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-[#9d4edd] dark:text-[#c77dff] mb-4 shadow-sm">
          {formData.logo_url ? (
            <img src={formData.logo_url} alt="Logo" className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <FaUpload className="w-8 h-8" />
            </div>
          )}
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">Upload Logo</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Add your brand logo</p>
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, 'logo_url')}
          className="hidden"
        />
      </label>
    </div>

    <div className="p-6 bg-gradient-to-br from-[#ff9e00]/10 to-[#ddff00]/10 dark:from-[#ff9e00]/20 dark:to-[#ddff00]/20 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all">
      <label htmlFor="brand-images-upload" className="cursor-pointer w-full flex flex-col items-center">
        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-[#ff9e00] dark:text-[#ddff00] mb-4 shadow-sm">
          {formData.brand_images_url ? (
            <img src={formData.brand_images_url} alt="Brand Images" className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <FaUpload className="w-8 h-8" />
            </div>
          )}
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">Brand Images</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your brand assets</p>
        <input
          id="brand-images-upload"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, 'brand_images_url')}
          className="hidden"
        />
      </label>
    </div>

    <div className="p-6 bg-gradient-to-br from-[#9d4edd]/10 to-[#ff9e00]/10 dark:from-[#9d4edd]/20 dark:to-[#ff9e00]/20 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all">
      <label htmlFor="brand-guidelines-upload" className="cursor-pointer w-full flex flex-col items-center">
        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-[#9d4edd] dark:text-[#ff9e00] mb-4 shadow-sm">
          {formData.brand_guidelines_url ? (
            <img src={formData.brand_guidelines_url} alt="Brand Guidelines" className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <FaUpload className="w-8 h-8" />
            </div>
          )}
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">Brand Guidelines</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Upload brand documentation</p>
        <input
          id="brand-guidelines-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFileUpload(e, 'brand_guidelines_url')}
          className="hidden"
        />
      </label>
    </div>
  </div>
      </div>
    </form>
  );
};

export default BusinessInfo;