import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

function ChessPuzzle() {
    const [game, setGame] = useState(new Chess());
    const [puzzle, setPuzzle] = useState(null);

    const loadRandomPuzzle = async () => {
        try {
            const response = await fetch("puzzles.json");
            const puzzles = await response.json();
    
            const categories = Object.keys(puzzles);
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
            const categoryPuzzles = puzzles[randomCategory];
            const randomPuzzle = categoryPuzzles[Math.floor(Math.random() * categoryPuzzles.length)];
    
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
                    <Chessboard boardWidth={400} position={game.fen()} />
                </div>
            )}
            <br />
        </div>
    );
}

export default ChessPuzzle;
