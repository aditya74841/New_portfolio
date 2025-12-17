import React from "react";
import { HiSparkles } from "react-icons/hi2";

const LoadingScreen: React.FC = () => {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-[calc(100vh-18rem)]"
            role="status"
            aria-label="Loading conversation"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-600 flex items-center justify-center animate-pulse">
                    <HiSparkles className="text-white text-3xl" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <p className="text-slate-400 text-lg">Loading conversation...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
