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
import BlueTick from '../assets/bluetick.png';
import { getAllCreators, getAllBrands } from '../firebase/firestore';
import { updateCreatorVerification, updateBrandVerification } from '../firebase/firestore';
import axios from 'axios';

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
  const [creators, setCreators] = useState([]); // Start with empty array
  const [brands, setBrands] = useState([]); // Start with empty array instead of dummy data
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [activeTab, setActiveTab] = useState('creators');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, verified, unverified
  const [sortBy, setSortBy] = useState('name'); // name, followers, rating, joinDate
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [processingVerification, setProcessingVerification] = useState(null);

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      navigate('/admin');
    }
    
    // Fetch real creators from Firestore
    const fetchCreators = async () => {
      try {
        const data = await getAllCreators();
        setCreators(data);
      } catch (err) {
        console.error('Error fetching creators:', err);
      }
    };

    // Fetch real brands from Firestore
    const fetchBrands = async () => {
      try {
        const data = await getAllBrands();
        setBrands(data);
      } catch (err) {
        console.error('Error fetching brands:', err);
      }
    };

    fetchCreators();
    fetchBrands();
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

  const handleVerifyCreator = async (creatorId) => {
    setProcessingVerification(creatorId);
    try {
      setCreators(prev => prev.map(creator => 
        (creator.id === creatorId || creator.uid === creatorId)
          ? { ...creator, isVerified: !creator.isVerified }
          : creator
      ));
      setSelectedCreator(prev => 
        prev && (prev.id === creatorId || prev.uid === creatorId)
          ? { ...prev, isVerified: !prev.isVerified }
          : prev
      );
      // Update Firestore
      const creator = creators.find(c => c.id === creatorId || c.uid === creatorId);
      const docId = creator?.uid || creatorId;
      if (creator) {
        await updateCreatorVerification(docId, !creator.isVerified);
      }
    } catch (err) {
      console.error('Failed to update creator verification in Firestore:', err);
      // Revert the state change on error
      setCreators(prev => prev.map(creator => 
        (creator.id === creatorId || creator.uid === creatorId)
          ? { ...creator, isVerified: !creator.isVerified }
          : creator
      ));
      setSelectedCreator(prev => 
        prev && (prev.id === creatorId || prev.uid === creatorId)
          ? { ...prev, isVerified: !prev.isVerified }
          : prev
      );
    } finally {
      setProcessingVerification(null);
    }
  };

  const handleVerifyBrand = async (brandId) => {
    setProcessingVerification(brandId);
    try {
      setBrands(prev => prev.map(brand => 
        (brand.id === brandId || brand.uid === brandId)
          ? { ...brand, isVerified: !brand.isVerified }
          : brand
      ));
      setSelectedBrand(prev => 
        prev && (prev.id === brandId || prev.uid === brandId)
          ? { ...prev, isVerified: !prev.isVerified }
          : prev
      );
      // Update Firestore
      const brand = brands.find(b => b.id === brandId || b.uid === brandId);
      const docId = brand?.uid || brandId;
      if (brand) {
        await updateBrandVerification(docId, !brand.isVerified);
      }
    } catch (err) {
      console.error('Failed to update brand verification in Firestore:', err);
      // Revert the state change on error
      setBrands(prev => prev.map(brand => 
        (brand.id === brandId || brand.uid === brandId)
          ? { ...brand, isVerified: !brand.isVerified }
          : brand
      ));
      setSelectedBrand(prev => 
        prev && (prev.id === brandId || prev.uid === brandId)
          ? { ...prev, isVerified: !prev.isVerified }
          : prev
      );
    } finally {
      setProcessingVerification(null);
    }
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
      setBrands(prev => prev.filter(brand => brand.id !== brandId && brand.uid !== brandId));
      if (selectedBrand && (selectedBrand.id === brandId || selectedBrand.uid === brandId)) {
        setSelectedBrand(null);
      }
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setSortBy('name');
  };

  // Remove the Export button and exportData function

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

  // Helper function to robustly extract Instagram username from any input
  function extractInstagramUsername(igHandle) {
    if (!igHandle) return '';
    // If it's a URL, extract the username
    if (igHandle.startsWith('http')) {
      try {
        const url = new URL(igHandle);
        // Remove trailing slash, get last segment
        let pathname = url.pathname.replace(/\/+$/, '');
        let parts = pathname.split('/');
        return parts[parts.length - 1] || '';
      } catch {
        // Fallback if URL parsing fails
        let parts = igHandle.split('/').filter(Boolean);
        return parts[parts.length - 1].split('?')[0];
      }
    }
    // If it's just a username, remove @ if present
    return igHandle.replace(/^@/, '').trim();
  }
  // Deterministic pseudo-random number generator based on string (e.g., email or id)
  function seededRandom(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) / 2147483647;
  }

  // Generate deterministic followers and likes for a creator
  function getDeterministicStats(creator) {
    const seed = creator.email || creator.id || creator.name;
    const rand1 = seededRandom(seed + 'followers');
    const rand2 = seededRandom(seed + 'likes');
    const rand3 = seededRandom(seed + 'rating');
    const rand4 = seededRandom(seed + 'engagement');
    const rand5 = seededRandom(seed + 'views');
    const rand6 = seededRandom(seed + 'joindate');
    // Followers: 1,000 to 9,999
    const followers = Math.floor(1000 + rand1 * (9999 - 1000));
    // Likes: 1,000 to 49,999
    const likes = Math.floor(1000 + rand2 * (49999 - 1000));
    // Rating: 3.0 to 5.0 (one decimal)
    const rating = (3 + rand3 * 2).toFixed(1);
    // Engagement Rate: 2% to 20% (one decimal)
    const engagementRate = (2 + rand4 * 18).toFixed(1) + '%';
    // Average Views: 500 to 9,999
    const averageViews = Math.floor(500 + rand5 * (9999 - 500)).toLocaleString();
    // Join Date: random date between 2018-01-01 and today
    const start = new Date('2018-01-01').getTime();
    const end = new Date().getTime();
    const joinDate = new Date(start + rand6 * (end - start));
    const joinDateStr = joinDate.toISOString().split('T')[0];
    return { followers, likes, rating, engagementRate, averageViews, joinDate: joinDateStr };
  }
  // When a creator is selected, fetch their Instagram profile info
  const handleSelectCreator = (creator) => {
    setProfileError && setProfileError('');
    setProfileLoading && setProfileLoading(false);
    // Attach deterministic stats
    const stats = getDeterministicStats(creator);
    setSelectedCreator({
      ...creator,
      followers: stats.followers.toLocaleString(),
      totalLikes: stats.likes.toLocaleString(),
      rating: stats.rating,
      engagementRate: stats.engagementRate,
      averageViews: stats.averageViews,
      joinDate: stats.joinDate,
      platform: 'Instagram'
    });
  };

  // Helper function to get initials
  function getInitials(name) {
    if (!name) return '';
    const parts = name.trim().split(' ');
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  }

  function formatBudgetToINR(budgetStr) {
    // Example: '$50K - $100K' => '₹40L - ₹80L'
    if (!budgetStr) return '';
    const match = budgetStr.match(/\$(\d+)K\s*-\s*\$(\d+)K/);
    if (!match) return budgetStr;
    // 1K USD ≈ 80,000 INR, 1L = 100,000 INR
    const usdToInr = 80;
    const kToL = 0.8; // 1K USD = 0.8L INR
    const min = Math.round(parseInt(match[1], 10) * kToL);
    const max = Math.round(parseInt(match[2], 10) * kToL);
    return `₹${min}L - ₹${max}L`;
  }

  function getDeterministicBrandStats(brand) {
    // Deterministic random for budget below 1L (10,000 to 99,999 INR)
    const seed = brand.email || brand.id || brand.name;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash;
    }
    const rand1 = Math.abs(hash) / 2147483647;
    const min = Math.floor(10000 + rand1 * (50000 - 10000)); // 10K to 50K
    const max = Math.floor(min + 10000 + rand1 * (49000 - 10000)); // min+10K to 99K
    // Deterministic ROI: 10.0% to 15.0%
    const roi = (10 + rand1 * 5).toFixed(1) + '%';
    return { budgetINR: `₹${(min/1000).toFixed(1)}K - ₹${(max/1000).toFixed(1)}K`, roi };
  }

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
                        {/* Creator verification requests */}
                        {creators.filter(c => !c.isVerified).slice(0, 3).map((creator) => (
                          <div key={`creator-${creator.id || creator.uid}`} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-200 cursor-pointer`}>
                            <div className="flex items-center space-x-3">
                              {creator.avatar ? (
                                <img src={creator.avatar} alt={creator.name} className="w-10 h-10 rounded-full object-cover" />
                              ) : (
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-bold">
                                  {creator.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                              )}
                              <div className="flex-1">
                                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  Creator Verification Request
                                </p>
                                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {creator.name || 'Unknown Creator'} wants to get verified
                                </p>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {creator.category || 'Content Creator'} • {creator.followers || 'N/A'} followers
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleVerifyCreator(creator.id || creator.uid);
                                  }}
                                  disabled={processingVerification === (creator.id || creator.uid)}
                                  className={`${processingVerification === (creator.id || creator.uid) 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-green-500 hover:bg-green-600'
                                  } text-white px-2 py-1 rounded text-xs transition-colors duration-200 flex items-center space-x-1`}
                                >
                                  {processingVerification === (creator.id || creator.uid) ? (
                                    <>
                                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                                      <span>Verifying...</span>
                                    </>
                                  ) : (
                                    <span>Verify</span>
                                  )}
                                </button>
                                <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors duration-200">
                                  Later
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Brand verification requests */}
                        {brands.filter(b => !b.isVerified).slice(0, 3).map((brand) => (
                          <div key={`brand-${brand.id || brand.uid}`} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-200 cursor-pointer`}>
                            <div className="flex items-center space-x-3">
                              {brand.logo ? (
                                <img 
                                  src={brand.logo} 
                                  alt={brand.name} 
                                  className="w-10 h-10 rounded-lg object-cover"
                                  onError={(e) => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${brand.name}&background=6366f1&color=fff&size=40`;
                                  }}
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm font-bold">
                                  {brand.name?.charAt(0)?.toUpperCase() || 'B'}
                                </div>
                              )}
                              <div className="flex-1">
                                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  Business Verification Request
                                </p>
                                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {brand.name || 'Unknown Business'} wants to get verified
                                </p>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {brand.industry || 'Business'} • {brand.location || 'Location not specified'}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleVerifyBrand(brand.id || brand.uid);
                                  }}
                                  disabled={processingVerification === (brand.id || brand.uid)}
                                  className={`${processingVerification === (brand.id || brand.uid) 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-green-500 hover:bg-green-600'
                                  } text-white px-2 py-1 rounded text-xs transition-colors duration-200 flex items-center space-x-1`}
                                >
                                  {processingVerification === (brand.id || brand.uid) ? (
                                    <>
                                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                                      <span>Verifying...</span>
                                    </>
                                  ) : (
                                    <span>Verify</span>
                                  )}
                                </button>
                                <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors duration-200">
                                  Later
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Show message if no pending verifications */}
                        {creators.filter(c => !c.isVerified).length === 0 && brands.filter(b => !b.isVerified).length === 0 && (
                          <div className="text-center py-8">
                            <FaBell className={`mx-auto w-12 h-12 ${isDark ? 'text-gray-600' : 'text-gray-400'} mb-3`} />
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                              No pending verification requests
                            </p>
                          </div>
                        )}
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
              {/* Remove the Export button */}
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
                    filteredCreators.map(creator => {
                      const stats = getDeterministicStats(creator);
                      return (
                        <div
                          key={creator.id}
                          className={`p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                            selectedCreator?.id === creator.id
                              ? `border-purple-500 ${isDark ? 'bg-purple-900/20' : 'bg-purple-50'}`
                              : `${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`
                          }`}
                          onClick={() => handleSelectCreator(creator)}
                        >
                          <div className="flex items-center space-x-5">
                            {creator.avatarUrl ? (
                              <img
                                src={creator.avatarUrl}
                                alt={creator.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold">
                                {getInitials(creator.name)}
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{creator.name}</h3>
                                  {creator.isVerified && (
                                    <img src={BlueTick} alt="Verified" className="w-5 h-5" />
                                  )}
                                </div>
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
                                {creator.category} • {stats.followers.toLocaleString()} followers
                                <span className="ml-2 text-yellow-500">{'★'.repeat(Math.floor(stats.rating))} {stats.rating}</span>
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
                                  Rating: {stats.rating}/5
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <FaUser className="mx-auto w-12 h-12 mb-4 opacity-50" />
                      <p>No creators found matching your criteria</p>
                    </div>
                  )
                ) : (
                  filteredBrands.length > 0 ? (
                    filteredBrands.map(brand => {
                      const stats = getDeterministicBrandStats(brand);
                      // Handle both real Firestore data and dummy data structure
                      const brandName = brand.name;
                      const brandEmail = brand.email;
                      const brandIndustry = brand.industry || 'Not Specified';
                      const brandLogo = brand.logo || `https://ui-avatars.com/api/?name=${brandName}&background=6366f1&color=fff&size=64`;
                      const brandRating = brand.rating || 4.0;
                      const brandWebsite = brand.website || 'Not provided';
                      const brandLocation = brand.location || 'Not specified';
                      const brandBusinessSize = brand.businessSize || 'Not specified';
                      const brandYearsInBusiness = brand.yearsInBusiness || 'Not specified';
                      
                      return (
                        <div
                          key={brand.id || brand.uid}
                          className={`p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                            selectedBrand?.id === brand.id || selectedBrand?.uid === brand.uid
                              ? `border-purple-500 ${isDark ? 'bg-purple-900/20' : 'bg-purple-50'}`
                              : `${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`
                          }`}
                          onClick={() => setSelectedBrand(brand)}
                        >
                          <div className="flex items-center space-x-5">
                            <img
                              src={brandLogo}
                              alt={brandName}
                              className="w-16 h-16 rounded-lg object-cover"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${brandName}&background=6366f1&color=fff&size=64`;
                              }}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{brandName}</h3>
                                  {brand.isVerified && (
                                    <img src={BlueTick} alt="Verified" className="w-5 h-5" />
                                  )}
                                </div>
                                <div className="flex items-center space-x-3">
                                  {brand.isVerified ? (
                                    <FaCheck className="text-green-500 w-5 h-5" />
                                  ) : (
                                    <FaTimes className="text-red-500 w-5 h-5" />
                                  )}
                                  <FaEye className="text-purple-500 w-5 h-5" />
                                </div>
                              </div>
                              <div className="flex items-center mt-2">
                                <span className="text-yellow-500 mr-2">{'★'.repeat(Math.floor(brandRating))} {brandRating}</span>
                              </div>
                              <div className="flex flex-col mt-2 text-sm">
                                <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Industry: <b>{brandIndustry}</b></span>
                                <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Location: <b>{brandLocation}</b></span>
                                <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Business Size: <b>{brandBusinessSize}</b></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
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
              {profileLoading && (
                <div className="text-center py-8 text-lg text-purple-500">Loading profile...</div>
              )}
              {profileError && (
                <div className="text-center py-8 text-lg text-red-500">{profileError}</div>
              )}
              {selectedCreator && activeTab === 'creators' ? (
                <div className="space-y-6">
                  {/* Creator Header */}
                  <div className="text-center">
                    {selectedCreator.avatarUrl ? (
                      <img
                        src={selectedCreator.avatarUrl}
                        alt={selectedCreator.name}
                        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white text-5xl font-bold">
                        {getInitials(selectedCreator.name)}
                      </div>
                    )}
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {selectedCreator.name}
                      </h3>
                      {selectedCreator.isVerified && (
                        <img src={BlueTick} alt="Verified" className="w-6 h-6" />
                      )}
                    </div>
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
                        Total Likes
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedCreator.totalLikes}
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
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Average Views
                      </p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedCreator.averageViews}
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
                      {(selectedCreator.languages || []).map((lang, index) => (
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
                      src={selectedBrand.logo || `https://ui-avatars.com/api/?name=${selectedBrand.name}&background=6366f1&color=fff&size=128`}
                      alt={selectedBrand.name}
                      className="w-32 h-32 rounded-lg mx-auto mb-6 object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${selectedBrand.name}&background=6366f1&color=fff&size=128`;
                      }}
                    />
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedBrand.name}</h3>
                      {selectedBrand.isVerified && (
                        <img src={BlueTick} alt="Verified" className="w-6 h-6" />
                      )}
                    </div>
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{selectedBrand.email}</p>
                    <div className="flex items-center justify-center space-x-3 mt-3">
                      <span className={`px-4 py-2 rounded-full text-base ${
                        selectedBrand.isVerified
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {selectedBrand.isVerified ? 'Verified' : 'Unverified'}
                      </span>
                      <span className="text-yellow-500">{'★'.repeat(Math.floor(selectedBrand.rating || 4.0))} {selectedBrand.rating || 4.0}</span>
                    </div>
                  </div>

                  {/* Brand Details Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Industry</p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>{selectedBrand.industry || 'Not Specified'}</p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Business Size</p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>
                        {selectedBrand.businessSize || 'Not Specified'}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Website</p>
                      {selectedBrand.website ? (
                        <a
                          href={selectedBrand.website.startsWith('http') ? selectedBrand.website : `https://${selectedBrand.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${isDark ? 'text-purple-400' : 'text-purple-600'} hover:underline font-semibold text-lg break-all`}
                        >
                          {selectedBrand.website}
                        </a>
                      ) : (
                        <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>Not Provided</p>
                      )}
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Years in Business</p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>{selectedBrand.yearsInBusiness || selectedBrand.establishedYear || 'Not Specified'}</p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Location</p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>{selectedBrand.location || 'Not Specified'}</p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>LinkedIn</p>
                      {selectedBrand.linkedin ? (
                        <a
                          href={selectedBrand.linkedin.startsWith('http') ? selectedBrand.linkedin : `https://${selectedBrand.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${isDark ? 'text-purple-400' : 'text-purple-600'} hover:underline font-semibold text-lg break-all`}
                        >
                          LinkedIn Profile
                        </a>
                      ) : (
                        <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>Not Provided</p>
                      )}
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Social Media</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedBrand.instagram && (
                          <a
                            href={selectedBrand.instagram.startsWith('http') ? selectedBrand.instagram : `https://${selectedBrand.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-pink-900 text-pink-200' : 'bg-pink-100 text-pink-800'}`}
                          >
                            Instagram
                          </a>
                        )}
                        {selectedBrand.twitter && (
                          <a
                            href={selectedBrand.twitter.startsWith('http') ? selectedBrand.twitter : `https://${selectedBrand.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}
                          >
                            Twitter
                          </a>
                        )}
                        {!selectedBrand.instagram && !selectedBrand.twitter && (
                          <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>Not Provided</p>
                        )}
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>User ID</p>
                      <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-sm break-all`}>{selectedBrand.uid || selectedBrand.id || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleVerifyBrand(selectedBrand.uid || selectedBrand.id)}
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
                        onClick={() => handleDeleteBrand(selectedBrand.uid || selectedBrand.id)}
                        className="flex items-center justify-center space-x-3 py-3 px-5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 text-base font-medium"
                      >
                        <FaTrash className="w-5 h-5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ): <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;