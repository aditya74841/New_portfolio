import React from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { Message } from "./types";

interface ChatContainerProps {
    messages: Message[];
    isTyping: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isTyping }) => {
    return (
        <section
            className="w-full max-w-4xl mx-auto space-y-8 px-4"
            aria-label="Chat conversation"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
        >
            <h2 className="sr-only">Conversation History</h2>
            <div role="list" aria-label="Messages">
                {messages.map((msg, index) => (
                    <div key={msg.id || `msg-${index}`} className="mb-8">
                        <ChatMessage message={msg} />
                    </div>
                ))}
            </div>

            {isTyping && (
                <div aria-live="assertive" aria-atomic="true">
                    <TypingIndicator />
                </div>
            )}
        </section>
    );
};

export default ChatContainer;
