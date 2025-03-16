export type GameHistory = {
    id: string;
    playerName: string;
    opponentName: string;
    playerSymbol: "X" | "O";
    opponentSymbol: "X" | "O";
    round: number;
    winner: string;
    playerMoves: number;
    aiMoves: number;
    isFinished: boolean;
    boardState: string[];
};

