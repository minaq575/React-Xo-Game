import React, { useState } from "react";
import { BoardControlsProps } from "../types/BoardControlsProps";

const BoardControls: React.FC<BoardControlsProps> = ({
    inputSize,
    setInputSize,
    handleSizeChange,
    resetBoard,
    handleKeyPress,
}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const validateSize = () => {
        let newSize = parseInt(inputSize);
        if (isNaN(newSize)) {
            setPopupMessage("กรุณากรอกจำนวนที่ถูกต้อง");
            setShowPopup(true);
            newSize = 3;
        } else if (newSize < 3) {
            setPopupMessage("ขนาดต้องไม่ต่ำกว่า 3");
            setShowPopup(true);
            newSize = 3;
        } else if (newSize > 10) {
            setPopupMessage("ขนาดต้องไม่เกิน 10");
            setShowPopup(true);
            newSize = 10;
        }

        setInputSize(newSize.toString());
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
    };

    const handleClickOutsidePopup = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains("backdrop-blur-md")) {
            handleClosePopup();
        }
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    aria-label="Input size for the board"
                    className="w-20 px-3 py-2 text-center text-black bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                    value={inputSize}
                    onChange={(e) => setInputSize(e.target.value)}
                    onBlur={validateSize}
                    onKeyDown={handleKeyPress}
                    min="3"
                    max="10"
                />
                <button
                    aria-label="Set board size"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all focus:ring-2 focus:ring-red-300"
                    onClick={handleSizeChange}
                >
                    ตั้งค่า
                </button>
                <button
                    aria-label="Reset the board"
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all focus:ring-2 focus:ring-gray-300"
                    onClick={resetBoard}
                >
                    รีเซ็ต
                </button>
            </div>
            <p className="text-sm text-gray-300">เลือกระหว่าง 3 - 10 (กด Enter เพื่อเปลี่ยน)</p>

            {showPopup && (
                <div
                    className="fixed inset-0 flex justify-center items-center z-20 backdrop-blur-md transition-opacity opacity-100"
                    onClick={handleClickOutsidePopup}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm mx-4">
                        <p className="text-gray-800 font-semibold text-lg mb-4">{popupMessage}</p>
                        <button
                            onClick={handleClosePopup}
                            className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all focus:ring-2 focus:ring-red-300"
                        >
                            ปิด
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoardControls;