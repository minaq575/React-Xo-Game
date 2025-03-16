export type BoardProps = {
    size: number;
    togglePlayer: () => void;
    currentPlayer: "Player" | "AI";
    playerSymbol: "X" | "O";
    aiSymbol: "X" | "O";
    onWin: (winner: string) => void;
    className?: string;
};
