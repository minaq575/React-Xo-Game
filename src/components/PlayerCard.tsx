import React from "react";
import { PlayerCardProps } from "../types/PlayerCard";

const PlayerCard: React.FC<PlayerCardProps> = ({ name, avatar, isActive, symbol }) => {
    return (
        <div
            className={`p-5 rounded-lg shadow-md flex flex-col items-center w-32 transition-all duration-300
                ${isActive ? "bg-purple-600 border-4 border-yellow-400 shadow-yellow-500 shadow-lg scale-105 animate-pulse" : "bg-[#290a59]"}`}
        >
            <img src={avatar} alt={name} className="w-16 h-16" />
            <h3 className="mt-2 text-lg font-bold">{name}</h3>

            {symbol && (
                <span className="mt-2 text-3xl font-bold text-white">
                    {symbol}
                </span>
            )}
        </div>
    );
};

export default PlayerCard;
