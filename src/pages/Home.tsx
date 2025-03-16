import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";
import { XMarkIcon } from '@heroicons/react/24/outline';

function Home() {
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<"X" | "O" | null>(null);

  const handleButtonClick = () => {
    setIsPopupVisible(true);
  };

  const handleSymbolChoice = (symbol: "X" | "O") => {
    setSelectedSymbol(symbol);
  };

  const handleStartGame = () => {
    if (selectedSymbol) {
      navigate("/game", { state: { playerSymbol: selectedSymbol } });
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b bg-[#290a59] text-white p-6">
      <h1 className="text-3xl md:text-5xl font-bold uppercase text-center leading-tight">
        <span className="text-yellow-400">TIC</span>
        <span className="text-pink-400">TAC</span>
        <span className="text-blue-400">TOE</span>
      </h1>

      <div className="mt-6 md:mt-10">
        <img src={Logo} alt="Tic Tac Toe" className="w-28 md:w-44 rounded-2xl shadow-md" />
      </div>

      <button
        onClick={handleButtonClick}
        className="mt-8 md:mt-12 px-8 py-3 md:px-10 md:py-4 bg-white text-purple-800 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition w-full max-w-[300px] text-lg md:text-xl"
      >
        LET'S PLAY
      </button>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md p-4">
          <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-xs md:max-w-md text-center shadow-xl relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6 md:h-8 md:w-8 text-red-500 hover:text-red-700" />
            </button>

            <h2 className="text-lg md:text-2xl font-bold text-purple-800 mb-4 md:mb-6">
              เลือกสัญลักษณ์ของคุณ
            </h2>

            <div className="flex justify-center space-x-4 mb-4 md:mb-6">
              <button
                onClick={() => handleSymbolChoice("X")}
                className={`w-16 md:w-20 h-16 md:h-20 text-2xl md:text-3xl font-bold rounded-full shadow-md transition-transform flex items-center justify-center ${selectedSymbol === "X"
                  ? "bg-red-500 text-white scale-110"
                  : "bg-gray-300 text-gray-700 hover:bg-red-500 hover:scale-105"
                  }`}
              >
                X
              </button>
              <button
                onClick={() => handleSymbolChoice("O")}
                className={`w-16 md:w-20 h-16 md:h-20 text-2xl md:text-3xl font-bold rounded-full shadow-md transition-transform flex items-center justify-center ${selectedSymbol === "O"
                  ? "bg-blue-500 text-white scale-110"
                  : "bg-gray-300 text-gray-700 hover:bg-blue-500 hover:scale-105"
                  }`}
              >
                O
              </button>
            </div>

            <button
              onClick={handleStartGame}
              disabled={!selectedSymbol}
              className={`w-full py-3 md:py-4 rounded-full font-bold text-lg transition ${selectedSymbol
                ? "bg-purple-800 text-white hover:bg-purple-600"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
            >
              START GAME
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
