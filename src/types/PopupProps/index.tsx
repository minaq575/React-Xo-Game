export type PopupProps = {
    title?: string;
    message?: string;
    onClose?: () => void;
    onStartNewGame?: () => void;
    buttonLabel?: string;
    avatar?: string | string[];
    children?: React.ReactNode;
    onViewHistory?: () => void;
}
