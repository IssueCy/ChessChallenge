import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

function ChessPuzzle() {
    const [game, setGame] = useState(new Chess());
    const [puzzle, setPuzzle] = useState(null);

    // Lädt zufälliges Puzzle aus puzzles.json
    const loadRandomPuzzle = async () => {
        try {
            const response = await fetch("../../puzzles.json");
            const puzzles = await response.json(); //! error is here
            const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
            setPuzzle(randomPuzzle);
            setGame(new Chess(randomPuzzle.fen));
        } catch (error) {
            console.error("Fehler beim Laden der Puzzles:", error);
        }
    };

    return (
        <div>
            <button onClick={loadRandomPuzzle}>Neues Puzzle laden</button>

            {puzzle && (
                <div>
                    <p><strong>Hinweis:</strong> {puzzle.hint}</p>
                    <Chessboard position={game.fen()} />
                </div>
            )}
        </div>
    );
}

export default ChessPuzzle;
