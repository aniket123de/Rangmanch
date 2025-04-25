import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useBusinessAuth } from '../../contexts/businessAuthContext';
import BusinessNavbar from '../../components/Navbar/BusinessNavbar';

const BusinessDashboard = () => {
  const { isDark } = useContext(ThemeContext);
  const { currentUser, businessData, logout } = useBusinessAuth();
  const navigate = useNavigate();

  // Protect the route - redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/business/login" replace={true} />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/business/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <>
      <BusinessNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-300 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Business Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome, {businessData?.businessName || 'Business User'}</p>
              </div>

              {/* Business Information */}
              <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Business Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Industry</p>
                    <p className="text-gray-900 dark:text-white font-medium">{businessData?.industry || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Location</p>
                    <p className="text-gray-900 dark:text-white font-medium">{businessData?.location || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Business Size</p>
                    <p className="text-gray-900 dark:text-white font-medium">{businessData?.businessSize || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Years in Business</p>
                    <p className="text-gray-900 dark:text-white font-medium">{businessData?.yearsInBusiness || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Analytics Card */}
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-xl text-white">
                  <h3 className="text-xl font-semibold mb-4">Analytics Overview</h3>
                  <div className="space-y-2">
                    <p>Total Views: 0</p>
                    <p>Total Leads: 0</p>
                    <p>Conversion Rate: 0%</p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Social Media</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    {businessData?.website && (
                      <p>Website: <a href={businessData.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-500">Visit Website</a></p>
                    )}
                    {businessData?.linkedin && (
                      <p>LinkedIn: <a href={businessData.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-500">View Profile</a></p>
                    )}
                    {businessData?.instagram && (
                      <p>Instagram: <a href={`https://instagram.com/${businessData.instagram}`} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-500">@{businessData.instagram}</a></p>
                    )}
                    {businessData?.twitter && (
                      <p>Twitter: <a href={`https://twitter.com/${businessData.twitter}`} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-500">@{businessData.twitter}</a></p>
                    )}
                    {!businessData?.website && !businessData?.linkedin && !businessData?.instagram && !businessData?.twitter && (
                      <p>No social media links added</p>
                    )}
                  </div>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Update Profile
                    </button>
                    <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      View Analytics
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessDashboard; 