import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUserData } from '../services/githubService';
import { FaBook, FaUsers } from 'react-icons/fa';

export default function UserCard() {
  const { profile } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchUserData(profile)
      .then(data => setUserData(data))
      .catch(() => setError("Looks like we can’t find that user"))
      .finally(() => setLoading(false));
  }, [profile]);

  if (loading) {
    return <p className="text-center mt-8">Loading…</p>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 text-center text-red-600">
        <p>{error}</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 underline">
          Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow bg-white">
      <img
        src={userData.avatar_url}
        alt={userData.login}
        className="w-24 h-24 rounded-full mx-auto"
      />

      <h2 className="text-2xl font-semibold mt-4 text-center">
        {userData.name || userData.login}
      </h2>
      <p className="text-center text-gray-600">@{userData.login}</p>

      {userData.bio && (
        <p className="mt-4 text-center text-gray-800">{userData.bio}</p>
      )}

      <div className="flex justify-center space-x-6 mt-6 text-gray-700">
        <div className="flex items-center space-x-1">
          <FaBook />
          <span>{userData.public_repos} repos</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaUsers />
          <span>{userData.followers} followers</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <a
          href={userData.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline mr-4"
        >
          View on GitHub
        </a>
        <Link to="/" className="text-gray-600 hover:underline">
          ← Search again
        </Link>
      </div>
    </div>
  );
}
