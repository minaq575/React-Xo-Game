export const checkWinner = (board: (string | null)[], size: number): string | null => {
    const winCondition = size > 4 ? 4 : size;

    const isWinningLine = (indices: number[]) => {
        if (indices.length < winCondition) return false;

        const first = board[indices[0]];
        if (!first) return false;

        return indices.every(index => board[index] === first);
    };

    for (let row = 0; row < size; row++) {
        for (let col = 0; col <= size - winCondition; col++) {
            const indices = [...Array(winCondition)].map((_, i) => row * size + (col + i));
            if (isWinningLine(indices)) return board[indices[0]]!;
        }
    }

    for (let col = 0; col < size; col++) {
        for (let row = 0; row <= size - winCondition; row++) {
            const indices = [...Array(winCondition)].map((_, i) => (row + i) * size + col);
            if (isWinningLine(indices)) return board[indices[0]]!;
        }
    }

    for (let row = 0; row <= size - winCondition; row++) {
        for (let col = 0; col <= size - winCondition; col++) {
            const indices = [...Array(winCondition)].map((_, i) => (row + i) * size + (col + i));
            if (isWinningLine(indices)) return board[indices[0]]!;
        }
    }

    for (let row = 0; row <= size - winCondition; row++) {
        for (let col = winCondition - 1; col < size; col++) {
            const indices = [...Array(winCondition)].map((_, i) => (row + i) * size + (col - i));
            if (isWinningLine(indices)) return board[indices[0]]!;
        }
    }

    return board.every(cell => cell !== null) ? "Draw" : null;
};
