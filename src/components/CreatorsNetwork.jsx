import React, { useEffect, useState } from 'react';
import { getAllCreators } from '../firebase/firestore';
import { useTheme } from '../contexts/ThemeContext';
import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const statusColors = {
  Engaged: 'bg-purple-700 text-purple-100',
  Pending: 'bg-yellow-700 text-yellow-100',
  Available: 'bg-green-700 text-green-100',
};

const CreatorsNetwork = () => {
  const { isDark } = useTheme();
  const [creators, setCreators] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      try {
        const data = await getAllCreators();
        setCreators(data);
      } catch (err) {
        // handle error
      }
      setLoading(false);
    };
    fetchCreators();
  }, []);

  const filteredCreators = creators.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

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
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold">+ Find Creators</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 text-left">CREATOR</th>
              <th className="py-2 text-left">NICHE</th>
              <th className="py-2 text-left">SOCIAL LINKS</th>
              <th className="py-2 text-left">TARIFF</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="text-center py-8">Loading...</td></tr>
            ) : filteredCreators.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-8">No creators found.</td></tr>
            ) : (
              filteredCreators.map(creator => (
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
                    </div>
                  </td>
                  <td className="py-3">
                    {creator.tariff ? `₹${creator.tariff}` : '--'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatorsNetwork; 