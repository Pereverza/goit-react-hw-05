import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchMovieDetails } from "../../api/tmdb-api.js";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  // Зберігаємо "звідки прийшли"
  const goBackRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const getDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message || "Failed to load movie details.");
      } finally {
        setIsLoading(false);
      }
    };

    getDetails();
  }, [movieId]);

  return (
    <section>
      <Link to={goBackRef.current}>Go Back</Link>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {movie && (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>Rating: {movie.vote_average}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={250}
          />
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Additional Information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: goBackRef.current }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: goBackRef.current }}>
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </section>
  );
}

export default MovieDetailsPage;
