import React from "react";
import { HiSparkles } from "react-icons/hi2";

interface WelcomeScreenProps {
    onPromptClick: (prompt: string) => void;
}

const quickPrompts = [
    "Explain quantum computing",
    "Write a React component",
    "Debug my code",
    "Create a business plan",
];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPromptClick }) => {
    return (
        <section
            className="flex flex-col items-center justify-center min-h-[calc(100vh-18rem)]"
            aria-labelledby="welcome-heading"
        >
            <article className="text-center max-w-2xl mx-auto">
                <div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyan-600 mb-8"
                    aria-hidden="true"
                >
                    <HiSparkles className="text-white text-4xl" />
                </div>
                <h1
                    id="welcome-heading"
                    className="text-5xl font-bold text-white mb-4 tracking-tight"
                >
                    How can I help you today?
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed">
                    I&apos;m your AI assistant, ready to help with coding, writing, analysis, and more.
                    Start a conversation below.
                </p>
            </article>

            {/* Quick Prompts */}
            <nav
                className="flex flex-wrap justify-center gap-3 mt-12 max-w-3xl"
                aria-label="Quick prompt suggestions"
            >
                <h2 className="sr-only">Quick Start Prompts</h2>
                {quickPrompts.map((prompt, index) => (
                    <button
                        key={index}
                        onClick={() => onPromptClick(prompt)}
                        className="px-5 py-3 bg-white/5 hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-500/50 rounded-2xl text-slate-300 hover:text-white transition-all duration-300 backdrop-blur-sm"
                        aria-label={`Start conversation with: ${prompt}`}
                    >
                        {prompt}
                    </button>
                ))}
            </nav>
        </section>
    );
};

export default WelcomeScreen;
