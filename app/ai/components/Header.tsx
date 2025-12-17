import React from "react";
import { HiSparkles } from "react-icons/hi2";
import { FiPlus, FiShare2, FiCheck } from "react-icons/fi";

interface HeaderProps {
    onNewChat: () => void;
    onShare: () => void;
    chatId?: string | null;
    copySuccess?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNewChat, onShare, chatId, copySuccess }) => {
    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/50 border-b border-white/10"
            role="banner"
        >
            <nav
                className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
                aria-label="Main navigation"
            >
                <a
                    href="/ai"
                    className="flex items-center gap-3"
                    aria-label="AI Chat Assistant Home"
                >
                    <div
                        className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center"
                        aria-hidden="true"
                    >
                        <HiSparkles className="text-white text-xl" />
                    </div>
                    <span className="text-white text-xl font-semibold tracking-tight">
                        AI Assistant
                    </span>
                </a>

                <div className="flex items-center gap-4" role="group" aria-label="Chat actions">
                    {/* Show Chat ID if exists */}
                    {chatId && (
                        <span className="text-xs text-slate-500 hidden sm:block">
                            Chat:{" "}
                            <span className="font-mono text-slate-400">
                                {chatId.substring(0, 8)}...
                            </span>
                        </span>
                    )}

                    <button
                        onClick={onNewChat}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 backdrop-blur-sm"
                        aria-label="Start a new chat conversation"
                    >
                        <FiPlus className="text-lg" aria-hidden="true" />
                        <span className="font-medium">New Chat</span>
                    </button>
                    <button
                        onClick={onShare}
                        className={`flex items-center gap-2 px-5 py-2.5 text-white rounded-xl transition-all duration-300 ${copySuccess
                                ? "bg-green-600 hover:bg-green-500"
                                : "bg-cyan-600 hover:bg-cyan-500"
                            }`}
                        aria-label={copySuccess ? "URL copied to clipboard" : "Share this conversation"}
                    >
                        {copySuccess ? (
                            <>
                                <FiCheck className="text-lg" aria-hidden="true" />
                                <span className="font-medium">Copied!</span>
                            </>
                        ) : (
                            <>
                                <FiShare2 className="text-lg" aria-hidden="true" />
                                <span className="font-medium">Share</span>
                            </>
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
