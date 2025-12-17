import React from "react";
import { IoIosSend } from "react-icons/io";

interface ChatInputProps {
    message: string;
    onMessageChange: (value: string) => void;
    onSend: () => void;
    isDisabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
    message,
    onMessageChange,
    onSend,
    isDisabled,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    const characterCount = message.length;
    const maxCharacters = 4000;
    const isNearLimit = characterCount > maxCharacters * 0.9;

    return (
        <footer
            className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent pt-20"
            role="contentinfo"
        >
            <div className="max-w-3xl mx-auto">
                <form
                    onSubmit={(e) => { e.preventDefault(); onSend(); }}
                    className="bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-2xl"
                    aria-label="Send a message to AI Assistant"
                >
                    <div className="flex items-end gap-4 p-3">
                        <label htmlFor="chat-input" className="sr-only">
                            Type your message to the AI Assistant
                        </label>
                        <textarea
                            id="chat-input"
                            value={message}
                            onChange={(e) => onMessageChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message here..."
                            rows={1}
                            maxLength={maxCharacters}
                            className="flex-1 bg-transparent text-white text-lg placeholder-slate-500 outline-none resize-none py-4 px-4 min-h-[60px] max-h-[200px]"
                            style={{ scrollbarWidth: "thin" }}
                            aria-describedby="input-hints character-count"
                            aria-invalid={characterCount > maxCharacters}
                        />
                        <button
                            type="submit"
                            className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${message.trim()
                                    ? "bg-cyan-600 hover:bg-cyan-500 hover:scale-105"
                                    : "bg-slate-700 cursor-not-allowed"
                                }`}
                            disabled={!message.trim() || isDisabled}
                            aria-label="Send message"
                        >
                            <IoIosSend className="text-white text-2xl" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex items-center justify-between px-6 py-3 border-t border-white/5">
                        <span id="input-hints" className="text-xs text-slate-500">
                            Press Enter to send • Shift + Enter for new line
                        </span>
                        <span
                            id="character-count"
                            className={`text-xs ${isNearLimit ? 'text-amber-400' : 'text-slate-500'}`}
                            aria-live="polite"
                        >
                            {characterCount}/{maxCharacters}
                        </span>
                    </div>
                </form>
            </div>
        </footer>
    );
};

export default ChatInput;
