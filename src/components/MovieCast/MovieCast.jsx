import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/tmdb-api";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCast = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (err) {
        setError(err.message || "Failed to load cast.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <p>Loading cast...</p>}
      {error && <p>{error}</p>}
      {cast.length > 0 ? (
        <ul>
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={name}
                width={100}
              />
              <p>
                <strong>{name}</strong>
              </p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No cast info available.</p>
      )}
    </div>
  );
}

export default MovieCast;
