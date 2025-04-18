import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/tmdb-api.js";
import MovieList from "../../components/MovieList/MovieList";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import s from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const loadTrending = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadTrending();
  }, []);

  return (
    <section>
      <div className="container">
        {isLoading && <Loader />}
        {!isLoading && !error && movies.length === 0 && (
          <p>No trending movies</p>
        )}
        <h2 className={s.title}>Trending today</h2>
        <MovieList movies={movies} location={location} />
      </div>
    </section>
  );
}

export default HomePage;
