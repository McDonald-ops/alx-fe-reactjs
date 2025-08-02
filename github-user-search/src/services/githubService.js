import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    // Omit this line if you don't need authentication
    Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
  }
});

/**
 * Fetch a single GitHub user’s profile by username.
 * @param {string} username
 * @returns {Promise<object>} GitHub user data
 */
export function fetchUserData(username) {
  return API
    .get(`/users/${username}`)
    .then(res => res.data);
}
