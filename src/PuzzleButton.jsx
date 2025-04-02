function PuzzleButton({ type = "", imageURL = "", onClick }) {
    return (
        <div className="mainSection-button-container" style={{ backgroundImage: `url(${imageURL})`}} onClick={onClick} >
            <h2>{type}</h2>
        </div>
    );
}

export default PuzzleButton;
