import Navbar from "./Navbar";
import ChessPuzzle from "./ChessPuzzle";
import Footer from "./Footer";

function PuzzlePage() {
    return (
        <div>
            <Navbar />
            <div className="puzzle-container">
                <ChessPuzzle />
            </div>
            <Footer />
        </div>
    );
}

export default PuzzlePage;
