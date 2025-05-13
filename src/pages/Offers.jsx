import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import styled from 'styled-components';
import { 
  FaSearch, 
  FaFilter, 
  FaHeart, 
  FaRegHeart, 
  FaBookmark,
  FaRegBookmark,
  FaArrowRight,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaNewspaper
} from 'react-icons/fa';
import { FaTiktok as FaTiktokBrand } from 'react-icons/fa6';

const API_KEY = '8c7b42e244e1b2f7e09f9db8f895939e'; // Replace with your Gnews API key

const OffersContainer = styled.div`
  background: ${({ theme }) => theme === 'dark' 
    ? 'linear-gradient(155deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(155deg, #ffffff 0%, #f8fafc 100%)'};
  min-height: 100vh;
  padding: 4rem 0.5rem 1rem;

  @media (min-width: 768px) {
    padding: 6rem 1rem 2rem;
  }

  @media (min-width: 1024px) {
    padding: 8rem 1rem 4rem;
  }
`;

const OffersContent = styled.div`
  max-width: 1400px;
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
    padding: 1.5rem;
  }

  @media (min-width: 1024px) {
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
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const NewsCard = styled(OfferCard)`
  cursor: pointer;
  &:hover {
    .read-more {
      color: ${({ theme }) => theme === 'dark' ? '#93c5fd' : '#2563eb'};
    }
  }
