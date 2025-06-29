import React, { useEffect, useState } from 'react';
import { getAllCreators } from '../firebase/firestore';
import { sendNotification } from '../firebase/notifications';
import { useTheme } from '../contexts/ThemeContext';
import { FaInstagram, FaYoutube, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const statusColors = {
  Engaged: 'bg-purple-700 text-purple-100',
  Pending: 'bg-yellow-700 text-yellow-100',
  Available: 'bg-green-700 text-green-100',
};

const CreatorsNetwork = () => {
  const { isDark } = useTheme();
  const [user, setUser] = useState(null);
  const [creators, setCreators] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [brandProfile, setBrandProfile] = useState(null);
  const [creatorNotificationMap, setCreatorNotificationMap] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    niche: '',
    minTariff: '',
    maxTariff: '',
    hasInstagram: false,
    hasYoutube: false,
    hasLinkedin: false,
    hasEmail: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const creatorsPerPage = 5;
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'rejected', 'accepted', or 'sent'

  // Listen for Firebase Auth user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      try {
        const data = await getAllCreators();
        setCreators(data);
      } catch (err) {
        console.error('Error fetching creators:', err);
        setNotification({ show: true, message: 'Failed to fetch creators', type: 'error' });
      }
      setLoading(false);
    };
    fetchCreators();
  }, []);

  // Fetch brand profile from Firestore
  useEffect(() => {
    const fetchBrandProfile = async () => {
      if (user && user.uid) {
        try {
          const brandDoc = await getDoc(doc(db, 'brands', user.uid));
          if (brandDoc.exists()) {
            setBrandProfile(brandDoc.data());
          }
        } catch (err) {
          setNotification({ show: true, message: 'Failed to fetch brand profile', type: 'error' });
        }
      }
    };
    fetchBrandProfile();
  }, [user]);

  // Fetch notifications sent by this brand
  useEffect(() => {
    const fetchBrandNotifications = async () => {
      if (!user || !user.uid) return;
      try {
        const q = query(
          collection(db, 'notifications'),
          where('senderId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const notifMap = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Only keep the latest notification per creator (by createdAt)
          const prev = notifMap[data.receiverId];
          if (!prev || (data.createdAt?.toMillis?.() || 0) > (prev.createdAt?.toMillis?.() || 0)) {
            notifMap[data.receiverId] = data;
          }
        });
        setCreatorNotificationMap(notifMap);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    fetchBrandNotifications();
  }, [user, sending, showModal]);

  const filteredCreators = creators.filter(c => {
    // Search filter
    const matchesSearch = c.name?.toLowerCase().includes(search.toLowerCase());
    
    // Niche filter
    const matchesNiche = !filters.niche || c.niche?.toLowerCase().includes(filters.niche.toLowerCase());
    
    // Tariff filter
    const creatorTariff = parseFloat(c.tariff) || 0;
    const minTariff = parseFloat(filters.minTariff) || 0;
    const maxTariff = parseFloat(filters.maxTariff) || Infinity;
    const matchesTariff = creatorTariff >= minTariff && creatorTariff <= maxTariff;
    
    // Social media filters
    const matchesSocials = (!filters.hasInstagram || c.socials?.instagram) &&
                          (!filters.hasYoutube || c.socials?.youtube) &&
                          (!filters.hasLinkedin || c.socials?.linkedin) &&
                          (!filters.hasEmail || c.email);
    
    return matchesSearch && matchesNiche && matchesTariff && matchesSocials;
  });

  // Get unique niches for filter dropdown
  const uniqueNiches = [...new Set(creators.map(c => c.niche).filter(Boolean))].sort();

  // Sort creators by createdAt (latest first)
  const sortedCreators = [...filteredCreators].sort((a, b) => {
    return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
  });

  // Filter for rejected creators
  const rejectedCreators = sortedCreators.filter(
    creator => creatorNotificationMap[creator.id]?.status === 'rejected'
  );
  // Filter for accepted creators
  const acceptedCreators = sortedCreators.filter(
    creator => creatorNotificationMap[creator.id]?.status === 'accepted'
  );
  // Filter for sent creators (status 'new' or 'viewed')
  const sentCreators = sortedCreators.filter(
    creator => {
      const status = creatorNotificationMap[creator.id]?.status;
      return status === 'new' || status === 'viewed';
    }
  );
  // Filter for 'all' tab: not accepted, not rejected, not sent
  const allTabCreators = sortedCreators.filter(
    creator => {
      const status = creatorNotificationMap[creator.id]?.status;
      return status !== 'accepted' && status !== 'rejected' && status !== 'new' && status !== 'viewed';
    }
  );

  // Pagination logic
  const indexOfLast = currentPage * creatorsPerPage;
  const indexOfFirst = indexOfLast - creatorsPerPage;
  const currentCreators = allTabCreators.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allTabCreators.length / creatorsPerPage);

  const handleConnect = (creator) => {
    setSelectedCreator(creator);
    setShowModal(true);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setFilters({
      niche: '',
      minTariff: '',
      maxTariff: '',
      hasInstagram: false,
      hasYoutube: false,
      hasLinkedin: false,
      hasEmail: false
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSendNotification = async () => {
    console.log('DEBUG: handleSendNotification called');
    console.log('DEBUG: user:', user);
    console.log('DEBUG: selectedCreator:', selectedCreator);
    console.log('DEBUG: message:', message);
    console.log('DEBUG: brandProfile:', brandProfile);
    if (!user || !user.uid || !selectedCreator || !message.trim() || !brandProfile) {
      setNotification({ show: true, message: 'Please complete your brand profile and fill in all fields', type: 'error' });
      return;
    }

    setSending(true);
    try {
      const notificationData = {
        receiverId: selectedCreator.id,
        senderId: user.uid,
        brandName: brandProfile.name || '',
        industry: brandProfile.industry || '',
        website: brandProfile.website || '',
        location: brandProfile.location || '',
        businessSize: brandProfile.businessSize || '',
        yearsInBusiness: brandProfile.yearsInBusiness || '',
        socials: {
          instagram: brandProfile.instagram || '',
          linkedin: brandProfile.linkedin || '',
          twitter: brandProfile.twitter || '',
        },
        email: brandProfile.email || '',
        message: message.trim(),
        brandLogo: brandProfile.avatarUrl || '',
      };

      console.log('DEBUG: Sending notification with data:', notificationData);
      const docId = await sendNotification(notificationData);
      console.log('DEBUG: Notification sent, docId:', docId);
      setNotification({ 
        show: true, 
        message: `Connection request sent to ${selectedCreator.name}!`, 
        type: 'success' 
      });
      setShowModal(false);
      setMessage('');
      setSelectedCreator(null);
    } catch (error) {
      console.error('DEBUG: Error sending notification:', error);
      setNotification({ 
        show: true, 
        message: 'Failed to send connection request: ' + (error?.message || error), 
        type: 'error' 
      });
    } finally {
      setSending(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setMessage('');
    setSelectedCreator(null);
  };

  const closeNotification = () => {
    setNotification({ ...notification, show: false });
  };

  return (
    <div className={`rounded-xl p-6 shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}> 
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Creator Network</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search creators..."
            className="px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button 
            onClick={toggleFilters}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              showFilters 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {showFilters ? 'Hide Filters' : '+ Find Creators'}
          </button>
        </div>
      </div>

      {/* Tab UI */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('accepted')}
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'accepted' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          Accepted
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'sent' ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          Sent
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          Rejected
        </button>
      </div>

      {/* Smart Filters Panel */}
      {showFilters && (
        <div className={`mb-6 p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Smart Filters</h3>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-500 hover:text-blue-600 font-medium"
            >
              Reset All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Niche Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Niche</label>
              <select
                value={filters.niche}
                onChange={(e) => handleFilterChange('niche', e.target.value)}
                className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
                }`}
              >
                <option value="">All Niches</option>
                {uniqueNiches.map(niche => (
                  <option key={niche} value={niche}>{niche}</option>
                ))}
              </select>
            </div>

            {/* Min Tariff */}
            <div>
              <label className="block text-sm font-medium mb-2">Min Tariff (₹)</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minTariff}
                onChange={(e) => handleFilterChange('minTariff', e.target.value)}
                className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>

            {/* Max Tariff */}
            <div>
              <label className="block text-sm font-medium mb-2">Max Tariff (₹)</label>
              <input
                type="number"
                placeholder="No limit"
                value={filters.maxTariff}
                onChange={(e) => handleFilterChange('maxTariff', e.target.value)}
                className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>

            {/* Active Filters Count */}
            <div className="flex items-end">
              <div className={`px-3 py-2 rounded text-sm font-medium ${isDark ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
                Showing {filteredCreators.length} of {creators.length} creators
              </div>
            </div>
          </div>

          {/* Social Media Filters */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Required Social Platforms</label>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasInstagram}
                  onChange={(e) => handleFilterChange('hasInstagram', e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <FaInstagram className="text-pink-500" />
                <span className="text-sm">Instagram</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasYoutube}
                  onChange={(e) => handleFilterChange('hasYoutube', e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <FaYoutube className="text-red-500" />
                <span className="text-sm">YouTube</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasLinkedin}
                  onChange={(e) => handleFilterChange('hasLinkedin', e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <FaLinkedin className="text-blue-600" />
                <span className="text-sm">LinkedIn</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasEmail}
                  onChange={(e) => handleFilterChange('hasEmail', e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <FaEnvelope className="text-green-500" />
                <span className="text-sm">Email</span>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 text-left">CREATOR</th>
              <th className="py-2 text-left">NICHE</th>
              <th className="py-2 text-left">SOCIAL LINKS</th>
              <th className="py-2 text-left">TARIFF</th>
              <th className="py-2 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8">Loading...</td></tr>
            ) : activeTab === 'rejected' ? (
              rejectedCreators.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8">No rejected creators.</td></tr>
              ) : (
                rejectedCreators.map(creator => (
                  <tr key={creator.id} className="border-b border-gray-700 hover:bg-gray-700/20 transition">
                    <td className="flex items-center gap-3 py-3">
                      {creator.avatarUrl ? (
                        <img src={creator.avatarUrl} alt={creator.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-lg">
                          {creator.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)}
                        </div>
                      )}
                      <span className="font-semibold">{creator.name}</span>
                    </td>
                    <td className="py-3">{creator.niche || '--'}</td>
                    <td className="py-3">
                      <div className="flex gap-3">
                        {creator.socials?.instagram ? (
                          <a href={creator.socials.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                            <FaInstagram className="text-pink-500 hover:text-pink-600 text-xl" />
                          </a>
                        ) : (
                          <FaInstagram className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="Instagram not provided" />
                        )}
                        {creator.socials?.youtube ? (
                          <a href={creator.socials.youtube} target="_blank" rel="noopener noreferrer" title="YouTube">
                            <FaYoutube className="text-red-500 hover:text-red-600 text-xl" />
                          </a>
                        ) : (
                          <FaYoutube className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="YouTube not provided" />
                        )}
                        {creator.socials?.linkedin ? (
                          <a href={creator.socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <FaLinkedin className="text-blue-600 hover:text-blue-700 text-xl" />
                          </a>
                        ) : (
                          <FaLinkedin className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="LinkedIn not provided" />
                        )}
                        {creator.email ? (
                          <a href={`mailto:${creator.email}`} title="Email">
                            <FaEnvelope className="text-green-500 hover:text-green-600 text-xl" />
                          </a>
                        ) : (
                          <FaEnvelope className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="Email not provided" />
                        )}
                      </div>
                    </td>
                    <td className="py-3">
                      {creator.tariff ? `₹${creator.tariff}` : '--'}
                    </td>
                    <td className="py-3">
                      <button
                        className={`bg-red-600 text-white px-4 py-2 rounded-lg font-semibold opacity-60 cursor-not-allowed`}
                        disabled
                      >
                        Rejected
                      </button>
                    </td>
                  </tr>
                ))
              )
            ) : activeTab === 'accepted' ? (
              acceptedCreators.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8">No accepted creators.</td></tr>
              ) : (
                acceptedCreators.map(creator => (
                  <tr key={creator.id} className="border-b border-gray-700 hover:bg-gray-700/20 transition">
                    <td className="flex items-center gap-3 py-3">
                      {creator.avatarUrl ? (
                        <img src={creator.avatarUrl} alt={creator.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-lg">
                          {creator.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)}
                        </div>
                      )}
                      <span className="font-semibold">{creator.name}</span>
                    </td>
                    <td className="py-3">{creator.niche || '--'}</td>
                    <td className="py-3">
                      <div className="flex gap-3">
                        {creator.socials?.instagram ? (
                          <a href={creator.socials.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                            <FaInstagram className="text-pink-500 hover:text-pink-600 text-xl" />
                          </a>
                        ) : (
                          <FaInstagram className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="Instagram not provided" />
                        )}
                        {creator.socials?.youtube ? (
                          <a href={creator.socials.youtube} target="_blank" rel="noopener noreferrer" title="YouTube">
                            <FaYoutube className="text-red-500 hover:text-red-600 text-xl" />
                          </a>
                        ) : (
                          <FaYoutube className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="YouTube not provided" />
                        )}
                        {creator.socials?.linkedin ? (
                          <a href={creator.socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <FaLinkedin className="text-blue-600 hover:text-blue-700 text-xl" />
                          </a>
                        ) : (
                          <FaLinkedin className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="LinkedIn not provided" />
                        )}
                        {creator.email ? (
                          <a href={`mailto:${creator.email}`} title="Email">
                            <FaEnvelope className="text-green-500 hover:text-green-600 text-xl" />
                          </a>
                        ) : (
                          <FaEnvelope className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="Email not provided" />
                        )}
                      </div>
                    </td>
                    <td className="py-3">
                      {creator.tariff ? `₹${creator.tariff}` : '--'}
                    </td>
                    <td className="py-3">
                      <button
                        className={`bg-green-600 text-white px-4 py-2 rounded-lg font-semibold opacity-60 cursor-not-allowed`}
                        disabled
                      >
                        Connected
                      </button>
                    </td>
                  </tr>
                ))
              )
            ) : activeTab === 'sent' ? (
              sentCreators.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8">No sent creators.</td></tr>
              ) : (
                sentCreators.map(creator => (
                  <tr key={creator.id} className="border-b border-gray-700 hover:bg-gray-700/20 transition">
                    <td className="flex items-center gap-3 py-3">
                      {creator.avatarUrl ? (
                        <img src={creator.avatarUrl} alt={creator.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-lg">
                          {creator.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)}
                        </div>
                      )}
                      <span className="font-semibold">{creator.name}</span>
                    </td>
                    <td className="py-3">{creator.niche || '--'}</td>
                    <td className="py-3">
                      <div className="flex gap-3">
                        {creator.socials?.instagram ? (
                          <a href={creator.socials.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                            <FaInstagram className="text-pink-500 hover:text-pink-600 text-xl" />
                          </a>
                        ) : (
                          <FaInstagram className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="Instagram not provided" />
                        )}
                        {creator.socials?.youtube ? (
                          <a href={creator.socials.youtube} target="_blank" rel="noopener noreferrer" title="YouTube">
                            <FaYoutube className="text-red-500 hover:text-red-600 text-xl" />
                          </a>
                        ) : (
                          <FaYoutube className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="YouTube not provided" />
                        )}
                        {creator.socials?.linkedin ? (
                          <a href={creator.socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <FaLinkedin className="text-blue-600 hover:text-blue-700 text-xl" />
                          </a>
                        ) : (
                          <FaLinkedin className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="LinkedIn not provided" />
                        )}
                        {creator.email ? (
                          <a href={`mailto:${creator.email}`} title="Email">
                            <FaEnvelope className="text-green-500 hover:text-green-600 text-xl" />
                          </a>
                        ) : (
                          <FaEnvelope className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="Email not provided" />
                        )}
                      </div>
                    </td>
                    <td className="py-3">
                      {creator.tariff ? `₹${creator.tariff}` : '--'}
                    </td>
                    <td className="py-3">
                      <button
                        className={`bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold opacity-60 cursor-not-allowed`}
                        disabled
                      >
                        Sent
                      </button>
                    </td>
                  </tr>
                ))
              )
            ) : currentCreators.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8">No creators found.</td></tr>
            ) : (
              currentCreators.map(creator => {
                // Determine button state
                const notif = creatorNotificationMap[creator.id];
                let buttonText = 'Connect';
                let buttonColor = 'bg-blue-500 hover:bg-blue-600';
                let buttonDisabled = false;
                if (notif) {
                  if (notif.status === 'accepted') {
                    buttonText = 'Connected';
                    buttonColor = 'bg-green-600';
                    buttonDisabled = true;
                  } else if (notif.status === 'rejected') {
                    buttonText = 'Rejected';
                    buttonColor = 'bg-red-600';
                    buttonDisabled = true;
                  } else if (notif.status === 'new' || notif.status === 'viewed') {
                    buttonText = 'Sent';
                    buttonColor = 'bg-gray-400';
                    buttonDisabled = true;
                  }
                }
                return (
                  <tr key={creator.id} className="border-b border-gray-700 hover:bg-gray-700/20 transition">
                    <td className="flex items-center gap-3 py-3">
                      {creator.avatarUrl ? (
                        <img src={creator.avatarUrl} alt={creator.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-lg">
                          {creator.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)}
                        </div>
                      )}
                      <span className="font-semibold">{creator.name}</span>
                    </td>
                    <td className="py-3">{creator.niche || '--'}</td>
                    <td className="py-3">
                      <div className="flex gap-3">
                        {creator.socials?.instagram ? (
                          <a href={creator.socials.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                            <FaInstagram className="text-pink-500 hover:text-pink-600 text-xl" />
                          </a>
                        ) : (
                          <FaInstagram className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="Instagram not provided" />
                        )}
                        {creator.socials?.youtube ? (
                          <a href={creator.socials.youtube} target="_blank" rel="noopener noreferrer" title="YouTube">
                            <FaYoutube className="text-red-500 hover:text-red-600 text-xl" />
                          </a>
                        ) : (
                          <FaYoutube className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="YouTube not provided" />
                        )}
                        {creator.socials?.linkedin ? (
                          <a href={creator.socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <FaLinkedin className="text-blue-600 hover:text-blue-700 text-xl" />
                          </a>
                        ) : (
                          <FaLinkedin className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="LinkedIn not provided" />
                        )}
                        {creator.email ? (
                          <a href={`mailto:${creator.email}`} title="Email">
                            <FaEnvelope className="text-green-500 hover:text-green-600 text-xl" />
                          </a>
                        ) : (
                          <FaEnvelope className="text-gray-400 text-xl cursor-not-allowed opacity-60" title="Email not provided" />
                        )}
                      </div>
                    </td>
                    <td className="py-3">
                      {creator.tariff ? `₹${creator.tariff}` : '--'}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => handleConnect(creator)}
                        className={`${buttonColor} text-white px-4 py-2 rounded-lg font-semibold transition-colors ${buttonDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                        disabled={buttonDisabled || sending}
                      >
                        {buttonText}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls (only for 'all' tab) */}
      {activeTab === 'all' && totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Connection Modal */}
      {showModal && selectedCreator && brandProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-white'} p-8 animate-fadeIn`}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl focus:outline-none"
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex items-center gap-4 mb-4">
              {selectedCreator.avatarUrl ? (
                <img src={selectedCreator.avatarUrl} alt={selectedCreator.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-xl">
                  {selectedCreator.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Connect with {selectedCreator.name}</h3>
                <span className="text-sm font-medium text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded">
                  {selectedCreator.niche || 'Creator'}
                </span>
              </div>
            </div>
            {/* Brand Info */}
            <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">Your Brand Info</div>
              <div className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-300">
                <span><b>Name:</b> {brandProfile.name}</span>
                <span><b>Industry:</b> {brandProfile.industry}</span>
                <span><b>Location:</b> {brandProfile.location}</span>
                <span><b>Website:</b> <a href={brandProfile.website} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{brandProfile.website}</a></span>
                <span><b>Business Size:</b> {brandProfile.businessSize}</span>
                <span><b>Years in Business:</b> {brandProfile.yearsInBusiness}</span>
                <span><b>Email:</b> <a href={`mailto:${brandProfile.email}`} className="text-blue-500 underline">{brandProfile.email}</a></span>
                <span className="flex gap-2 items-center"><b>Socials:</b>
                  {brandProfile.instagram && <a href={brandProfile.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500">Instagram</a>}
                  {brandProfile.linkedin && <a href={brandProfile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600">LinkedIn</a>}
                  {brandProfile.twitter && <a href={brandProfile.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400">Twitter</a>}
                </span>
              </div>
            </div>
            {/* Message Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a personalized message to introduce your brand and collaboration opportunity..."
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
                rows={4}
                maxLength={500}
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span>{message.length}/500 characters</span>
                {message.length < 20 && <span className="text-red-500">Minimum 20 characters</span>}
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                disabled={sending}
              >
                Cancel
              </button>
              <button
                onClick={handleSendNotification}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors text-white ${sending || message.length < 20 ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={sending || message.length < 20}
              >
                {sending ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TEMPORARY DEBUG BUTTON */}
      {showModal && (
        <button
          onClick={() => {
            console.log('DEBUG BUTTON: user:', user);
            console.log('DEBUG BUTTON: selectedCreator:', selectedCreator);
            console.log('DEBUG BUTTON: message:', message);
            console.log('DEBUG BUTTON: brandProfile:', brandProfile);
          }}
          className="fixed bottom-6 left-6 z-50 bg-yellow-400 text-black px-4 py-2 rounded shadow-lg"
        >
          DEBUG LOG DATA
        </button>
      )}

      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">{notification.message}</span>
            <button onClick={closeNotification} className="ml-2 text-xl hover:opacity-75">×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorsNetwork; 