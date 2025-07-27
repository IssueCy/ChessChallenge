import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import Swal from "sweetalert2";
import fireContactForm from "./FireContactForm";


function ChessPuzzle() {

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const hasReloaded = params.get("reloaded");

        if (!hasReloaded) {
            params.set("reloaded", "true");
            window.location.search = params.toString();
        }
    }, []);

    const markPuzzleAsSolved = (puzzle) => {
        const solved = JSON.parse(localStorage.getItem("solvedPuzzles") || "[]");
        const puzzleKey = `#${puzzle.id}`;

        if (!solved.includes(puzzleKey)) {
            solved.push(puzzleKey);
            localStorage.setItem("solvedPuzzles", JSON.stringify(solved));
        }
    };

    const isPuzzleSolved = (puzzle) => {
        const solved = JSON.parse(localStorage.getItem("solvedPuzzles") || "[]");
        const puzzleKey = `#${puzzle.id}`;

        return solved.includes(puzzleKey);
    }

    const { category } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(new Chess());
    const [puzzle, setPuzzle] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [colorToMove, setColorToMove] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [solutionShown, setSolutionShown] = useState(false);
    const [hintSquare, setHintSquare] = useState(null);


    function displayUserSolvedPuzzleCorrectly() {
        Swal.fire({
            title: '',
            text: 'You found the right move!',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Load new puzzle',
            cancelButtonText: 'Keep me on this puzzle',
        }).then((result) => {
            if (result.isConfirmed) {
                loadNewPuzzle();
            }
        });
    }

    const handleMove = (sourceSquare, targetSquare) => {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
        });

        if (move === null) return false;

        const expectedMove = puzzle.solution[currentStep];

        if (move.san === expectedMove) {
            const newGame = new Chess(game.fen());
            setGame(newGame);

            if (currentStep + 1 < puzzle.solution.length) {
                setTimeout(() => {
                    const computerMove = puzzle.solution[currentStep + 1];
                    newGame.move(computerMove);
                    setGame(new Chess(newGame.fen()));
                    setCurrentStep(currentStep + 2);
                }, 600);
            } else {
                markPuzzleAsSolved(puzzle);
                displayUserSolvedPuzzleCorrectly();
                setSolutionShown(true);
            }
        } else {
            const boardElement = document.getElementById("boardElement");
            boardElement.classList.add("invalid-move");
            setTimeout(() => boardElement.classList.remove("invalid-move"), 300);

            setTimeout(() => {
                const newGame = new Chess(puzzle.fen);
                setGame(newGame);
                setCurrentStep(0);
            }, 500);
        }

        return true;
    };

    const animateSolution = async () => {
        if (!puzzle || !puzzle.solution || puzzle.solution.length === 0) return;

        const tempGame = new Chess(puzzle.fen);
        const moves = puzzle.solution;

        for (let i = 0; i < moves.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            tempGame.move(moves[i]);
            setGame(new Chess(tempGame.fen()));
        }

        setSolutionShown(true);
    };

    const resetPuzzle = () => {
        if (!puzzle) return;
        setGame(new Chess(puzzle.fen));
        setSolutionShown(false);
        setCurrentStep(0);
    }


    const currentTurn = game.turn();

    useEffect(() => {
        const savedPuzzle = localStorage.getItem("currentPuzzle");

        if (savedPuzzle) {
            const parsedPuzzle = JSON.parse(savedPuzzle);
            if (parsedPuzzle.fen && parsedPuzzle.solution && parsedPuzzle.category === category) {
                setPuzzle(parsedPuzzle);
                setGame(new Chess(parsedPuzzle.fen));
                return;
            } else {
                console.warn("Invalid saved puzzle, ignoring");
                localStorage.removeItem("currentPuzzle");
            }
        }

        loadNewPuzzle();
    }, [category]);

    //? what color to move
    useEffect(() => {
        if (puzzle?.color) {
            setColorToMove(puzzle.color === "b" ? "Black" : "White");
        }
    }, [puzzle]);


    const loadNewPuzzle = async () => {
        try {
            const response = await fetch("/puzzles.json");
            const puzzles = await response.json();
            const categoryPuzzles = puzzles[category];

            if (!categoryPuzzles || categoryPuzzles.length === 0) {
                console.error("No puzzle found in this category: ", category);
                return;
            }

            const unsolvedPuzzles = categoryPuzzles.filter(
                (p) => !isPuzzleSolved(p)
            );

            if (unsolvedPuzzles.length === 0) {
                Swal.fire({
                    title: 'All puzzles in this category have been solved!',
                    text: 'Navigate to the account settings to reset your solved puzzles - or wait until new ones!',
                    icon: 'info',
                    confirmButtonText: 'Back to home',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                        return;
                    }
                });
            }

            const randomPuzzle = unsolvedPuzzles[Math.floor(Math.random() * unsolvedPuzzles.length)];

            if (!randomPuzzle || !randomPuzzle.fen) {
                console.warn("False puzzle format or no puzzle left.")
                return;
            }

            localStorage.setItem("currentPuzzle", JSON.stringify({
                ...randomPuzzle,
                category: category
            }));
            setShowHint(false);
            setPuzzle(randomPuzzle);
            setGame(new Chess(randomPuzzle.fen));

            //? what color to move?
            setColorToMove(randomPuzzle.color === "b" ? "Black" : "White");

            setSolutionShown(false);

        } catch (error) {
            console.error("Error while loading puzzle: ", error);
        }
    };

    if (!puzzle) {
        return <div><p>Loading... If this takes longer than 10 seconds, there is a problem with the puzzles.</p></div>;
    }


    return (
        <div className="puzzle-container">
            <div id="boardElement">
                <Chessboard
                    boardWidth={400}
                    position={game.fen()}
                    onPieceDrop={handleMove}
                    arePiecesDraggable={({ piece }) => piece.startsWith(currentTurn)}
                    customSquareStyles={
                        hintSquare
                            ? {
                                [hintSquare]: {
                                    backgroundColor: "rgba(105, 220, 76, 0.6)",
                                },
                            }
                            : {}
                    }
                />

            </div>

            <br />

            {colorToMove && (
                <div className="whoToMove">
                    {colorToMove} to move
                </div>
            )}


            <div className="button-section">
                <button className="util-buttons" onClick={loadNewPuzzle}>→ Next</button>

                {puzzle.solution && currentStep < puzzle.solution.length && (
                    <button
                        className="util-buttons"
                        onClick={() => {
                            const nextMoveSAN = puzzle.solution[currentStep];
                            const tempGame = new Chess(game.fen());
                            const legalMoves = tempGame.moves({ verbose: true });
                            const matchedMove = legalMoves.find((m) => m.san === nextMoveSAN);

                            if (matchedMove) {
                                setHintSquare(matchedMove.from);
                                setTimeout(() => setHintSquare(null), 2000);
                            }
                        }}
                    >
                        ⁇ Hint
                    </button>
                )}



                {solutionShown ? (
                    <button className="util-buttons" id="resetButton" onClick={resetPuzzle}>↩ Reset</button>
                ) : (
                    <button className="util-buttons" onClick={animateSolution}>✓ Solution</button>
                )}

            </div>
            <button className="util-buttons" onClick={() => navigate("/")}>🏠 Home</button>

            <br />
            <br />

            <button onClick={fireContactForm} className="button-as-link">Submit a problem</button>
        </div>

    );


}

export default ChessPuzzle;
