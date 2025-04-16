import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/tmdb-api";
import s from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError(err.message || "Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [movieId]);

  return (
    <div className={s.container}>
      {isLoading && <p>Loading reviews...</p>}
      {error && <p>{error}</p>}
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={s.review}>
              <h4 className={s.author}>{author}</h4>
              <p className={s.text}>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No reviews available.</p>
      )}
    </div>
  );
}

export default MovieReviews;
