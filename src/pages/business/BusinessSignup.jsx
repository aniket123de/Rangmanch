import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import BusinessNavbar from '../../components/Navbar/BusinessNavbar';
import { signUp } from '../../firebase/auth';
import { createOrUpdateBrandProfile } from '../../firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

const BusinessSignup = () => {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    location: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    linkedin: '',
    instagram: '',
    twitter: '',
    businessSize: '',
    yearsInBusiness: ''
  });

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const user = getAuth().currentUser;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setIsSigningUp(true);
    try {
      // Sign up with Firebase Auth
      const { user } = await signUp(formData.email, formData.password, formData.businessName);
      // Create brand profile in Firestore
      await createOrUpdateBrandProfile(user.uid, {
        name: formData.businessName,
        industry: formData.industry,
        location: formData.location,
        website: formData.website,
        linkedin: formData.linkedin,
        instagram: formData.instagram,
        twitter: formData.twitter,
        businessSize: formData.businessSize,
        yearsInBusiness: formData.yearsInBusiness,
        email: formData.email
      });
      setSuccessMessage('Account created! You can now log in.');
      setTimeout(() => {
        navigate('/business/login', { state: { signupSuccess: true } });
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during signup. Please try again.');
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleLogout = async () => {
    await signOut(getAuth());
    window.location.href = '/business/login';
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <p className="mb-4">You are already logged in as {user.email}.</p>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <BusinessNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-300 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Business Sign Up</h1>
                <p className="text-gray-600 dark:text-gray-400">Create your business account</p>
              </div>

              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                  <span className="block sm:inline">{successMessage}</span>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your business name"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your industry"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your location"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Website</label>
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your website"
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">LinkedIn</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your LinkedIn profile"
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Instagram</label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your Instagram handle"
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Twitter</label>
                    <input
                      type="text"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your Twitter handle"
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Business Size</label>
                    <input
                      type="text"
                      name="businessSize"
                      value={formData.businessSize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your business size"
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Years in Business</label>
                    <select
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    >
                      <option value="">Select years in business</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your email"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your password"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Role</label>
                    <input
                      type="hidden"
                      value="brand"
                      disabled
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none dark:bg-gray-700 dark:text-white"
                      style={{ 
                        backgroundColor: '#f5f5f5',
                        cursor: 'not-allowed',
                        opacity: 0.7
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Confirm your password"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSigningUp || cooldown > 0}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50"
                >
                  {isSigningUp ? 'Creating Account...' : cooldown > 0 ? `Retry in ${cooldown}s` : 'Create Account'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessSignup;