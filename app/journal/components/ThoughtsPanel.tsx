import React, { useState } from "react";
import { MessageCircle, Plus, Trash2, Calendar } from "lucide-react";
import { Thought } from "../types";

interface ThoughtsPanelProps {
    thoughts: Thought[];
    onAdd: (content: string) => void;
    onDelete: (id: string) => void;
}

const ThoughtsPanel: React.FC<ThoughtsPanelProps> = ({
    thoughts,
    onAdd,
    onDelete,
}) => {
    const [newThought, setNewThought] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newThought.trim()) {
            onAdd(newThought.trim());
            setNewThought("");
            setShowInput(false);
        }
    };

    // Get today's date
    const today = new Date().toDateString();
    const todayThoughts = thoughts.filter(
        (t) => new Date(t.createdAt).toDateString() === today
    );

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">Today&apos;s Thoughts</h2>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                    })}
                </div>
            </div>

            <div className="space-y-3 max-h-[180px] overflow-y-auto mb-3">
                {todayThoughts.length === 0 ? (
                    <p className="text-slate-500 text-sm text-center py-4">
                        No thoughts for today
                    </p>
                ) : (
                    todayThoughts.map((thought) => (
                        <div
                            key={thought.id}
                            className="group p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all"
                        >
                            <div className="flex justify-between items-start gap-2">
                                <p className="text-slate-300 text-sm leading-relaxed flex-1">
                                    {thought.content}
                                </p>
                                <button
                                    onClick={() => onDelete(thought.id)}
                                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="text-xs text-slate-600 mt-2">
                                {new Date(thought.createdAt).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showInput ? (
                <form onSubmit={handleSubmit} className="space-y-2">
                    <textarea
                        value={newThought}
                        onChange={(e) => setNewThought(e.target.value)}
                        placeholder="What's on your mind..."
                        autoFocus
                        rows={3}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex-1 px-3 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-400 transition-all"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowInput(false);
                                setNewThought("");
                            }}
                            className="px-3 py-2 text-slate-400 hover:text-white transition-all text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    onClick={() => setShowInput(true)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-slate-400 hover:text-purple-400 hover:bg-slate-700/30 rounded-lg transition-all text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Write Today&apos;s Entry
                </button>
            )}
        </div>
    );
};

export default ThoughtsPanel;
