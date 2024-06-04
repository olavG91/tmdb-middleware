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

    const result = await searchMovies(query, parseInt(limit));
    if (result.success) {
        res.json(result.data);
    } else {
        res.status(500).json({ error: result.error });
    }
});

app.get('/merge', async (req, res) => {
    const topRatedResult = await getTopRatedMovies();
    const popularResult = await getPopularMovies();

    if (topRatedResult.success && popularResult.success) {
        const mergedMovies = [...topRatedResult.data, ...popularResult.data];
        mergedMovies.sort((a, b) => a.title.localeCompare(b.title));
        res.json(mergedMovies);
    } else {
        res.status(500).json({ error: 'Failed to fetch movies from TMDB' });
    }
});

module.exports = app;
