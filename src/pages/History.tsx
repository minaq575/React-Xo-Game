import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { collection, getDocs, writeBatch } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import { GameHistory } from "../types/GameHistory/index";
import User from "../assets/icons/user.svg";
import Ai from "../assets/icons/ai.svg";

const History: React.FC = () => {
  const navigate = useNavigate();
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);  // State to manage modal visibility

  const countMoves = (boardState: string[]) => {
    const xCount = boardState.filter(cell => cell === "X").length;
    const oCount = boardState.filter(cell => cell === "O").length;
    return { xCount, oCount };
  };

  useEffect(() => {
    const fetchGameHistory = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gameHistory"));
        const historyData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as GameHistory[];

        historyData.sort((a, b) => Number(a.round) - Number(b.round));
        setGameHistory(historyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameHistory();
  }, []);

  const resetGameHistory = async () => {
    try {
      const batch = writeBatch(db);
      const querySnapshot = await getDocs(collection(db, "gameHistory"));
      querySnapshot.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
      setGameHistory([]); // Clear the local game history
      setIsModalOpen(false); // Close the modal after reset
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleResetClick = () => {
    setIsModalOpen(true);  // Open the reset confirmation modal
  };

  const handleCancel = () => {
    setIsModalOpen(false);  // Close the modal without resetting
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a033b] text-white relative p-6">
      <button onClick={() => navigate(-1)} className="absolute top-6 left-6 text-white hover:text-gray-300 transition">
        <ArrowLeftIcon className="h-8 w-8" />
      </button>

      <button
        onClick={() => {
          resetGameHistory();
          navigate("/"); // Navigate back after reset
        }}
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition"
      >
        <XMarkIcon className="h-8 w-8" />
      </button>

      <h1 className="text-2xl font-bold mb-6">ประวัติการเล่น</h1>

      <button
        onClick={handleResetClick}
        className="mb-4 px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition"
      >
        รีเซ็ตประวัติการเล่น
      </button>

      {loading ? (
        <p className="text-gray-400">กำลังโหลด...</p>
      ) : gameHistory.length > 0 ? (
        <div className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg">
          {gameHistory.map((record) => {
            const { xCount, oCount } = countMoves(record.boardState);
            return (
              <div key={record.id} className="p-3 border-b border-gray-600">
                <p className="font-bold text-xl">เกมที่ {Number(record.round)}</p>
                <p className="text-sm">ผู้ชนะ: {record.winner ? record.winner : "ยังไม่มีผู้ชนะ"}</p>
                <p className="text-sm">จำนวน X: {xCount}</p>
                <p className="text-sm">จำนวน O: {oCount}</p>
                <div className="mt-2">
                  {record.winner === "player" && <img src={User} alt="User Wins" className="w-8 h-8 inline-block" />}
                  {record.winner === "ai" && <img src={Ai} alt="AI Wins" className="w-8 h-8 inline-block" />}
                  {record.winner === "draw" && (
                    <>
                      <img src={User} alt="User Draw" className="w-8 h-8 inline-block" />
                      <img src={Ai} alt="AI Draw" className="w-8 h-8 inline-block" />
                    </>
                  )}
                </div>
                {record.boardState && (
                  <div className="mt-4">
                    {Array.from({ length: Math.sqrt(record.boardState.length) }, (_, rowIndex) => (
                      <div key={rowIndex} className="flex justify-center ">
                        {Array.from({ length: Math.sqrt(record.boardState.length) }, (_, colIndex) => {
                          const cellIndex = rowIndex * Math.sqrt(record.boardState.length) + colIndex;
                          const cell = record.boardState[cellIndex];
                          return (
                            <div
                              key={colIndex}
                              className="w-16 h-16 flex items-center justify-center border border-white text-3xl font-bold text-gray-200"
                            >
                              {cell === "X" ? "X" : cell === "O" ? "O" : ""}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400">ไม่มีประวัติการเล่น</p>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative z-10">
            <p className="text-black text-xl mb-4">คุณแน่ใจหรือไม่ว่าจะรีเซ็ต?</p>
            <button
              onClick={resetGameHistory}
              className="mr-4 px-6 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition"
            >
              รีเซ็ต
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 transition"
            >
              ยกเลิก
            </button>
          </div>
          <div className="absolute inset-0 backdrop-blur-sm"></div> {/* Applied only blur effect */}
        </div>
      )}
    </div>
  );
};

export default History;
