import React from "react";
import { HiSparkles } from "react-icons/hi2";
import { Message } from "./types";
import MarkdownRenderer from "./MarkdownRenderer";

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.role === "user";

    if (isUser) {
        return (
            <article
                className="flex justify-end"
                role="listitem"
                aria-label="Your message"
            >
                <div className="w-fit max-w-[75%] ml-auto">
                    <div className="bg-cyan-600 rounded-2xl rounded-tr-md px-6 py-4">
                        <p className="text-white text-lg leading-relaxed break-words whitespace-pre-wrap">
                            {message.content}
                        </p>
                    </div>
                    <footer className="text-xs text-slate-500 mt-2 flex justify-end gap-2 pr-2">
                        <span>You</span>
                    </footer>
                </div>
            </article>
        );
    }

    // AI Response with Markdown rendering
    return (
        <article
            className="flex justify-start"
            role="listitem"
            aria-label="AI Assistant response"
        >
            <div className="max-w-[85%] flex gap-4">
                <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center mt-1"
                    aria-hidden="true"
                >
                    <HiSparkles className="text-white text-base" />
                </div>
                <div className="flex-1">
                    <div className="text-slate-200 text-lg leading-relaxed">
                        <MarkdownRenderer content={message.content} />
                    </div>
                    <footer className="text-xs text-slate-500 mt-2 flex gap-2">
                        <span>AI Assistant</span>
                    </footer>
                </div>
            </div>
        </article>
    );
};

export default ChatMessage;
