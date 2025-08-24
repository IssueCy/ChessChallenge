import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "./auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

function Settings() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const clearSolvedPuzzles = async () => {
        if (!user) return;

        try {
            const ref = doc(db, "users", user.uid);

            await updateDoc(ref, {
                progress: []
            });

            Swal.fire(
                "Success",
                "Your solved puzzles have been reset!",
                "success"
            ).then((result) => {
                if (result.isConfirmed) {
                    navigate("/");
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error("Error clearing solved puzzles:", error);
            Swal.fire(
                "Error",
                "Could not reset solved puzzles. Please try again.",
                "error"
            );
        }
    }


    return (
        <div className="wrapper">
            <Navbar headline="Settings" />
            <div className="content">
                <br /><br />
                <div className="settings-content-container">
                    <div className="util-settings-container">
                        <label>Solved all puzzles and want to start over again?</label>
                        <button className="custom-button" onClick={clearSolvedPuzzles} style={{ background: "rgba(122, 76, 213, 0.75)", color: "white" }}>🚮 Clear saved puzzles</button>
                    </div>
                    <Link to="/account">
                        <button style={{ background: "rgba(216, 191, 212, 0.67)" }}>↪ Manage Account</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Settings;