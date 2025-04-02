function PuzzleButton({ type = "", imageURL = "" }) {
    return (
        <div className="mainSection-button-container" style={{ backgroundImage: `url(${imageURL})` }}>
            <h2>{type}</h2>
        </div>
    );
}

export default PuzzleButton;
