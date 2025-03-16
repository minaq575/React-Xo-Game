import React from "react";
import { PopupProps } from "../types/PopupProps";
import { XMarkIcon } from '@heroicons/react/24/outline';

const Popup: React.FC<PopupProps> = ({ title, message, onStartNewGame, buttonLabel = "Close", avatar, onViewHistory }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg">
            <div className="bg-white bg-opacity-80 text-black p-8 rounded-2xl shadow-2xl text-center relative">
                <button
                    onClick={onStartNewGame}
                    className="absolute top-4 right-4 text-black hover:text-gray-600 transition"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                {Array.isArray(avatar) ? (
                    <div className="flex justify-center gap-4 mb-4">
                        {avatar.map((img, index) => (
                            <img key={index} src={img} alt="Avatar" className="w-24 h-24 rounded-full" />
                        ))}
                    </div>
                ) : (
                    avatar && (
                        <img
                            src={avatar}
                            alt="Winner Avatar"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                    )
                )}

                <h2 className="text-3xl font-extrabold mb-4 text-red-600">{title}</h2>
                <p className="text-lg mb-6">{message}</p>

                <div className="flex gap-4">
                    <button
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-all font-bold"
                        onClick={onStartNewGame}
                    >
                        {buttonLabel}
                    </button>

                    {onViewHistory && (
                        <button
                            onClick={onViewHistory}
                            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full hover:scale-105 transition-all font-bold"
                        >
                            ดูประวัติการเล่น
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popup;
