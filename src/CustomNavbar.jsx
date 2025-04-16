import { Link } from "react-router-dom";

function CustomNavbar({ headline = "ChessChallenge" }) {
  return (
    <div className="navbar">
      <h1>{headline}</h1>

      <div className="nav-right-section">
        <Link to="/" className="nav-link-button">Back</Link>
      </div>
    </div>
  );
}

export default CustomNavbar;
