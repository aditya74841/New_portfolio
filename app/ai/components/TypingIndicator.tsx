import React from "react";
import { HiSparkles } from "react-icons/hi2";

const TypingIndicator: React.FC = () => {
    return (
        <div
            className="flex justify-start"
            role="status"
            aria-label="AI Assistant is typing a response"
        >
            <div className="flex gap-3">
                <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center"
                    aria-hidden="true"
                >
                    <HiSparkles className="text-white text-sm" />
                </div>
                <div className="flex items-center gap-1 px-4 py-3" aria-hidden="true">
                    <div
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                    />
                    <div
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                    />
                    <div
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                    />
                </div>
                <span className="sr-only">AI Assistant is typing...</span>
            </div>
        </div>
    );
};

export default TypingIndicator;
