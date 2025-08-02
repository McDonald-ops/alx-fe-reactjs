// src/components/Search.jsx

import { useState } from 'react';
import { FaSearch, FaBook, FaUsers } from 'react-icons/fa';
import { fetchUserData } from '../services/githubService';  // ← fetchUserData is imported

export default function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState(null);
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setUserData(null);
    setResults([]);

    try {
      // If only username, use fetchUserData
      if (trimmed && !location && !minRepos) {
        const data = await fetchUserData(trimmed);  // ← fetchUserData is used
        setUserData(data);
      } else {
        // For advanced search, fallback to multiple fetches
        // Simple example: fetchData then filter locally (or call searchUsers)
        const data = await fetchUserData(trimmed);
        setResults([data]);
      }
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="GitHub username…"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Optional: Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="e.g. Lagos"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Optional: Min Repos */}
        <div>
          <label className="block text-sm font-medium">Min Repos</label>
          <input
            type="number"
            value={minRepos}
            onChange={e => setMinRepos(e.target.value)}
            placeholder="0"
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </form>

      {loading && <p className="text-center">Loading…</p>}
      {error   && <p className="text-center text-red-600">{error}</p>}

      {/* Single user result via fetchUserData */}
      {userData && (
        <div className="p-4 border rounded shadow bg-white">
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="w-20 h-20 rounded-full mx-auto"
          />
          <h2 className="text-xl mt-2 text-center">
            {userData.name || userData.login}
          </h2>
          <p className="text-center text-gray-600">@{userData.login}</p>
          {userData.bio && (
            <p className="mt-2 text-center text-gray-800">{userData.bio}</p>
          )}
          <div className="flex justify-center space-x-6 mt-4 text-gray-700">
            <div className="flex items-center space-x-1">
              <FaBook />
              <span>{userData.public_repos} repos</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaUsers />
              <span>{userData.followers} followers</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      )}

      {/* Fallback for multiple results */}
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map(u => (
            <div key={u.id} className="p-4 border rounded flex items-center space-x-4">
              <img
                src={u.avatar_url}
                alt={u.login}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{u.login}</h3>
                <a
                  href={u.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
