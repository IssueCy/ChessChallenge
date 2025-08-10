import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import fireContactForm from "./FireContactForm";

function Footer() {

  return (
    <>
      <div className="footer">
        <div className="side-section">
          <img className="footer-icon" src="/icon.png" alt="icon" />
          <p>© {new Date().getFullYear()} ChessChallenge</p>
        </div>

        <div className="side-section">
          <Link to="/privacy">Privacy</Link>
          <button style={{boxShadow: "none"}} onClick={fireContactForm} className="button-as-link">Contact</button>
        </div>
      </div>
    </>
  );
}

export default Footer;
