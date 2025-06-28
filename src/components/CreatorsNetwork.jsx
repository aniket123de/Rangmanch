import React, { useEffect, useState } from 'react';
import { getAllCreators } from '../firebase/firestore';
import { useTheme } from '../contexts/ThemeContext';

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
              <th className="py-2 text-left">AUDIENCE</th>
              <th className="py-2 text-left">STATUS</th>
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
                    <img src={creator.profileImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(creator.name)} alt={creator.name} className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-semibold">{creator.name}</span>
                  </td>
                  <td>{creator.niche}</td>
                  <td>{creator.audience || '--'}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[creator.status] || 'bg-gray-600 text-gray-100'}`}>
                      {creator.status || 'Available'}
                    </span>
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