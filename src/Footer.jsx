import { Link } from "react-router-dom";

function Footer() {
    return(
        <>
            <br />
            <br />

            <div className="footer">
                <div className="side-section">
                    <img className="footer-icon" src="/icon.png" alt="icon" />
                    <p>© 2025 - {new Date().getFullYear()} ChessChallenge</p>
                </div>

                <div className="side-section">
                    <Link to="/privacy">Privacy</Link>
                    <button className="button-as-link">Contact</button> {/* SWEETALERT POPUP HERE */}
                </div>
            </div>
        </>
    );
}

export default Footer;