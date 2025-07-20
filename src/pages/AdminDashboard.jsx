import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaBuilding, 
  FaCheck, 
  FaTimes, 
  FaEye, 
  FaSignOutAlt, 
  FaSearch,
  FaFilter,
  FaSort,
  FaBell,
  FaCog,
  FaChartBar,
  FaUserShield,
  FaEdit,
  FaTrash,
  FaPlus,
  FaDownload,
  FaSync
} from 'react-icons/fa';
import Logo from '../assets/icon.png';

// Dummy data for creators and brands
const dummyCreators = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    category: 'Gaming',
    followers: '250K',
    isVerified: false,
    bio: 'Gaming content creator with a passion for FPS games and streaming.',
    joinDate: '2024-01-15',
    platform: 'YouTube, Twitch',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 4.5,
    contentType: 'Gaming Videos',
    location: 'Mumbai, India',
    languages: ['English', 'Hindi'],
    engagementRate: '8.5%',
    averageViews: '45K'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    category: 'Lifestyle',
    followers: '180K',
    isVerified: true,
    bio: 'Lifestyle blogger focusing on wellness, travel, and mindfulness.',
    joinDate: '2023-11-20',
    platform: 'Instagram, TikTok',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    rating: 4.8,
    contentType: 'Lifestyle Content',
    location: 'Delhi, India',
    languages: ['English', 'Hindi'],
    engagementRate: '12.3%',
    averageViews: '32K'
  },
  {
    id: 3,
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    category: 'Tech',
    followers: '400K',
    isVerified: false,
    bio: 'Tech reviewer and entrepreneur sharing the latest in technology.',
    joinDate: '2024-02-10',
    platform: 'YouTube, Twitter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 4.7,
    contentType: 'Tech Reviews',
    location: 'Bangalore, India',
    languages: ['English'],
    engagementRate: '10.2%',
    averageViews: '78K'
  },
  {
    id: 4,
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    category: 'Fashion',
    followers: '320K',
    isVerified: true,
    bio: 'Fashion influencer and stylist sharing trendy outfits and style tips.',
    joinDate: '2023-08-05',
    platform: 'Instagram, YouTube',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 4.6,
    contentType: 'Fashion & Style',
    location: 'Kolkata, India',
    languages: ['English', 'Hindi', 'Bengali'],
    engagementRate: '15.8%',
    averageViews: '55K'
  },
  {
    id: 5,
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    category: 'Fitness',
    followers: '275K',
    isVerified: false,
    bio: 'Fitness coach and nutritionist helping people achieve their health goals.',
    joinDate: '2024-03-12',
    platform: 'Instagram, YouTube',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 4.4,
    contentType: 'Fitness & Health',
    location: 'Chennai, India',
    languages: ['English', 'Tamil'],
    engagementRate: '9.7%',
    averageViews: '41K'
  }
];

