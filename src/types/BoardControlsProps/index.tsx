export type BoardControlsProps = {
    inputSize: string;
    setInputSize: (size: string) => void;
    handleSizeChange: () => void;
    resetBoard: () => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
