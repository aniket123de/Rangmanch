import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getBrandProfile } from '../../firebase/firestore';
import { FaChartBar, FaUsers, FaBullhorn, FaCheckCircle, FaFileInvoiceDollar, FaPlus, FaSearch } from 'react-icons/fa';
import BusinessCalendar from './BusinessCalendar';

const Overview = ({ setActiveTab }) => {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchBrand = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await getBrandProfile(user.uid);
        setBrand(data);
      } catch (e) {
        setBrand(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBrand();
  }, [user]);

  // Sample data for dashboard components
  const campaignStats = [
    { label: 'Active Campaigns', value: 3, icon: <FaBullhorn />, color: 'from-[#9d4edd] to-[#c77dff]' },
    { label: 'Creators Engaged', value: 47, icon: <FaUsers />, color: 'from-[#c77dff] to-[#9d4edd]' },
    { label: 'Audience Reach', value: '2.4M', icon: <FaChartBar />, color: 'from-[#ff9e00] to-[#ddff00]' },
    { label: 'Conversion Rate', value: '3.2%', icon: <FaCheckCircle />, color: 'from-[#ddff00] to-[#ff9e00]' }
  ];

  const recentCreators = [
    { name: 'Priya Sharma', niche: 'Fashion & Beauty', followers: '278K', status: 'Engaged', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Rahul Khanna', niche: 'Tech Reviews', followers: '156K', status: 'Pending', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Alisha Patel', niche: 'Lifestyle', followers: '492K', status: 'Engaged', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { name: 'Vikram Singh', niche: 'Gaming', followers: '327K', status: 'Available', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' }
  ];

  const upcomingSchedule = [
    { event: 'Campaign Kickoff Call', date: 'Today, 3:00 PM', creator: 'Multiple Creators', icon: <FaBullhorn className="text-[#9d4edd]" /> },
    { event: 'Content Review Session', date: 'Tomorrow, 11:00 AM', creator: 'Priya Sharma', icon: <FaFileInvoiceDollar className="text-[#c77dff]" /> },
    { event: 'Analytics Presentation', date: 'May 3, 2:30 PM', creator: 'Rangmanch Team', icon: <FaChartBar className="text-[#ff9e00]" /> }
  ];

  const notifications = [
    { message: 'New creator match found for your beauty campaign', time: '2 hours ago', read: false, icon: <FaUsers className="text-[#9d4edd]" /> },
    { message: 'Content from Rahul Khanna is ready for review', time: '1 day ago', read: true, icon: <FaFileInvoiceDollar className="text-[#c77dff]" /> },
    { message: 'Your campaign performance report is ready', time: '2 days ago', read: true, icon: <FaChartBar className="text-[#ff9e00]" /> }
  ];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Please log in to view your overview.</div>;
  }

  return (
    <div className="container mx-auto pt-32 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Brand Overview</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Name: {brand?.name || user.email}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Industry: {brand?.industry || 'N/A'}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Location: {brand?.location || 'N/A'}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Business Size: {brand?.businessSize || 'N/A'}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Years in Business: {brand?.yearsInBusiness || 'N/A'}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Website: {brand?.website || 'N/A'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {campaignStats.map((stat, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white/90">{stat.label}</h3>
              <div className="text-white/80 text-xl">
                {stat.icon}
              </div>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Engagement Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 lg:col-span-2 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Campaign Performance</h3>
            <select className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-3 py-1 text-sm border-none focus:ring-2 focus:ring-[#9d4edd]">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-[#9d4edd]/10 to-[#ff9e00]/10 dark:from-[#9d4edd]/20 dark:to-[#ff9e00]/20 rounded-lg">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="mb-2 text-4xl">📊</div>
              <p>Performance chart visualization would appear here</p>
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h3>
            <span className="text-sm text-[#9d4edd] dark:text-[#c77dff] font-medium cursor-pointer">View All</span>
          </div>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index} className={`p-3 ${notification.read ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-[#9d4edd]/10 dark:bg-[#9d4edd]/20 border-l-4 border-[#9d4edd]'} rounded-lg flex items-start gap-3`}>
                <div className="mt-1">
                  {notification.icon}
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-200 text-sm mb-1">{notification.message}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Creators */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Creator Network</h3>
            <div className="flex gap-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search creators..." 
                  className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9d4edd]"
                />
              </div>
              <button className="text-sm text-white bg-gradient-to-r from-[#9d4edd] to-[#c77dff] px-3 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1">
                <FaPlus size={12} /> Find Creators
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-gray-500 dark:text-gray-400 text-xs uppercase border-b border-gray-100 dark:border-gray-700">
                  <th className="px-3 py-3 text-left">Creator</th>
                  <th className="px-3 py-3 text-left">Niche</th>
                  <th className="px-3 py-3 text-left">Audience</th>
                  <th className="px-3 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentCreators.map((creator, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-3 py-3 text-gray-800 dark:text-gray-200 font-medium">
                      <div className="flex items-center gap-3">
                        <img src={creator.avatar} alt={creator.name} className="w-8 h-8 rounded-full object-cover" />
                        {creator.name}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-gray-600 dark:text-gray-400">{creator.niche}</td>
                    <td className="px-3 py-3 text-gray-600 dark:text-gray-400">{creator.followers}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        creator.status === 'Engaged' 
                          ? 'bg-[#9d4edd]/10 text-[#9d4edd] dark:bg-[#9d4edd]/20 dark:text-[#c77dff]' 
                          : creator.status === 'Pending' 
                          ? 'bg-[#ff9e00]/10 text-[#ff9e00] dark:bg-[#ff9e00]/20 dark:text-[#ff9e00]'
                          : 'bg-[#ddff00]/10 text-[#9d4edd] dark:bg-[#ddff00]/20 dark:text-[#c77dff]'
                      }`}>
                        {creator.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Schedule</h3>
            <button
              className="text-sm text-white bg-gradient-to-r from-[#9d4edd] to-[#c77dff] px-3 py-2 rounded-lg hover:opacity-90 transition-opacity"
              onClick={() => setActiveTab && setActiveTab('calendar')}
            >
              Full Calendar
            </button>
          </div>
          <div>
            <BusinessCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;