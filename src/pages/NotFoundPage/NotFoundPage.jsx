import { Link } from "react-router-dom";
import errorImage from "../../assets/404-error.jpg";

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <img
        src={errorImage}
        alt="404 error - Page not found"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
