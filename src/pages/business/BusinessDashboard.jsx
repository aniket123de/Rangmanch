import React, { useContext, useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useBusinessAuth } from '../../contexts/businessAuthContext';
import BusinessNavbar from '../../components/Navbar/BusinessNavbar';
import { 
  FaChartBar, 
  FaUsers, 
  FaBullhorn, 
  FaRegEnvelope, 
  FaCog, 
  FaSignOutAlt,
  FaBell,
  FaFileInvoiceDollar,
  FaRegCalendarAlt,
  FaCheckCircle,
  FaRegClock,
  FaRegCreditCard,
  FaLock,
  FaPlus,
  FaSearch
} from 'react-icons/fa';

const BusinessDashboard = () => {
  const { isDark } = useContext(ThemeContext);
  const { currentUser, businessData, logout } = useBusinessAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

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

  const pricingPlans = [
    {
      name: 'Starter',
      price: '₹9,999',
      billing: 'monthly',
      description: 'Perfect for small businesses entering the creator space',
      features: [
        'Access to 100+ creators',
        '1 campaign per month',
        'Basic analytics dashboard',
        'Email support',
        'Content usage rights (30 days)'
      ],
      cta: 'Upgrade Now',
      popular: false,
      color: 'border-[#9d4edd]'
    },
    {
      name: 'Growth',
      price: '₹24,999',
      billing: 'monthly',
      description: 'Ideal for growing brands looking to scale creator marketing',
      features: [
        'Access to 500+ creators',
        '3 campaigns per month',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'Content usage rights (90 days)',
        'Campaign strategy consultation'
      ],
      cta: 'Upgrade Now',
      popular: true,
      color: 'border-[#c77dff]'
    },
    {
      name: 'Enterprise',
      price: '₹49,999',
      billing: 'monthly',
      description: 'Comprehensive solution for established brands',
      features: [
        'Unlimited access to creators',
        'Unlimited campaigns',
        'White-label reporting dashboard',
        'Priority support 24/7',
        'Perpetual content usage rights',
        'Custom contract negotiation',
        'Exclusive creator partnerships'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'border-[#ff9e00]'
    }
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

  const renderOverviewTab = () => (
    <>
      {/* Key Metrics */}
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
            <button className="text-sm text-white bg-gradient-to-r from-[#9d4edd] to-[#c77dff] px-3 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Full Calendar
            </button>
          </div>
          <div className="space-y-4">
            {upcomingSchedule.map((item, index) => (
              <div key={index} className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{item.event}</p>
                  <div className="flex justify-between mt-1">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.date}</p>
                    <p className="text-[#9d4edd] dark:text-[#c77dff] text-sm">{item.creator}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderBusinessInfoTab = () => (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 mb-8 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Business Profile</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage your business information visible to creators</p>
          </div>
          <button className="mt-4 md:mt-0 px-4 py-2 bg-gradient-to-r from-[#9d4edd] to-[#c77dff] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
            <FaCog className="text-sm" /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Business Name</p>
            <p className="text-gray-900 dark:text-white font-medium">{businessData?.businessName || 'Not specified'}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Industry</p>
            <p className="text-gray-900 dark:text-white font-medium">{businessData?.industry || 'Not specified'}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Location</p>
            <p className="text-gray-900 dark:text-white font-medium">{businessData?.location || 'Not specified'}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Business Size</p>
            <p className="text-gray-900 dark:text-white font-medium">{businessData?.businessSize || 'Not specified'}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Years in Business</p>
            <p className="text-gray-900 dark:text-white font-medium">{businessData?.yearsInBusiness || 'Not specified'}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Email Address</p>
            <p className="text-gray-900 dark:text-white font-medium">{currentUser?.email || 'Not specified'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 mb-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Social Media & Web Presence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
            <p className="text-gray-900 dark:text-white font-medium mb-2">Website</p>
            {businessData?.website ? (
              <a href={businessData.website} target="_blank" rel="noopener noreferrer" className="text-[#9d4edd] hover:text-[#c77dff] font-medium flex items-center gap-2">
                {businessData.website} <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </a>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-400">Not specified</p>
                <button className="text-[#9d4edd] hover:text-[#c77dff] text-sm font-medium flex items-center gap-1">
                  <FaPlus size={10} /> Add
                </button>
              </div>
            )}
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
            <p className="text-gray-900 dark:text-white font-medium mb-2">LinkedIn</p>
            {businessData?.linkedin ? (
              <a href={businessData.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#9d4edd] hover:text-[#c77dff] font-medium flex items-center gap-2">
                {businessData.linkedin} <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </a>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-400">Not specified</p>
                <button className="text-[#9d4edd] hover:text-[#c77dff] text-sm font-medium flex items-center gap-1">
                  <FaPlus size={10} /> Add
                </button>
              </div>
            )}
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
            <p className="text-gray-900 dark:text-white font-medium mb-2">Instagram</p>
            {businessData?.instagram ? (
              <a href={`https://instagram.com/${businessData.instagram}`} target="_blank" rel="noopener noreferrer" className="text-[#9d4edd] hover:text-[#c77dff] font-medium flex items-center gap-2">
                @{businessData.instagram} <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </a>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-400">Not specified</p>
                <button className="text-[#9d4edd] hover:text-[#c77dff] text-sm font-medium flex items-center gap-1">
                  <FaPlus size={10} /> Add
                </button>
              </div>
            )}
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
            <p className="text-gray-900 dark:text-white font-medium mb-2">Twitter</p>
            {businessData?.twitter ? (
              <a href={`https://twitter.com/${businessData.twitter}`} target="_blank" rel="noopener noreferrer" className="text-[#9d4edd] hover:text-[#c77dff] font-medium flex items-center gap-2">
                @{businessData.twitter} <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </a>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-400">Not specified</p>
                <button className="text-[#9d4edd] hover:text-[#c77dff] text-sm font-medium flex items-center gap-1">
                  <FaPlus size={10} /> Add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Brand Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-[#9d4edd]/10 to-[#c77dff]/10 dark:from-[#9d4edd]/20 dark:to-[#c77dff]/20 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-[#9d4edd] dark:text-[#c77dff] mb-4 shadow-sm">
              <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Upload Logo</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Add your brand logo</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-[#ff9e00]/10 to-[#ddff00]/10 dark:from-[#ff9e00]/20 dark:to-[#ddff00]/20 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-[#ff9e00] dark:text-[#ddff00] mb-4 shadow-sm">
              <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Brand Images</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your brand assets</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-[#9d4edd]/10 to-[#ff9e00]/10 dark:from-[#9d4edd]/20 dark:to-[#ff9e00]/20 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-[#9d4edd] dark:text-[#ff9e00] mb-4 shadow-sm">
              <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Brand Guidelines</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Upload brand documentation</p>
          </div>
        </div>
      </div>
    </>
  );

  const renderPricingTab = () => (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Choose Your Plan</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Select the perfect plan for your brand's creator collaboration needs
        </p>
        
        <div className="flex justify-center mt-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg inline-flex">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-md shadow-sm text-gray-900 dark:text-white font-medium">
              Monthly
            </button>
            <button className="px-4 py-2 text-gray-600 dark:text-gray-300 font-medium">
              Annual (Save 20%)
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <div 
            key={index} 
            className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-xl ${
              plan.popular ? 'ring-2 ring-[#c77dff] transform scale-105 z-10' : 'hover:-translate-y-2'
            }`}
          >
            {plan.popular && (
              <div className="bg-gradient-to-r from-[#9d4edd] to-[#c77dff] text-white text-center py-2 text-sm font-medium">
                Most Popular
              </div>
            )}
            <div className="p-8">
              <div className={`w-12 h-12 rounded-xl ${plan.color} bg-opacity-20 dark:bg-opacity-10 flex items-center justify-center mb-4`}>
                {index === 0 ? (
                  <FaRegClock className="text-[#9d4edd] dark:text-[#c77dff]" />
                ) : index === 1 ? (
                  <FaRegCreditCard className="text-[#c77dff] dark:text-[#9d4edd]" />
                ) : (
                  <FaLock className="text-[#ff9e00] dark:text-[#ddff00]" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{plan.price}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{plan.billing}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <FaCheckCircle className={`mt-1 flex-shrink-0 ${
                      index === 0 ? 'text-[#9d4edd]' : 
                      index === 1 ? 'text-[#c77dff]' : 
                      'text-[#ff9e00]'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                plan.popular 
                  ? 'bg-gradient-to-r from-[#9d4edd] to-[#c77dff] text-white hover:shadow-lg hover:shadow-[#9d4edd]/30'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}>
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <BusinessNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 mt-24">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">Business Dashboard</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-transform transform ${activeTab === 'overview' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105' : 'bg-gray-200 text-gray-800 hover:scale-105'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('businessInfo')} 
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-transform transform ${activeTab === 'businessInfo' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105' : 'bg-gray-200 text-gray-800 hover:scale-105'}`}
          >
            Business Info
          </button>
          <button 
            onClick={() => setActiveTab('pricing')} 
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-transform transform ${activeTab === 'pricing' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105' : 'bg-gray-200 text-gray-800 hover:scale-105'}`}
          >
            Pricing
          </button>
        </div>

        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'businessInfo' && renderBusinessInfoTab()}
        {activeTab === 'pricing' && renderPricingTab()}
      </div>
    </div>
  );
};

export default BusinessDashboard;