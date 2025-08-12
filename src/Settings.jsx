import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Settings() {
    const navigate = useNavigate();

    function clearSolvedPuzzles() {
        localStorage.removeItem("solvedPuzzles");
        Swal.fire(
            'Succes',
            'Successfully deleted solved puzzles!',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                navigate('/');
            }
        });

    }

    function clearLocalStorage() {
        if (confirm("Note: If you clear your localstorage, your saved puzzles will be deleted too.")) {
            localStorage.clear();
            Swal.fire (
                'Succes',
                'Succesfully deleted local storage!',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                    window.location.reload();
                }
            });
        }
    }

    return (
        <div className="wrapper">
            <Navbar headline="Settings"/>
            <div className="content">
                <br /><br />
                <div className="settings-content-container">
                    <p>Solved all puzzles and want to start over again?</p>
                    <br />
                    <button className="custom-button" onClick={clearSolvedPuzzles} style={{background: "rgba(122, 76, 213, 0.75)", color: "white"} }>🚮 Clear saved puzzles</button>
                    <br />
                    <br />
                    <label style={{fontSize: "0.8rem", margin: "12px"}} htmlFor="clearLS">If you encounter problems with puzzles having a messed up solution or things not behaving as usual, consider clearing your localstorage for this site:</label>
                    <button id="clearLS" className="custom-button" onClick={clearLocalStorage}>Clear localstorage</button>
                    <br /><br />
                    <Link to="/account">
                        <button style={{background: "rgba(216, 191, 212, 0.67)"}}>↪ Manage Account</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Settings;