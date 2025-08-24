import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import Swal from "sweetalert2";
import fireContactForm from "./FireContactForm";

import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./auth"; 


function ChessPuzzle() {
    const { user } = useAuth(); 
    const { category } = useParams();
    const navigate = useNavigate();

    const [game, setGame] = useState(new Chess());
    const [puzzle, setPuzzle] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [solvedPuzzles, setSolvedPuzzles] = useState([]);
    const [colorToMove, setColorToMove] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [solutionShown, setSolutionShown] = useState(false);
    const [hintSquare, setHintSquare] = useState(null);
    const [boardWidth, setBoardWidth] = useState(450);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const hasReloaded = params.get("reloaded");

        if (!hasReloaded) {
            params.set("reloaded", "true");
            window.location.search = params.toString();
        }
    }, []);

    //get user progress
    useEffect(() => { 
        async function fetchProgress() {
          if (!user) return;
          const ref = doc(db, "users", user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            setSolvedPuzzles(snap.data().progress || []);
          }
        }
        fetchProgress();
      }, [user]);
      
      const markPuzzleAsSolved = async (puzzle) => {
        if (!user) return;
      
        const ref = doc(db, "users", user.uid);
        await updateDoc(ref, {
          progress: arrayUnion(puzzle.id)
        });
      
        setSolvedPuzzles((prev) => {
          const updated = [...prev, puzzle.id];
          return updated;
        });
      
        return;
      };

      const isPuzzleSolved = (puzzle) => {
        return solvedPuzzles.includes(puzzle.id);
      };

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
        try {
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
                    (async () => {
                        await markPuzzleAsSolved(puzzle);
                        displayUserSolvedPuzzleCorrectly();
                        setSolutionShown(true);
                    })();
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
        } catch (error) {
            console.warn("Invalid move attempted:", error);
            return false;
        }
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
          const q = query(
            collection(db, "puzzles"),
            where("category", "==", category)
          );

          const querySnapshot = await getDocs(q);
      
          if (querySnapshot.empty) {
            console.error("No puzzles found in this category: ", category);
            return;
          }
      
          const categoryPuzzles = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data,
              docId: doc.id
            };
          });
      
          const unsolvedPuzzles = categoryPuzzles.filter(
            (p) => !isPuzzleSolved(p)
          );
      
          if (unsolvedPuzzles.length === 0) {
            Swal.fire({
              title: "All puzzles in this category have been solved!",
              text: "Navigate to the account settings to reset your solved puzzles - or wait until new ones!",
              icon: "info",
              confirmButtonText: "Back to home",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/");
                return;
              }
            });
            return;
          }
      
          const randomPuzzle = unsolvedPuzzles[Math.floor(Math.random() * unsolvedPuzzles.length)];
      
          setShowHint(false);
          setPuzzle(randomPuzzle);
          setGame(new Chess(randomPuzzle.fen));
          setColorToMove(randomPuzzle.color === "b" ? "Black" : "White");
          setSolutionShown(false);
          console.log("[+] loaded new puzzle: #", randomPuzzle.id);
        } catch (error) {
          console.error("Error while loading puzzle: ", error);
        }
      };

    useEffect(() => {
        function updateBoardWidth() {
          const viewportSize = window.visualViewport?.width || window.innerWidth;

          let newWidth = viewportSize * 0.9;
          newWidth = Math.max(300, Math.min(newWidth, 450));
      
          setBoardWidth(newWidth);
        }
      
        updateBoardWidth();
        window.addEventListener("resize", updateBoardWidth);
        return () => window.removeEventListener("resize", updateBoardWidth);
      }, []);

    if (!puzzle) {
        return <div style={{ margin: "12px" }}><p>Loading... If this takes longer than 10 seconds, there is a problem with the puzzles. Consider creating a bug report at the bottom of the homepage</p>
            <button onClick={loadNewPuzzle}>Try loading a different puzzle</button>
        </div>;
    }

    return (
        <div className="puzzle-container" id="puzzle-container">
            <span style={{ fontWeight: "bold" }}>#{puzzle.id}</span>
                {colorToMove && (
                    <div className="whoToMove">
                        {colorToMove} to move
                    </div>
                )}

            <div id="boardElement">
                <Chessboard
                    boardWidth={boardWidth}
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


            <div className="button-section">
                <button className="util-buttons" id="green-button" onClick={loadNewPuzzle}>→ Next</button>

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
                        ⁇
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

            <button onClick={fireContactForm} className="button-as-link">Submit a problem</button>
        </div>

    );


}

export default ChessPuzzle;
