import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/tmdb-api.js";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [input, setInput] = useState(query);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setSearchParams({ query: trimmed });
    setInput("");
  };

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await searchMovies(query);
        setMovies(data);
      } catch (error) {
        console.log("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search movies..."
      />
      <button type="submit">Search</button>
      {isLoading && <p>Loading...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </form>
  );
};

export default MoviesPage;
