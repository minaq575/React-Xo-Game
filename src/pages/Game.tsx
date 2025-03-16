import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Board from "../components/Board";
import PlayerCard from "../components/PlayerCard";
import BoardControls from "../components/BoardControls";
import User from "../assets/icons/user.svg";
import Ai from "../assets/icons/ai.svg";
import Popup from "../components/Popup";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { collection, getDocs, writeBatch } from "firebase/firestore";
import { db } from "../database/firebaseConfig";

const Game: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [size, setSize] = useState<number>(3);
    const [inputSize, setInputSize] = useState<string>("3");
    const [currentPlayer, setCurrentPlayer] = useState<"Player" | "AI">("Player");
    const [playerSymbol, setPlayerSymbol] = useState<"X" | "O">("X");
    const [aiSymbol, setAiSymbol] = useState<"X" | "O">("O");
    const [winner, setWinner] = useState<string | null>(null);
    const [gameKey, setGameKey] = useState<number>(0);

    const [gameHistory, setGameHistory] = useState<unknown[]>([]);
    const [playerMoves, setPlayerMoves] = useState<number>(0);
    const [aiMoves, setAiMoves] = useState<number>(0);

    const playerName = "Player";
    const aiName = "AI";

    useEffect(() => {
        const symbolFromHome = location.state?.playerSymbol;
        if (symbolFromHome) {
            setPlayerSymbol(symbolFromHome);
            setAiSymbol(symbolFromHome === "X" ? "O" : "X");
        }
    }, [location.state]);

    const resetBoard = () => {
        setCurrentPlayer("Player");
        setWinner(null);
        setGameKey((prev) => prev + 1);
        setPlayerMoves(0);
        setAiMoves(0);
    };

    const closePopup = () => {
        setWinner(null);
        setGameHistory((prevHistory) => [
            ...prevHistory,
            {
                playerName: "Player",
                opponentName: "AI",
                playerSymbol: playerSymbol,
                opponentSymbol: aiSymbol,
                round: 5,
                winner: winner ? winner : "Draw",
                playerMoves,
                aiMoves
            }
        ]);
    };

    const handleSizeChange = () => {
        let newSize = parseInt(inputSize);
        if (isNaN(newSize) || inputSize.trim() === "") {
            newSize = 3;
            setInputSize("3");
        }
        if (newSize >= 3 && newSize <= 10) {
            setSize(newSize);
            resetBoard();
        } else {
            alert("กรุณาเลือกขนาดระหว่าง 3 - 10");
            setInputSize(size.toString());
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSizeChange();
        }
    };

    const togglePlayer = () => {
        setCurrentPlayer((prev) => {
            const nextPlayer = prev === "Player" ? "AI" : "Player";
            if (nextPlayer === "Player") {
                setPlayerMoves((prevMoves) => prevMoves + 1);
            } else {
                setAiMoves((prevMoves) => prevMoves + 1);
            }
            return nextPlayer;
        });
    };

    const handleWin = (winner: string) => {
        setWinner(winner);
    };

    const handleGoBack = async () => {
        await resetFirebaseGameHistory();
        navigate("/");
    };

    const resetFirebaseGameHistory = async () => {
        try {
            const batch = writeBatch(db);
            const querySnapshot = await getDocs(collection(db, "gameHistory"));
            querySnapshot.docs.forEach((doc) => batch.delete(doc.ref));
            await batch.commit();
            console.log("Firebase game history reset successfully.");
        } catch (error) {
            console.error("Error resetting Firebase data: ", error);
        }
    };

    const handleViewHistory = () => {
        navigate("/history", { state: { gameHistory } });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 p-6 bg-[#1a033b] text-white min-h-screen">
            <button
                onClick={handleGoBack}
                className="absolute top-6 left-6 text-white hover:text-gray-300 transition">
                <ArrowLeftIcon className="h-8 w-8" />
            </button>
            <div className="bg-red-500 text-white px-6 py-2 rounded-xl text-lg font-bold">
                กระดาน {size}x{size}
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full px-4">
                <div className="flex flex-row lg:flex-col items-center gap-5 w-full lg:w-auto justify-center lg:justify-start">
                    <PlayerCard
                        name="Player"
                        avatar={User}
                        isActive={currentPlayer === "Player"}
                        symbol={playerSymbol}
                    />
                    <div className="block lg:hidden">
                        <PlayerCard
                            name="AI"
                            avatar={Ai}
                            isActive={currentPlayer === "AI"}
                            symbol={aiSymbol}
                        />
                    </div>
                </div>
                <div className="flex justify-center w-full lg:w-auto">
                    <Board
                        key={gameKey}
                        size={size}
                        togglePlayer={togglePlayer}
                        currentPlayer={currentPlayer}
                        playerSymbol={playerSymbol}
                        aiSymbol={aiSymbol}
                        onWin={handleWin}
                    />
                </div>
                <div className="hidden lg:flex flex-col items-center gap-5 w-full lg:w-auto justify-center lg:justify-start">
                    <PlayerCard
                        name="AI"
                        avatar={Ai}
                        isActive={currentPlayer === "AI"}
                        symbol={aiSymbol}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <button
                    onClick={handleViewHistory}
                    className="block md:hidden px-6 py-3 bg-blue-500 text-white rounded-xl mx-6 mb-2">
                    ดูประวัติการเล่น
                </button>

                <BoardControls
                    inputSize={inputSize}
                    setInputSize={setInputSize}
                    handleSizeChange={handleSizeChange}
                    resetBoard={resetBoard}
                    handleKeyPress={handleKeyPress}
                />
            </div>

            <button
                onClick={handleViewHistory}
                className="fixed top-6 right-6 px-4 py-2 bg-blue-500 text-white rounded-xl z-10 hidden md:block">
                ดูประวัติการเล่น
            </button>
            {winner && (
                <Popup
                    title={winner === "Draw" ? "เสมอ" : `ผู้ชนะ: ${winner === playerSymbol ? playerName : aiName}`}
                    message="อยากเริ่มเกมใหม่หรือไม่?"
                    onClose={closePopup}
                    onStartNewGame={resetBoard}
                    buttonLabel="เริ่มใหม่"
                    avatar={winner === "Draw" ? [User, Ai] : winner === playerSymbol ? User : Ai}
                    onViewHistory={handleViewHistory}
                />
            )}
        </div>
    );
};

export default Game;
