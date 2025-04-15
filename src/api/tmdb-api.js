import axios from "axios";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmJiNjQ3ZmI1Yzg3MmM0NDI3YmFlNDI4OGQ0MjZmNyIsIm5iZiI6MTc0NDczMjg3My43NzUsInN1YiI6IjY3ZmU4MmM5ZGU1ZTRkZWM2MmFlODQyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.et1qoLcJ4zUXYfKuuLAyrqkymN3Om3Tn1zdnXOYXP6g";
const BASE_URL = "https://api.themoviedb.org/3";
const options = {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};
export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data.results;
};
export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&language=en-US&page=1&include_adult=false`,
    options
  );
  return response.data.results;
};
export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return response.data;
};
export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits`,
    options
  );
  return response.data.cast;
};
export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews`,
    options
  );
  return response.data.results;
};