`;

const Offers = () => {
  const { isDark } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('brand-offers');
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  // Sample brand offers data
  const [brandOffers] = useState([
    {
      id: 1,
      brand: 'Nike',
      title: 'Summer Collection Campaign',
      description: 'Looking for creators to showcase our new summer collection. Perfect for fitness and lifestyle creators.',
      budget: '$2,000 - $5,000',
      requirements: ['10K+ followers', 'Fitness/Lifestyle niche', 'High engagement rate'],
      deadline: '2024-06-15',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      brand: 'Starbucks',
      title: 'Seasonal Drink Launch',
      description: 'Promote our new summer menu items through mouth-watering content and reviews.',
      budget: '$1,500 - $4,000',
      requirements: ['5K+ followers', 'Food content creators', 'US-based'],
      platforms: [<FaInstagram />, <FaTiktokBrand />],
      deadline: '2024-05-30',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      brand: 'Samsung',
      title: 'Galaxy S24 Unboxing',
      description: 'First-look unboxing and review of our latest flagship smartphone.',
      budget: '$3,000 - $8,000',
      requirements: ['20K+ followers', 'Tech reviewers', '4K video capability'],
      platforms: [<FaYoutube />, <FaInstagram />],
      deadline: '2024-07-10',
      image: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      brand: 'Airbnb',
      title: 'Unique Stays Campaign',
      description: 'Feature extraordinary Airbnb listings in your travel content.',
      budget: 'Free stays + $1,000 - $3,000',
      requirements: ['15K+ followers', 'Travel content', 'Creative storytelling'],
      platforms: [<FaInstagram />, <FaYoutube />],
      deadline: '2024-06-30',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 5,
      brand: 'Lululemon',
      title: 'Yoga Challenge',
      description: '30-day yoga challenge featuring our new athleisure collection.',
      budget: '$2,500 - $6,000',
      requirements: ['8K+ followers', 'Yoga/fitness focus', 'Daily content'],
      platforms: [<FaInstagram />, <FaTiktokBrand />],
      deadline: '2024-05-25',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 6,
      brand: 'Spotify',
      title: 'Playlist Takeover',
      description: 'Curate and promote your own branded playlist on our platform.',
      budget: '$1,000 - $2,500',
      requirements: ['Music influencers', '5K+ followers', 'Engaged audience'],
      platforms: [<FaInstagram />],
      deadline: '2024-07-15',
      image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 7,
      brand: 'Adobe',
      title: 'Creative Cloud Showcase',
      description: 'Create tutorials and showcase projects using our Creative Cloud suite.',
      budget: '$4,000 - $10,000',
      requirements: ['Design/editing focus', '10K+ followers', 'Professional quality'],
      platforms: [<FaYoutube />, <FaInstagram />],
      deadline: '2024-08-01',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 8,
      brand: 'Glossier',
      title: 'Skincare Routine Challenge',
      description: 'Feature our products in your daily skincare routine content.',
      budget: '$1,800 - $3,500',
      requirements: ['Beauty creators', '7K+ followers', 'Authentic engagement'],
      platforms: [<FaInstagram />, <FaTiktokBrand />],
      deadline: '2024-06-20',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 9,
      brand: 'Tesla',
      title: 'EV Lifestyle Series',
      description: 'Document your experience with our electric vehicles for a week.',
      budget: 'Vehicle loan + $5,000 - $12,000',
      requirements: ['25K+ followers', 'Auto/lifestyle', 'High production value'],
      platforms: [<FaYoutube />, <FaInstagram />],
      deadline: '2024-07-05',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 10,
      brand: 'Peloton',
      title: 'Home Fitness Journey',
      description: 'Document your 30-day fitness transformation using our bike/tread.',
      budget: '$3,000 - $7,000',
      requirements: ['Fitness influencers', '10K+ followers', 'Motivational content'],
      platforms: [<FaInstagram />, <FaYoutube />],
      deadline: '2024-06-10',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 11,
      brand: 'Patagonia',
      title: 'Sustainable Outdoors',
      description: 'Showcase our eco-friendly outdoor gear in adventure content.',
      budget: 'Gear package + $2,000 - $4,000',
      requirements: ['Outdoor enthusiasts', '5K+ followers', 'Environmental focus'],
      platforms: [<FaInstagram />, <FaYoutube />],
      deadline: '2024-08-15',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 12,
      brand: 'MasterClass',
      title: 'Learning Experience',
      description: 'Share your journey taking one of our expert-led classes.',
      budget: '$1,500 - $3,500',
      requirements: ['Education content', '8K+ followers', 'Engaged community'],
      platforms: [<FaYoutube />, <FaInstagram />],
      deadline: '2024-07-22',
      image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=500&q=80'
    }
  ]);

  // Add refresh function
  const refreshNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=creator+economy+OR+influencer+marketing&lang=en&country=us&max=10&apikey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.articles && data.articles.length > 0) {
        const relevantArticles = data.articles
          .filter(article => 
            article.title && 
            article.description && 
            article.url && 
            article.image
          )
          .map(article => ({
            ...article,
            urlToImage: article.image,
            source: { name: article.source.name }
          }))
          .slice(0, 4);

        setNews(relevantArticles);
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error.message);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch news data
  useEffect(() => {
    refreshNews();
    // Refresh news every 30 minutes
    const interval = setInterval(refreshNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Interaction handlers
  const handleSave = (id) => {
    setSavedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleLike = (id) => {
    setLikedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Filter offers based on search
  const filteredOffers = brandOffers.filter(offer =>
    offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render brand offers
  const renderBrandOffers = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {filteredOffers.map((offer) => (
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
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {offer.brand}
                  </h3>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mt-1">
                    {offer.title}
                  </h4>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleLike(offer.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {likedItems.includes(offer.id) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <button 
                    onClick={() => handleSave(offer.id)}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {savedItems.includes(offer.id) ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </div>
              </div>
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

  // Render news items
  const renderNews = () => (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          Latest in Creator Economy
        </h2>
        <button
          onClick={refreshNews}
          disabled={loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              Refreshing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Refresh News
            </>
          )}
        </button>
      </div>
      
      {loading && !news.length && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-6 rounded">
          <p>Couldn't load latest news: {error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {news.map((article, index) => (
          <NewsCard
            key={index}
            theme={isDark ? 'dark' : 'light'}
            whileHover={{ scale: 1.02 }}
            onClick={() => window.open(article.url || '#', '_blank')}
          >
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-40 sm:h-48 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                {article.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {article.source.name}
                </span>
                <span className="text-xs sm:text-sm flex items-center gap-1 text-blue-500 dark:text-blue-400 read-more">
                  Read more <FaArrowRight className="text-xs" />
                </span>
              </div>
            </div>
          </NewsCard>
        ))}
      </div>
    </div>
  );

  return (
    <OffersContainer theme={isDark ? 'dark' : 'light'}>
      <OffersContent theme={isDark ? 'dark' : 'light'}>
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
          >
            Creator Hub
          </motion.h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-4">
            Discover opportunities and stay updated with industry news
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 sm:py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          </div>
          <div className="flex gap-4">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 sm:py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FaFilter />
              <span>Advanced Filters</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('brand-offers')}
            className={`whitespace-nowrap px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all ${
              activeTab === 'brand-offers'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Brand Offers
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`whitespace-nowrap px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all ${
              activeTab === 'news'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Industry News
          </button>
        </div>

        {/* Content */}
        {activeTab === 'brand-offers' ? (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Featured Campaigns
            </h2>
            {renderBrandOffers()}
          </>
        ) : (
          <>
            {renderNews()}
          </>
        )}
      </OffersContent>
    </OffersContainer>
  );
};

export default Offers;