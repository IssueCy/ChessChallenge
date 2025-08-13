import Navbar from "./Navbar";
import ChessPuzzle from "./ChessPuzzle";
import Footer from "./Footer";

function PuzzlePage() {
    return (
        <div className="wrapper">
            <Navbar />
            <div className="content">
                <ChessPuzzle />
            </div>
        </div>
    );
}

export default PuzzlePage;
