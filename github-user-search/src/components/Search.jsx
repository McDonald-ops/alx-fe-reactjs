import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { fetchUserData } from '../services/githubService';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const navigate = useNavigate();

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
      // navigate to profile page
      navigate(`/user/${data.login}`);
    } catch {
      setError("Looks like we can’t find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
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

      {loading && <p className="text-center">Loading…</p>}

      {error && <p className="text-center text-red-600">{error}</p>}
    </div>
  );
}
