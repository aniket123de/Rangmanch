import React, { useContext, useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useBusinessAuth } from './businessAuthContext';
import BusinessNavbar from '../../components/Navbar/BusinessNavbar';
import Overview from './Overview';
import BusinessInfo from './BusinessInfo';
import Pricing from './Pricing';
import BusinessCalendar from './BusinessCalendar';
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

        {activeTab === 'overview' && <Overview />}
        {activeTab === 'businessInfo' && <BusinessInfo />}
        {activeTab === 'pricing' && <Pricing />}
              
      </div>
    </div>
  );
};

export default BusinessDashboard;