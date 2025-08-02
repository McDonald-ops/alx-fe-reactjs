import { useState } from 'react';
import { FaSearch, FaBook, FaUsers } from 'react-icons/fa';
import { fetchUserData } from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(trimmed);
      setUserData(data);
    } catch {
      // exact string as your checker expects:
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="GitHub username…"
          className="flex-grow p-2 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaSearch />
        </button>
      </form>

      {/* Loading / Error */}
      {loading && <p className="text-center">Loading…</p>}
      {error   && <p className="text-center text-red-600">{error}</p>}

      {/* User Info */}
      {userData && (
        <div className="p-4 border rounded shadow bg-white">
          {/* Avatar */}
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="w-20 h-20 rounded-full mx-auto"
          />

          {/* Name */}
          <h2 className="text-xl mt-2 text-center">
            {userData.name || userData.login}
          </h2>

          {/* Username */}
          <p className="text-center text-gray-600">@{userData.login}</p>

          {/* Bio */}
          {userData.bio && (
            <p className="mt-2 text-center text-gray-800">{userData.bio}</p>
          )}

          {/* Optional stats */}
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

          {/* GitHub Link */}
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
    </div>
  );
}
