import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/tmdb-api";

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
      } catch (error) {
        setError(error.message || "Failed to load reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <p>Loading reviews...</p>}
      {error && <p>{error}</p>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p>
                <strong>{author}</strong>
              </p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No reviews found.</p>
      )}
    </div>
  );
}

export default MovieReviews;
