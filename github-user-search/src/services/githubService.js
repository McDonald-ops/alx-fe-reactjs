import axios from 'axios';

export async function fetchUserData({ username, location, minRepos }) {
  try {
    let queryParts = [];

    if (username) queryParts.push(`${username} in:login`);
    if (location) queryParts.push(`location:${location}`);
    if (minRepos) queryParts.push(`repos:>=${minRepos}`);

    const query = queryParts.join(" ");
    const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`;

    const response = await axios.get(url);
    
    // Check rate limits
    if (response.headers['x-ratelimit-remaining'] === '0') {
      const resetTime = new Date(parseInt(response.headers['x-ratelimit-reset']) * 1000);
      throw new Error(`GitHub API rate limit exceeded. Please try again after ${resetTime.toLocaleTimeString()}`);
    }

    // GitHub Search API returns limited user data, so we fetch full details
    const detailedUsers = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const userDetails = await axios.get(user.url);
          return userDetails.data;
        } catch (error) {
          console.error(`Error fetching details for user ${user.login}:`, error);
          // Return basic user info if detailed fetch fails
          return user;
        }
      })
    );

    return detailedUsers;
  } catch (error) {
    if (error.response?.status === 422) {
      throw new Error('Invalid search parameters. Please check your input and try again.');
    } else if (error.response?.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please wait a few minutes and try again.');
    } else if (error.response?.status === 404) {
      throw new Error('No users found matching your criteria.');
    } else {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }
}
