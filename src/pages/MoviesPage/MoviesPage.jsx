import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { searchMovies } from "../../api/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setInput("");
  }, [query]);

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
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <section>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search movies..."
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} location={location} />}
    </section>
  );
};

export default MoviesPage;
