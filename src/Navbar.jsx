import { useState, useRef, useEffect } from "react";
import { useAuth } from "./auth";
import { Link } from "react-router-dom";

function Navbar({ headline = "ChessChallenge" }) {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <h1>{headline}</h1>

      <div className="nav-left-section">
        <Link to="/" className="nav-link-button">Home</Link>
        <Link to="/submit" className="nav-link-button">Submit your Puzzle</Link>

        <div className="dropdown" ref={dropdownRef}>
          <button className="nav-account-button" onClick={() => setIsOpen(!isOpen)}>
            <img className="nav-account-icon" src="/icon.png" alt="account icon" />
          </button>

          {isOpen && (
            <div className="dropdown-menu">
              <button>Profile</button>
              <button>Settings</button>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
