import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import s from "./Navigation.module.css";

function Navigation() {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;
