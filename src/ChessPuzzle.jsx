import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

function ChessPuzzle() {
    const { category } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(new Chess());
    const [puzzle, setPuzzle] = useState(null);
    const [showHint, setShowHint] = useState(false);

    const handleMove = (sourceSquare, targetSquare) => {
        try {
            const move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q",
            });

            if (move === null) {
                console.log("Ungültiger Zug");
                return false;
            }

            const expectedMove = puzzle.solution[0];

            if (move.san === expectedMove) {
                console.log("Richtiger Zug!");
                //! Sweetalert popup here
            } else {
                console.log(`Wrong move: ${move.san}, expected: ${expectedMove}`);

                setTimeout(() => {
                    setGame(new Chess(puzzle.fen));
                }, 500);
            }

            setGame(new Chess(game.fen()));
            return true;

        } catch (error) {
            console.log("Fehler beim Zug:", error.message);
            return false;
        }
    };

    const currentTurn = game.turn();

    useEffect(() => {
        const savedPuzzle = localStorage.getItem("currentPuzzle");
    
        if (savedPuzzle) {
            const parsedPuzzle = JSON.parse(savedPuzzle);
            if (
                parsedPuzzle.category === category &&
                parsedPuzzle.fen &&
                parsedPuzzle.solution
            ) {
                setPuzzle(parsedPuzzle);
                setGame(new Chess(parsedPuzzle.fen));
                return;
            } else {
                console.warn("Ungültiges gespeichertes Puzzle, wird ignoriert.");
                localStorage.removeItem("currentPuzzle");
            }
        }
    
        loadNewPuzzle();
    }, [category]);

    const loadNewPuzzle = async () => {
        try {
            const response = await fetch("/puzzles.json");
            const puzzles = await response.json();
            const categoryPuzzles = puzzles[category];
    
            if (!categoryPuzzles || categoryPuzzles.length === 0) {
                console.error("Keine Puzzles in dieser Kategorie gefunden:", category);
                return;
            }
    
            const randomPuzzle = categoryPuzzles[Math.floor(Math.random() * categoryPuzzles.length)];
    
            if (!randomPuzzle || !randomPuzzle.fen) {
                console.error("Ungültiges Puzzle-Format:", randomPuzzle);
                return;
            }

            setShowHint(false);
            setPuzzle(randomPuzzle);
            setGame(new Chess(randomPuzzle.fen));
            localStorage.setItem("currentPuzzle", JSON.stringify({ ...randomPuzzle, category }));
        } catch (error) {
            console.error("Fehler beim Laden der Puzzles:", error);
        }
    };
    

    return (
        <div>
            {puzzle && (
                <div>

                    <Chessboard
                        boardWidth={400}
                        position={game.fen()}
                        onPieceDrop={handleMove}
                        arePiecesDraggable={({ piece }) =>
                            piece.startsWith(currentTurn)
                        }
                    />

                </div>
            )}

            <br />

            <button onClick={() => navigate("/")}>Zurück</button>
            <button onClick={loadNewPuzzle}>Neues Puzzle laden</button>

            {puzzle && puzzle.hint && (
                <>
                    {!showHint ? (
                        <button onClick={() => setShowHint(true)}>Tipp anzeigen</button>
                    ) : (
                        <p><strong>Tip:</strong> {puzzle.hint}</p>
                    )}
                </>
            )}

            {puzzle && puzzle.solution && (
                <>

                </>
            )}
        </div>
    );
}

export default ChessPuzzle;
