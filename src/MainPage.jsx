import Navbar from "./Navbar";
import SelectTypeSection from "./SelectTypeSection";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./auth";

function MainPage() {
    const { user } = useAuth();
    const [solvedCount, setSolvedCount] = useState(null);

    useEffect(() => {
        async function fetchSolvedPuzzles() {
            if (!user) {
                setSolvedCount(0);
                return;
            }

            try {
                const ref = doc(db, "users", user.uid);
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    const progress = snap.data().progress || [];
                    setSolvedCount(progress.length);
                } else {
                    setSolvedCount(0);
                }
            } catch (err) {
                console.error("Error fetching solved puzzles from Firestore:", err);
                setSolvedCount(0);
            }
        }

        fetchSolvedPuzzles();
    }, [user]);

    let message = "Loading your solved puzzles...";

    if (solvedCount !== null) {
        message =
            solvedCount > 0 ? (
                <>
                    You have solved a total of{" "}
                    <span className="solvedPuzzlesAmount">{solvedCount}</span> puzzles!
                </>
            ) : (
                "You have not solved any puzzles yet."
            );
    }

    return (
        <div className="wrapper gradient">
            <Navbar />
            <div className="content">
                <div className="main-upperSection">
                    <h1>Hello there!</h1>
                    <p>{message}</p>
                </div>
                <SelectTypeSection />
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;