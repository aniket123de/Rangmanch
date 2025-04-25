import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useAuth } from '../../contexts/authContext';
import BusinessNavbar from '../../components/Navbar/BusinessNavbar';

const BusinessDashboard = () => {
  const { isDark } = useContext(ThemeContext);
  const { userLoggedIn } = useAuth();

  // Protect the route - redirect to login if not authenticated
  if (!userLoggedIn) {
    return <Navigate to="/business/login" replace={true} />;
  }

  return (
    <>
      <BusinessNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-300 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Business Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your business profile and activities</p>
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

                {/* Recent Activity Card */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <p>No recent activity</p>
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