import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaStar, FaRegStar, FaHeart, FaRegHeart } from 'react-icons/fa';

const OffersContainer = styled.div`
  background: ${({ theme }) => theme === 'dark' 
    ? 'linear-gradient(155deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(155deg, #ffffff 0%, #f8fafc 100%)'};
  min-height: 100vh;
  padding: 6rem 0.5rem 2rem;

  @media (min-width: 768px) {
    padding: 8rem 1rem 4rem;
  }
`;

const OffersContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${({ theme }) => theme === 'dark' 
    ? 'rgba(23, 25, 35, 0.9)'
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'};
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const OfferCard = styled(motion.div)`
  background: ${({ theme }) => theme === 'dark' 
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Offers = () => {
  const { isDark } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('brand-offers');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for brand offers
  const brandOffers = [
    {
      id: 1,
      brand: 'Nike',
      title: 'Summer Collection Campaign',
      description: 'Looking for creators to showcase our new summer collection. Perfect for fitness and lifestyle creators.',
      budget: '$2,000 - $5,000',
      requirements: ['10K+ followers', 'Fitness/Lifestyle niche', 'High engagement rate'],
      deadline: '2024-06-15',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      brand: 'Starbucks',
      title: 'Local Store Promotion',
      description: 'Promote our new seasonal drinks and create engaging content for our local stores.',
      budget: '$1,000 - $3,000',
      requirements: ['5K+ followers', 'Food/Lifestyle content', 'Local presence'],
      deadline: '2024-05-30',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    // Add more offers as needed
  ];

  // Sample data for collaboration requests
  const collaborationRequests = [
    {
      id: 1,
      brand: 'Adidas',
      title: 'Sports Wear Collaboration',
      description: 'We love your content and would like to collaborate on our new sports wear line.',
      status: 'Pending',
      date: '2024-04-20',
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      brand: 'Apple',
      title: 'Tech Review Partnership',
      description: 'Interested in having you review our latest products and create engaging content.',
      status: 'New',
      date: '2024-04-19',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    // Add more requests as needed
  ];

  const renderBrandOffers = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {brandOffers.map((offer) => (
        <OfferCard
          key={offer.id}
          theme={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-4">
            <img
              src={offer.image}
              alt={offer.brand}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {offer.brand}
                </h3>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <FaRegHeart />
                </button>
              </div>
              <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mt-1">
                {offer.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {offer.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {offer.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  >
                    {req}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {offer.budget}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Deadline: {new Date(offer.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </OfferCard>
      ))}
    </div>
  );

  const renderCollaborationRequests = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {collaborationRequests.map((request) => (
        <OfferCard
          key={request.id}
          theme={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-4">
            <img
              src={request.image}
              alt={request.brand}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {request.brand}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  request.status === 'New' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                }`}>
                  {request.status}
                </span>
              </div>
              <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mt-1">
                {request.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {request.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  View Details
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(request.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </OfferCard>
      ))}
    </div>
  );

  return (
    <OffersContainer theme={isDark ? 'dark' : 'light'}>
      <OffersContent theme={isDark ? 'dark' : 'light'}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Creator Opportunities
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
            Discover and manage your brand collaborations
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <FaFilter />
            <span>Filter</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('brand-offers')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
              activeTab === 'brand-offers'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Brand Offers
          </button>
          <button
            onClick={() => setActiveTab('collaborations')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
              activeTab === 'collaborations'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Collaboration Requests
          </button>
        </div>

        {/* Content */}
        {activeTab === 'brand-offers' ? renderBrandOffers() : renderCollaborationRequests()}
      </OffersContent>
    </OffersContainer>
  );
};

export default Offers; 