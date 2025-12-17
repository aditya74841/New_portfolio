import React from "react";
import { FiX, FiAlertCircle } from "react-icons/fi";

interface ErrorMessageProps {
    message: string;
    onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
    return (
        <div
            className="max-w-3xl mx-auto mb-6"
            role="alert"
            aria-live="assertive"
        >
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                <FiAlertCircle className="text-red-400 text-xl flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                    <p className="text-red-300 text-sm">{message}</p>
                </div>
                <button
                    onClick={onDismiss}
                    className="text-red-400 hover:text-red-300 transition-colors"
                    aria-label="Dismiss error"
                >
                    <FiX className="text-lg" />
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;
