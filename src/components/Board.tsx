import React, { useState, useEffect } from "react";
import { BoardProps } from "../types/BoardProps";
import { checkWinner } from "../utils/index";
import { db } from "../database/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Board: React.FC<BoardProps> = ({
    size,
    togglePlayer,
    currentPlayer,
    playerSymbol,
    aiSymbol,
    onWin,
    className,
}) => {
    const [squares, setSquares] = useState<(string | null)[]>(Array(size * size).fill(null));
    const [winner, setWinner] = useState<string | null>(null);
    const [playerMoves, setPlayerMoves] = useState(0);
    const [aiMoves, setAiMoves] = useState(0);
    const [moveHistory, setMoveHistory] = useState<(string | null)[][]>([]);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        setSquares(Array(size * size).fill(null));
        setWinner(null);
        setPlayerMoves(0);
        setAiMoves(0);
        setMoveHistory([]);
        setIsGameOver(false);
    }, [size]);

    const saveGameToFirebase = async (
        updatedSquares: (string | null)[],
        winner: string | null,
        isFinished: boolean
    ) => {
        if (!isFinished) return;

        try {
            const querySnapshot = await getDocs(collection(db, "gameHistory"));
            const newRound = querySnapshot.size + 1;

            await addDoc(collection(db, "gameHistory"), {
                round: newRound,
                boardState: updatedSquares,
                winner: winner,
                playerMoves: playerMoves,
                aiMoves: aiMoves,
                timestamp: new Date(),
                isFinished: true,
            });

            console.log(`Game ${newRound} saved successfully`);
        } catch (error) {
            console.error("Error saving game:", error);
        }
    };


    const handleAIMove = () => {
        if (winner) return;

        const emptyCells = squares
            .map((square, index) => (square === null ? index : null))
            .filter((index): index is number => index !== null);

        if (emptyCells.length === 0) return;

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newSquares = [...squares];
        newSquares[randomIndex] = aiSymbol;
        setSquares(newSquares);
        setAiMoves(aiMoves + 1);

        const gameWinner = checkWinner(newSquares, size);
        if (gameWinner) {
            setWinner(gameWinner);
            onWin(gameWinner);
            saveGameToFirebase(newSquares, gameWinner, true);
            setIsGameOver(true);
        } else {
            saveGameToFirebase(newSquares, null, false);
            togglePlayer();
        }

        setMoveHistory((prevHistory) => [...prevHistory, newSquares]);
    };

    const handleClick = (index: number) => {
        if (squares[index] || winner || currentPlayer !== "Player") return;

        const newSquares = [...squares];
        newSquares[index] = playerSymbol;
        setSquares(newSquares);

        setPlayerMoves((prevMoves) => prevMoves + 1);
        setMoveHistory([...moveHistory, newSquares]);

        const gameWinner = checkWinner(newSquares, size);
        if (gameWinner) {
            setWinner(gameWinner);
            onWin(gameWinner);
            saveGameToFirebase(newSquares, gameWinner, true);
        } else {
            saveGameToFirebase(newSquares, null, false);
            togglePlayer();
        }
    };

    useEffect(() => {
        if (currentPlayer === "AI" && !winner && !isGameOver) {
            setTimeout(handleAIMove, 500);
        }
    }, [currentPlayer, squares, isGameOver]);

    const handleReplay = () => {
        setSquares(Array(size * size).fill(null));
        setWinner(null);
        setPlayerMoves(0);
        setAiMoves(0);
        setMoveHistory([]);
        setIsGameOver(false);
    };

    return (
        <div className={`flex flex-col items-center w-full ${className || ""}`}>
            <div
                className="grid bg-cyan-500 p-4 rounded-xl shadow-lg"
                style={{
                    gridTemplateColumns: `repeat(${size}, 1fr)`,
                    gridTemplateRows: `repeat(${size}, 1fr)`,
                    width: `min(90vw, ${size * 90}px)`,
                    height: `min(90vw, ${size * 90}px)`,
                    maxWidth: "100%",
                    maxHeight: "100%",
                    aspectRatio: "1 / 1",
                    gap: "4px",
                }}
            >
                {squares.map((square, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        className="flex items-center justify-center border-2 border-black text-4xl font-bold cursor-pointer bg-white rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                        }}
                    >
                        {square === "X" ? (
                            <span
                                className="text-red-500"
                                style={{
                                    fontSize: "clamp(20px, 6vw, 60px)",
                                }}
                            >
                                {square}
                            </span>
                        ) : square === "O" ? (
                            <span
                                className="text-blue-500"
                                style={{
                                    fontSize: "clamp(20px, 6vw, 60px)",
                                }}
                            >
                                {square}
                            </span>
                        ) : null}
                    </div>
                ))}
            </div>

            {isGameOver && (
                <div className="mt-4">
                    <button
                        onClick={handleReplay}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-400 transition-all duration-200"
                    >
                        Replay Game
                    </button>
                </div>
            )}
        </div>
    );
};

export default Board;
