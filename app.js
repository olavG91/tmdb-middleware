require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const { searchMovies, getTopRatedMovies, getPopularMovies } = require('./tmdb');

app.get('/search', async (req, res) => {
    const { query, limit } = req.query;

    if (!query || !limit) {
        return res.status(400).json({ error: 'Query and limit are required' });
    }

    if (limit < 1 || limit > 10) {
        return res.status(400).json({ error: 'Limit must be between 1 and 10' });
    }

    if (isNaN(parseInt(limit))) {
        return res.status(400).json({ error: 'Limit must be a number' });
    }

    const movies = await searchMovies(query, parseInt(limit));
    res.json(movies);
});

app.get('/merge', async (req, res) => {
    const topRatedMovies = await getTopRatedMovies();
    const popularMovies = await getPopularMovies();
    const mergedMovies = [...topRatedMovies, ...popularMovies];
    mergedMovies.sort((a, b) => a.title.localeCompare(b.title));
    res.json(mergedMovies);
});

module.exports = app;