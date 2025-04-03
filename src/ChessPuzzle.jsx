import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

function ChessPuzzle() {
    const { category } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(new Chess());
    const [puzzle, setPuzzle] = useState(null);

    useEffect(() => {
        const savedPuzzle = localStorage.getItem("currentPuzzle");

        if (savedPuzzle) {
            const parsedPuzzle = JSON.parse(savedPuzzle);
            if (parsedPuzzle.category === category) {
                setPuzzle(parsedPuzzle);
                setGame(new Chess(parsedPuzzle.fen));
                return;
            }
        }

        loadNewPuzzle();
    }, [category]);

    const loadNewPuzzle = async () => {
        try {
            const response = await fetch("/puzzles.json");
            const puzzles = await response.json();
            const categoryPuzzles = puzzles[category];

            if (categoryPuzzles && categoryPuzzles.length > 0) {
                const randomPuzzle = categoryPuzzles[Math.floor(Math.random() * categoryPuzzles.length)];
                setPuzzle(randomPuzzle);
                setGame(new Chess(randomPuzzle.fen));
                localStorage.setItem("currentPuzzle", JSON.stringify({ ...randomPuzzle, category }));
            }
        } catch (error) {
            console.error("Fehler beim Laden der Puzzles:", error);
        }
    };

    return (
        <div>
            {puzzle && (
                <div>
                    <Chessboard boardWidth={400} position={game.fen()} />
                </div>
            )}

            <br />

            <button onClick={() => navigate("/")}>Zurück</button>
            <button onClick={loadNewPuzzle}>Neues Puzzle laden</button>

            {puzzle && puzzle.hint && (
                <p><strong>Tip:</strong> {puzzle.hint}</p>
            )}
        </div>
    );
}

export default ChessPuzzle;
