require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.TMDB_API_KEY;
const baseUrl = process.env.TMDB_API_URL;

const searchMovies = async (query, limit) => {
  try {
    const response = await axios.get(`${baseUrl}/search/movie`, {
      params: {
        api_key: apiKey,
        query
      }
    });
    return { success: true, data: response.data.results.slice(0, limit) };
  } catch (error) {
    return { success: false, error: 'Failed to fetch search results from TMDB' };
  }
};

const getTopRatedMovies = async () => {
  try {
    const response = await axios.get(`${baseUrl}/movie/top_rated`, {
      params: {
        api_key: apiKey
      }
    });
    return { success: true, data: response.data.results.slice(0, 10) };
  } catch (error) {
    return { success: false, error: 'Failed to fetch top-rated movies from TMDB' };
  }
};

const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${baseUrl}/movie/popular`, {
      params: {
        api_key: apiKey
      }
    });
    return { success: true, data: response.data.results.slice(0, 10) };
  } catch (error) {
    return { success: false, error: 'Failed to fetch popular movies from TMDB' };
  }
};

module.exports = { searchMovies, getTopRatedMovies, getPopularMovies };
