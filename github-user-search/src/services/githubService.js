import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    // Omit this header if you don’t need authentication
    Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
  }
});

/**
 * Fetch a single GitHub user’s profile by username.
 * @param {string} username
 * @returns {Promise<object>}
 */
export function fetchUserData(username) {
  return API
    .get(`/users/${username}`)
    .then(res => res.data);
}

/**
 * Search GitHub users by multiple criteria.
 * @param {{ username?: string, location?: string, minRepos?: string }} criteria
 * @param {number} page
 * @returns {Promise<{ items: object[], total: number }>}
 */
export function searchUsers(criteria, page = 1) {
  const q = [
    criteria.username && criteria.username,
    criteria.location && `location:${criteria.location}`,
    criteria.minRepos && `repos:>=${criteria.minRepos}`
  ]
    .filter(Boolean)
    .join('+');

  return API
    .get('/search/users', {
      params: { q, per_page: 30, page }
    })
    .then(res => ({
      items: res.data.items,
      total: res.data.total_count
    }));
}
