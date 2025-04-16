import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../api/tmdb-api.js";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const goBackLink = location?.state?.from || location?.state || "/movies";

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
    <section className={s.container}>
      <Link to={goBackLink} className={s.goBack}>
        Go Back
      </Link>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {movie && (
        <div className={s.details}>
          <img
            className={s.poster}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={250}
          />
          <div>
            <h1 className={s.title}>{movie.title}</h1>
            <p className={s.overview}>{movie.overview}</p>
            <p className={s.rating}>Rating: {movie.vote_average}</p>
          </div>
        </div>
      )}
      <div className={s.additional}>
        <h3>Additional Information</h3>
        <ul>
          <li>
            <Link
              to="cast"
              state={{ from: goBackLink }}
              className={s.goBackBtn}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              state={{ from: goBackLink }}
              className={s.goBackBtn}
            >
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
