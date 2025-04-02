import PuzzleButton from "./PuzzleButton";

function SelectTypeSection() {
    return(
        <div className="mainPage-SelectPuzzle-section">
            <PuzzleButton type="Mate in 1" imageURL="Mi1.png"  onClick={() => console.log("Mate in 1 Puzzle anzeigen")} />
            <PuzzleButton type="Mate in 2" imageURL="Mi2.jpg"  onClick={() => console.log("Mate in 2 Puzzle anzeigen")} />
            <PuzzleButton type="Win material" imageURL="MatWin.jpg"  onClick={() => console.log("Material win Puzzle anzeigen")} />

        </div>
    );
}

export default SelectTypeSection;