const dummyBrands = [
  {
    id: 1,
    name: 'TechGear Pro',
    email: 'contact@techgearpro.com',
    industry: 'Technology',
    budget: '$50K - $100K',
    isVerified: false,
    description: 'Premium technology accessories and gadgets for professionals.',
    establishedYear: '2020',
    website: 'www.techgearpro.com',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
    rating: 4.3,
    campaigns: 12,
    location: 'Mumbai, India',
    targetAudience: 'Tech Professionals',
    campaignTypes: ['Product Reviews', 'Unboxing'],
    averageROI: '320%'
  },
  {
    id: 2,
    name: 'EcoLife Solutions',
    email: 'hello@ecolifesolutions.com',
    industry: 'Sustainability',
    budget: '$25K - $50K',
    isVerified: true,
    description: 'Sustainable living products for environmentally conscious consumers.',
    establishedYear: '2019',
    website: 'www.ecolifesolutions.com',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop',
    rating: 4.7,
    campaigns: 8,
    location: 'Bangalore, India',
    targetAudience: 'Eco-conscious Millennials',
    campaignTypes: ['Lifestyle Integration', 'Educational Content'],
    averageROI: '285%'
  },
  {
    id: 3,
    name: 'FitnessPro',
    email: 'partnerships@fitnesspro.com',
    industry: 'Health & Fitness',
    budget: '$75K - $150K',
    isVerified: false,
    description: 'High-quality fitness equipment and nutrition supplements.',
    establishedYear: '2018',
    website: 'www.fitnesspro.com',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
    rating: 4.5,
    campaigns: 15,
    location: 'Delhi, India',
    targetAudience: 'Fitness Enthusiasts',
    campaignTypes: ['Workout Demos', 'Transformation Stories'],
    averageROI: '410%'
  },
  {
    id: 4,
    name: 'StyleHub Fashion',
    email: 'collabs@stylehub.com',
    industry: 'Fashion & Apparel',
    budget: '$30K - $75K',
    isVerified: true,
    description: 'Trendy and affordable fashion for the modern generation.',
    establishedYear: '2021',
    website: 'www.stylehub.com',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    rating: 4.6,
    campaigns: 20,
    location: 'Kolkata, India',
    targetAudience: 'Young Adults',
    campaignTypes: ['Fashion Shows', 'Style Tutorials'],
    averageROI: '350%'
  },
  {
    id: 5,
    name: 'FoodieDelight',
    email: 'marketing@foodiedelight.com',
    industry: 'Food & Beverage',
    budget: '$40K - $80K',
    isVerified: false,
    description: 'Artisanal food products and gourmet cooking ingredients.',
    establishedYear: '2022',
    website: 'www.foodiedelight.com',
    logo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop',
    rating: 4.4,
    campaigns: 10,
    location: 'Pune, India',
    targetAudience: 'Food Enthusiasts',
    campaignTypes: ['Recipe Videos', 'Taste Tests'],
    averageROI: '275%'
  }
];

