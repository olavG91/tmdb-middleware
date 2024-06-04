const request = require('supertest');
const app = require('../app');

jest.mock('../tmdb', () => ({
  searchMovies: jest.fn(),
  getTopRatedMovies: jest.fn(),
  getPopularMovies: jest.fn(),
}));

const { searchMovies, getTopRatedMovies, getPopularMovies } = require('../tmdb');

describe('GET /search', () => {
  it('should return 400 if query or limit is missing', async () => {
    const response = await request(app).get('/search').query({ query: 'Batman' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Query and limit are required');
  });

  it('should return 400 if limit is out of range', async () => {
    const response = await request(app).get('/search').query({ query: 'Batman', limit: 20 });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Limit must be between 1 and 10');
  });

  it('should return 400 if limit is not a number', async () => {
    const response = await request(app).get('/search').query({ query: 'Batman', limit: 'abc' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Limit must be a number');
  });

  it('should return movies if query and limit are valid', async () => {
    searchMovies.mockResolvedValue([{ title: 'Batman Begins' }, { title: 'The Dark Knight' }]);
    const response = await request(app).get('/search').query({ query: 'Batman', limit: 2 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ title: 'Batman Begins' }, { title: 'The Dark Knight' }]);
    expect(searchMovies).toHaveBeenCalledTimes(1);
  });
});

describe('GET /merge', () => {
  it('should return merged and sorted list of top-rated and popular movies', async () => {
    getTopRatedMovies.mockResolvedValue([
      { title: 'The Shawshank Redemption' },
      { title: 'The Godfather' },
    ]);
    getPopularMovies.mockResolvedValue([
      { title: 'Avengers: Endgame' },
      { title: 'Inception' },
    ]);

    const response = await request(app).get('/merge');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4);
    expect(response.body).toEqual([
      { title: 'Avengers: Endgame' },
      { title: 'Inception' },
      { title: 'The Godfather' },
      { title: 'The Shawshank Redemption' },
    ]);

    expect(getTopRatedMovies).toHaveBeenCalledTimes(1);
    expect(getPopularMovies).toHaveBeenCalledTimes(1);
  });
});
