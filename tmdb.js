require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.TMDB_API_KEY;
const baseUrl = process.env.TMDB_API_URL;

const searchMovies = async (query, limit) => {
  const response = await axios.get(`${baseUrl}/search/movie`, {
    params: {
      api_key: apiKey,
      query,
      page: 1
    }
  });
  return response.data.results.slice(0, limit);
};

const getTopRatedMovies = async () => {
  const response = await axios.get(`${baseUrl}/movie/top_rated`, {
    params: {
      api_key: apiKey
    }
  });
  return response.data.results.slice(0, 10);
};

const getPopularMovies = async () => {
  const response = await axios.get(`${baseUrl}/movie/popular`, {
    params: {
      api_key: apiKey
    }
  });
  return response.data.results.slice(0, 10);
};

module.exports = { searchMovies, getTopRatedMovies, getPopularMovies };