const AdminDashboard = () => {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [creators, setCreators] = useState(dummyCreators);
  const [brands, setBrands] = useState(dummyBrands);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [activeTab, setActiveTab] = useState('creators');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, verified, unverified
  const [sortBy, setSortBy] = useState('name'); // name, followers, rating, joinDate
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  // Filter and sort functions
  const filteredCreators = creators
    .filter(creator => {
      const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           creator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           creator.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || 
                           (filterStatus === 'verified' && creator.isVerified) ||
                           (filterStatus === 'unverified' && !creator.isVerified);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'followers':
          return parseInt(b.followers.replace('K', '')) - parseInt(a.followers.replace('K', ''));
        case 'rating':
          return b.rating - a.rating;
        case 'joinDate':
          return new Date(b.joinDate) - new Date(a.joinDate);
        default:
          return 0;
      }
    });

  const filteredBrands = brands
    .filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.industry.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || 
                           (filterStatus === 'verified' && brand.isVerified) ||
                           (filterStatus === 'unverified' && !brand.isVerified);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'campaigns':
          return b.campaigns - a.campaigns;
        case 'rating':
          return b.rating - a.rating;
        case 'establishedYear':
          return b.establishedYear - a.establishedYear;
        default:
          return 0;
      }
    });

  const handleVerifyCreator = (creatorId) => {
    setCreators(prev => prev.map(creator => 
      creator.id === creatorId 
        ? { ...creator, isVerified: !creator.isVerified }
        : creator
    ));
    setSelectedCreator(prev => 
      prev && prev.id === creatorId 
        ? { ...prev, isVerified: !prev.isVerified }
        : prev
    );
  };

  const handleVerifyBrand = (brandId) => {
    setBrands(prev => prev.map(brand => 
      brand.id === brandId 
        ? { ...brand, isVerified: !brand.isVerified }
        : brand
    ));
    setSelectedBrand(prev => 
      prev && prev.id === brandId 
        ? { ...prev, isVerified: !prev.isVerified }
        : prev
    );
  };

  const handleDeleteCreator = (creatorId) => {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      setCreators(prev => prev.filter(creator => creator.id !== creatorId));
      if (selectedCreator && selectedCreator.id === creatorId) {
        setSelectedCreator(null);
      }
    }
  };

  const handleDeleteBrand = (brandId) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      setBrands(prev => prev.filter(brand => brand.id !== brandId));
      if (selectedBrand && selectedBrand.id === brandId) {
        setSelectedBrand(null);
      }
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setSortBy('name');
  };

  const exportData = () => {
    const data = activeTab === 'creators' ? creators : brands;
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${activeTab}_data.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
          <div className="p-6">
            <button
              onClick={onClose}
              className="float-right text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FaTimes size={20} />
            </button>
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Enhanced Professional Navigation Header */}
      <nav className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl border-b-2 ${isDark ? 'border-purple-600' : 'border-purple-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo and Brand Section */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img src={Logo} alt="Rangmanch" className="w-10 h-10" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                    <FaUserShield className="text-white w-2 h-2" />
                  </div>
                </div>
                <div>
                  <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <span className="running-gradient">Admin</span> Dashboard
                  </h1>
                </div>
              </div>
            </div>

            {/* Enhanced Navigation Actions */}
            <div className="flex items-center space-x-4">
              {/* Enhanced Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`relative p-3 rounded-xl ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-all duration-300 group`}
                >
                  <FaBell className={`${isDark ? 'text-gray-300' : 'text-gray-600'} w-5 h-5 group-hover:text-purple-500 transition-colors duration-300`} />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {creators.filter(c => !c.isVerified).length + brands.filter(b => !b.isVerified).length}
                  </span>
                </button>
                
                {showNotifications && (
                  <div className={`absolute right-0 mt-3 w-96 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} z-50 overflow-hidden`}>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
                          {creators.filter(c => !c.isVerified).length + brands.filter(b => !b.isVerified).length} pending
                        </span>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      <div className="p-4 space-y-3">
                        {creators.filter(c => !c.isVerified).slice(0, 3).map((creator) => (
                          <div key={`creator-${creator.id}`} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-200 cursor-pointer`}>
                            <div className="flex items-center space-x-3">
                              <img src={creator.avatar} alt={creator.name} className="w-8 h-8 rounded-full" />
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                  New creator verification request
                                </p>
                                <p className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'} font-semibold`}>
                                  {creator.name} ({creator.category})
                                </p>
                                <p className="text-xs text-purple-500">Just now</p>
                              </div>
                              <FaUser className="text-purple-500 w-4 h-4" />
                            </div>
                          </div>
                        ))}
                        {brands.filter(b => !b.isVerified).slice(0, 2).map((brand) => (
                          <div key={`brand-${brand.id}`} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-200 cursor-pointer`}>
                            <div className="flex items-center space-x-3">
                              <img src={brand.logo} alt={brand.name} className="w-8 h-8 rounded-lg" />
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                  Brand verification request
                                </p>
                                <p className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'} font-semibold`}>
                                  {brand.name} ({brand.industry})
                                </p>
                                <p className="text-xs text-purple-500">2 minutes ago</p>
                              </div>
                              <FaBuilding className="text-blue-500 w-4 h-4" />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="w-full text-center text-purple-500 hover:text-purple-600 font-medium text-sm transition-colors duration-200">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Admin Profile */}
              <div className={`flex items-center space-x-3 pl-4 border-l-2 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <FaUserShield className="text-white w-5 h-5" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <div className="hidden sm:block">
                  <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Super Admin</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Online</p>
                </div>
              </div>

              {/* Enhanced Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} w-4 h-4`} />
              <input
                type="text"
                placeholder="Search creators and brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 placeholder-gray-500'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Tab Navigation with Controls */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 space-y-4 sm:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-8">
              <button
                onClick={() => {
                  setActiveTab('creators');
                  setSelectedCreator(null);
                  setSelectedBrand(null);
                }}
                className={`py-3 px-2 border-b-2 font-medium text-lg flex items-center space-x-3 ${
                  activeTab === 'creators'
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <FaUser />
                <span>Creators ({filteredCreators.length})</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('brands');
                  setSelectedCreator(null);
                  setSelectedBrand(null);
                }}
                className={`py-3 px-2 border-b-2 font-medium text-lg flex items-center space-x-3 ${
                  activeTab === 'brands'
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <FaBuilding />
                <span>Brands ({filteredBrands.length})</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={resetFilters}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-300`}
              >
                <FaSync className="w-4 h-4" />
                <span className="text-sm">Reset</span>
              </button>
              <button
                onClick={exportData}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-300"
              >
                <FaDownload className="w-4 h-4" />
                <span className="text-sm">Export</span>
              </button>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} w-4 h-4`} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              />
            </div>

            {/* Filters and Sort */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <FaFilter className={`${isDark ? 'text-gray-400' : 'text-gray-500'} w-4 h-4`} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-3 py-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  <option value="all">All Status</option>
                  <option value="verified">Verified</option>
                  <option value="unverified">Unverified</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <FaSort className={`${isDark ? 'text-gray-400' : 'text-gray-500'} w-4 h-4`} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-3 py-2 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  <option value="name">Name</option>
                  {activeTab === 'creators' ? (
                    <>
                      <option value="followers">Followers</option>
                      <option value="rating">Rating</option>
                      <option value="joinDate">Join Date</option>
                    </>
                  ) : (
                    <>
                      <option value="campaigns">Campaigns</option>
                      <option value="rating">Rating</option>
                      <option value="establishedYear">Established</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced List Column */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {activeTab === 'creators' ? 'Creators' : 'Brands'}
                </h2>
                <span className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {activeTab === 'creators' ? filteredCreators.length : filteredBrands.length} items
                </span>
              </div>
            </div>
            
            <div className="max-h-[600px] overflow-y-auto">
              <div className="p-6 space-y-4">
                {activeTab === 'creators' ? (
                  filteredCreators.length > 0 ? (
                    filteredCreators.map(creator => (
                      <div
                        key={creator.id}
                        className={`p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedCreator?.id === creator.id
                            ? `border-purple-500 ${isDark ? 'bg-purple-900/20' : 'bg-purple-50'}`
                            : `${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`
                        }`}
                        onClick={() => setSelectedCreator(creator)}
                      >
                        <div className="flex items-center space-x-5">
                          <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {creator.name}
                              </h3>
                              <div className="flex items-center space-x-3">
                                {creator.isVerified ? (
                                  <FaCheck className="text-green-500 w-5 h-5" />
                                ) : (
                                  <FaTimes className="text-red-500 w-5 h-5" />
                                )}
                                <FaEye className="text-purple-500 w-5 h-5" />
                              </div>
                            </div>
                            <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                              {creator.category} • {creator.followers} followers
                            </p>
                            <div className="flex items-center space-x-4 mt-3">
                              <span className={`text-sm px-3 py-1 rounded-full ${
                                creator.isVerified 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                                {creator.isVerified ? 'Verified' : 'Unverified'}
                              </span>
                              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Rating: {creator.rating}/5
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <FaUser className="mx-auto w-12 h-12 mb-4 opacity-50" />
                      <p>No creators found matching your criteria</p>
                    </div>
                  )
                ) : (
                  filteredBrands.length > 0 ? (
                    filteredBrands.map(brand => (
                      <div
                        key={brand.id}
                        className={`p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedBrand?.id === brand.id
                            ? `border-purple-500 ${isDark ? 'bg-purple-900/20' : 'bg-purple-50'}`
                            : `${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`
                        }`}
                        onClick={() => setSelectedBrand(brand)}
                      >
                        <div className="flex items-center space-x-5">
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {brand.name}
                              </h3>
                              <div className="flex items-center space-x-3">
                                {brand.isVerified ? (
                                  <FaCheck className="text-green-500 w-5 h-5" />
                                ) : (
                                  <FaTimes className="text-red-500 w-5 h-5" />
                                )}
                                <FaEye className="text-purple-500 w-5 h-5" />
                              </div>
                            </div>
                            <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                              {brand.industry} • {brand.budget}
                            </p>
                            <div className="flex items-center space-x-4 mt-3">
                              <span className={`text-sm px-3 py-1 rounded-full ${
                                brand.isVerified 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                                {brand.isVerified ? 'Verified' : 'Unverified'}
                              </span>
                              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {brand.campaigns} campaigns
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <FaBuilding className="mx-auto w-12 h-12 mb-4 opacity-50" />
                      <p>No brands found matching your criteria</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Details Column */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {selectedCreator || selectedBrand ? 'Profile Details' : 'Select an Item'}
              </h2>
            </div>
            
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {selectedCreator && activeTab === 'creators' ? (
                <div className="space-y-6">
                  {/* Creator Header */}
                  <div className="text-center">
                    <img
                      src={selectedCreator.avatar}
                      alt={selectedCreator.name}
                      className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                    />
                    <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedCreator.name}
                    </h3>
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedCreator.email}
                    </p>
                    <div className="flex items-center justify-center space-x-3 mt-3">
                      <span className={`px-4 py-2 rounded-full text-base ${
                        selectedCreator.isVerified
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {selectedCreator.isVerified ? 'Verified' : 'Unverified'}
                      </span>
                      <span className="text-yellow-500">
                        {'★'.repeat(Math.floor(selectedCreator.rating))} {selectedCreator.rating}
                      </span>
                    </div>
                  </div>

                  {/* Creator Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Category
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedCreator.category}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Followers
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedCreator.followers}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Platform
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedCreator.platform}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Join Date
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedCreator.joinDate}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Location
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedCreator.location}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Engagement Rate
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedCreator.engagementRate}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                      Bio
                    </p>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'} leading-relaxed text-base`}>
                      {selectedCreator.bio}
                    </p>
                  </div>

                  {/* Languages */}
                  <div>
                    <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                      Languages
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {selectedCreator.languages.map((lang, index) => (
                        <span
                          key={index}
                          className={`px-4 py-2 rounded-full text-base ${isDark ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleVerifyCreator(selectedCreator.id)}
                      className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-300 ${
                        selectedCreator.isVerified
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      {selectedCreator.isVerified ? 'Revoke Verification' : 'Verify Creator'}
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center space-x-3 py-3 px-5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-300 text-base font-medium">
                        <FaEdit className="w-5 h-5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCreator(selectedCreator.id)}
                        className="flex items-center justify-center space-x-3 py-3 px-5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 text-base font-medium"
                      >
                        <FaTrash className="w-5 h-5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : selectedBrand && activeTab === 'brands' ? (
                <div className="space-y-6">
                  {/* Brand Header */}
                  <div className="text-center">
                    <img
                      src={selectedBrand.logo}
                      alt={selectedBrand.name}
                      className="w-32 h-32 rounded-lg mx-auto mb-6 object-cover"
                    />
                    <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedBrand.name}
                    </h3>
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedBrand.email}
                    </p>
                    <div className="flex items-center justify-center space-x-3 mt-3">
                      <span className={`px-4 py-2 rounded-full text-base ${
                        selectedBrand.isVerified
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {selectedBrand.isVerified ? 'Verified' : 'Unverified'}
                      </span>
                      <span className="text-yellow-500">
                        {'★'.repeat(Math.floor(selectedBrand.rating))} {selectedBrand.rating}
                      </span>
                    </div>
                  </div>

                  {/* Brand Details Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Industry
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedBrand.industry}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Budget
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedBrand.budget}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Website
                      </p>
                      <a
                        href={`https://${selectedBrand.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${isDark ? 'text-purple-400' : 'text-purple-600'} hover:underline font-semibold text-lg`}
                      >
                        {selectedBrand.website}
                      </a>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Established
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedBrand.establishedYear}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Location
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedBrand.location}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Campaigns
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedBrand.campaigns} completed
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                      Description
                    </p>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'} leading-relaxed text-base`}>
                      {selectedBrand.description}
                    </p>
                  </div>

                  {/* Campaign Types */}
                  <div>
                    <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                      Campaign Types
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {selectedBrand.campaignTypes.map((type, index) => (
                        <span
                          key={index}
                          className={`px-4 py-2 rounded-full text-base ${isDark ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'}`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleVerifyBrand(selectedBrand.id)}
                      className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-300 ${
                        selectedBrand.isVerified
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      {selectedBrand.isVerified ? 'Revoke Verification' : 'Verify Brand'}
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center space-x-3 py-3 px-5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-300 text-base font-medium">
                        <FaEdit className="w-5 h-5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteBrand(selectedBrand.id)}
                        className="flex items-center justify-center space-x-3 py-3 px-5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 text-base font-medium"
                      >
                        <FaTrash className="w-5 h-5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`text-center py-20 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <div className="mb-4">
                    {activeTab === 'creators' ? (
                      <FaUser className="mx-auto w-16 h-16 opacity-50" />
                    ) : (
                      <FaBuilding className="mx-auto w-16 h-16 opacity-50" />
                    )}
                  </div>
                  <p className="text-lg font-medium mb-2">No item selected</p>
                  <p>Click on a {activeTab === 'creators' ? 'creator' : 'brand'} to view detailed information</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Dashboard */}
        <div className="mt-8">
          <div className="mb-6">
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Platform Analytics
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Real-time insights and performance metrics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Creators */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 border-l-4 border-purple-500`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Total Creators
                  </p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>
                    {creators.length}
                  </p>
                  <p className="text-xs text-green-500 mt-1">
                    +12% from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                  <FaUser className="text-purple-500 w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Total Brands */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 border-l-4 border-blue-500`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Total Brands
                  </p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>
                    {brands.length}
                  </p>
                  <p className="text-xs text-green-500 mt-1">
                    +8% from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <FaBuilding className="text-blue-500 w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Verified Creators */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 border-l-4 border-green-500`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Verified Creators
                  </p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>
                    {creators.filter(c => c.isVerified).length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {((creators.filter(c => c.isVerified).length / creators.length) * 100).toFixed(1)}% verified
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <FaCheck className="text-green-500 w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Verified Brands */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 border-l-4 border-yellow-500`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Verified Brands
                  </p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>
                    {brands.filter(b => b.isVerified).length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {((brands.filter(b => b.isVerified).length / brands.length) * 100).toFixed(1)}% verified
                  </p>
                </div>
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                  <FaCheck className="text-yellow-500 w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Engagement Rate */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 border-l-4 border-pink-500`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Avg. Engagement
                  </p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>
                    {(creators.reduce((sum, creator) => sum + parseFloat(creator.engagementRate), 0) / creators.length).toFixed(1)}%
                  </p>
                  <p className="text-xs text-green-500 mt-1">
                    +2.3% from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900">
                  <FaChartBar className="text-pink-500 w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Total Campaigns */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 border-l-4 border-indigo-500`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Total Campaigns
                  </p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>
                    {brands.reduce((sum, brand) => sum + brand.campaigns, 0)}
                  </p>
                  <p className="text-xs text-green-500 mt-1">
                    +15% from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
                  <FaChartBar className="text-indigo-500 w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Average Rating */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 border-l-4 border-orange-500`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Avg. Creator Rating
                  </p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>
                    {(creators.reduce((sum, creator) => sum + creator.rating, 0) / creators.length).toFixed(1)}
                  </p>
                  <p className="text-xs text-yellow-500 mt-1">
                    ★ Out of 5.0
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                  <span className="text-orange-500 text-2xl font-bold">★</span>
                </div>
              </div>
            </div>

            {/* Pending Verifications */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 border-l-4 border-red-500`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Pending Reviews
                  </p>
                  <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>
                    {creators.filter(c => !c.isVerified).length + brands.filter(b => !b.isVerified).length}
                  </p>
                  <p className="text-xs text-red-500 mt-1">
                    Requires attention
                  </p>
                </div>
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                  <FaBell className="text-red-500 w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
