// MovieList.jsx
import { Link } from "react-router-dom";
import s from "./MovieList.module.css";

function MovieList({ movies, location }) {
  return (
    <ul className={s.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.item}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              className={s.poster}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
