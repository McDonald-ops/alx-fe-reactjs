import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { searchUsers } from '../services/githubService';

export default function Search() {
  const [criteria, setCriteria] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  const [results, setResults] = useState([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
  };

  const fetchPage = async pageNum => {
    setLoading(true);
    setError(null);
    try {
      const { items, total } = await searchUsers(criteria, pageNum);
      setResults(items);
      setTotal(total);
      setPage(pageNum);
    } catch {
      setError("Looks like we cant find any users");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetchPage(1);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Advanced Search Form */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-4 mb-6"
      >
        <input
          type="text"
          name="username"
          value={criteria.username}
          onChange={handleChange}
          placeholder="Username"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          value={criteria.location}
          onChange={handleChange}
          placeholder="Location"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="minRepos"
          value={criteria.minRepos}
          onChange={handleChange}
          placeholder="Min repos"
          min="0"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </form>

      {/* Loading & Error */}
      {loading && <p className="text-center">Loading…</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Results List */}
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map(u => (
            <div
              key={u.id}
              className="p-4 border rounded flex items-center space-x-4"
            >
              <img
                src={u.avatar_url}
                alt={u.login}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{u.login}</h3>
                {u.type && (
                  <p className="text-sm text-gray-600">{u.type}</p>
                )}
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

          {/* Pagination Controls */}
          {total > results.length && (
            <div className="flex justify-center space-x-2">
              <button
                disabled={page === 1}
                onClick={() => fetchPage(page - 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={page * 30 >= total}
                onClick={() => fetchPage(page + 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
