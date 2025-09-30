import { useState, useEffect } from 'react';
import { Search as SearchIcon, Github, MapPin, Code, X, User, ExternalLink, Loader, Users } from "lucide-react";
import { fetchUserData } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset error message when inputs change
  useEffect(() => {
    setError('');
  }, [username, location, minRepos]);

  const handleClear = () => {
    setUsername('');
    setLocation('');
    setMinRepos('');
    setSearchResults([]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }
    
    // Validate minRepos if provided
    if (minRepos && (isNaN(minRepos) || parseInt(minRepos) < 0)) {
      setError('Minimum repositories must be a positive number');
      return;
    }
    
    // Clear previous results and error
    setSearchResults([]);
    setError('');
    setIsLoading(true);

    try {
      // Convert minRepos to a number if provided
      const minReposNumber = minRepos ? parseInt(minRepos) : undefined;
      const results = await fetchUserData({ username, location, minRepos: minReposNumber });
      setSearchResults(results);
      
      // If no results found, show message
      if (results.length === 0) {
        setError('No users found matching your criteria');
      }
    } catch (err) {
      setError('Error fetching data: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold light-text-primary dark:text-white mb-4">
            <Github className="inline-block mr-2 mb-1" size={40} />
            GitHub User Search
          </h1>
          <p className="text-lg light-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
            Find and connect with talented developers across the globe. Filter by username, location, and repository count.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Username"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon={<User size={20} />}
                required
              />
              
              <FormInput
                label="Location"
                placeholder="Filter by location (optional)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                icon={<MapPin size={20} />}
              />
            </div>

            <FormInput
              label="Minimum Repositories"
              placeholder="Minimum number of repositories (optional)"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              icon={<Code size={20} />}
              type="number"
              min="0"
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                disabled={isLoading}
              >
                {isLoading ? (
                  <><Loader className="animate-spin" size={20} /> Searching...</>
                ) : (
                  <><SearchIcon size={20} /> Search Users</>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleClear}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <X size={20} /> Clear
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 p-4 rounded-lg mb-8 animate-fadeIn">
            <div className="flex items-start gap-3">
              <X size={24} className="mt-0.5 flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Search Results ({searchResults.length})
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {searchResults.length} users
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {searchResults.length === 0 && !isLoading && !error && username && (
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-8 rounded-lg text-center animate-fadeIn">
            <SearchIcon size={60} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2 light-text-primary dark:text-gray-300">No Results Yet</h3>
            <p className="max-w-md mx-auto light-text-secondary dark:text-gray-300">
              Enter a username and click search to find GitHub users matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Form Input Component
function FormInput({ label, placeholder, value, onChange, icon, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium light-text-secondary dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">{icon}</span>
        </div>
        <input
          type={type}
          min={type === "number" ? 0 : undefined}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  );
}

// User Stat Component
function UserStat({ value, label, icon }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-1">
        {icon} <span className="font-bold light-text-primary dark:text-white ml-1">{value}</span>
      </div>
      <span className="text-xs light-text-muted dark:text-gray-400">{label}</span>
    </div>
  );
}

// User Card Component
function UserCard({ user }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700 animate-fadeIn">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700"
          />
          
          <div className="flex-grow">
            <h3 className="text-lg font-bold light-text-primary dark:text-white mb-1">{user.login}</h3>
            {user.name && (
              <p className="text-sm light-text-secondary dark:text-gray-300 mb-2">{user.name}</p>
            )}
            
            {user.location && (
              <div className="flex items-center text-sm light-text-muted dark:text-gray-400 mb-3">
                <MapPin size={14} className="mr-1" /> {user.location}
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <UserStat value={user.public_repos || 0} label="Repos" icon={<Code size={14} />} />
              <UserStat value={user.followers || 0} label="Followers" icon={<Users size={14} />} />
              <UserStat value={user.following || 0} label="Following" icon={<User size={14} />} />
            </div>
            
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              View Profile <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
