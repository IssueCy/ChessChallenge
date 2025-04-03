import { useNavigate } from "react-router-dom";
import PuzzleButton from "./PuzzleButton";

function SelectTypeSection() {
    const navigate = useNavigate();

    return (
        <div className="mainPage-SelectPuzzle-section">
            <PuzzleButton type="Mate in 1" imageURL="Mi1.png" onClick={() => navigate("/puzzle/mi1")} />
            <PuzzleButton type="Mate in 2" imageURL="Mi2.jpg" onClick={() => navigate("/puzzle/mi2")} />
            <PuzzleButton type="Win material" imageURL="MatWin.jpg" onClick={() => navigate("/puzzle/matwin")} />
        </div>
    );
}

export default SelectTypeSection;
