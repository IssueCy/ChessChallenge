import PuzzleButton from "./PuzzleButton";

function SelectTypeSection() {
    return(
        <div className="mainPage-SelectPuzzle-section">
            <PuzzleButton type="Mate in 1" imageURL="Mi1.png"/>
            <PuzzleButton type="Mate in 2" imageURL="Mi2.jpg"/>
            <PuzzleButton type="Win material" imageURL="MatWin.jpg" />

        </div>
    );
}

export default SelectTypeSection;