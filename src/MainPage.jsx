import Navbar from "./Navbar";
import SelectTypeSection from "./SelectTypeSection";
import Footer from "./Footer";

function MainPage() {

    let message = "You have not solved any puzzles yet.";

    const solvedPuzzlesRaw = localStorage.getItem("solvedPuzzles");
    if (solvedPuzzlesRaw) {
        try {
            const solvedPuzzles = JSON.parse(solvedPuzzlesRaw);
            const solvedPuzzleAmount = solvedPuzzles.length;
            message =
                solvedPuzzleAmount > 0 ? (
                    <>
                        You have solved a total of{" "}
                        <span className="solvedPuzzlesAmount">{solvedPuzzleAmount}</span> puzzles!
                    </>
                ) : (
                    "You have not solved any puzzles yet."
                );
        } catch (err) {
            console.error("Error parsing solvedPuzzles from localstorage: ", err);
        }
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