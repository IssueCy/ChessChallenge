import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Settings() {

    function clearSolvedPuzzles() {
        localStorage.removeItem("solvedPuzzles");
    }

    return (
        <div className="wrapper">
            <Navbar headline="Settings"/>
            <div className="content">
                <div className="settings-content-container">
                    <p>Solved all puzzles and want to start over again?</p>
                    <br />
                    <button onClick={clearSolvedPuzzles} className="custom-button">Clear saved puzzles</button>
                    <br />
                    <br />
                    <br />
                    <Link to="/account">
                        <button>Manage Account</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Settings;