import React from "react";
import { Calendar } from "lucide-react";
import { formatDate } from "./utils";

interface JournalEditorProps {
    entryText: string;
    onTextChange: (text: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    isEditing: boolean;
    loading: boolean;
}

const JournalEditor: React.FC<JournalEditorProps> = ({
    entryText,
    onTextChange,
    onSubmit,
    onCancel,
    isEditing,
    loading,
}) => {
    return (
        <div className="mb-8 bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                <Calendar className="w-4 h-4" />
                {isEditing ? "Editing entry" : formatDate(new Date().toISOString())}
            </div>
            <form onSubmit={onSubmit}>
                <textarea
                    value={entryText}
                    onChange={(e) => onTextChange(e.target.value)}
                    placeholder="What's on your mind today? Write about your progress, learnings, challenges..."
                    rows={6}
                    autoFocus
                    className="w-full bg-transparent text-white text-lg leading-relaxed placeholder-slate-600 focus:outline-none resize-none"
                />
                <div className="flex gap-3 mt-4 pt-4 border-t border-slate-700">
                    <button
                        type="submit"
                        disabled={loading || !entryText.trim()}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : isEditing ? "Update" : "Save Entry"}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2.5 text-slate-400 hover:text-white transition-all"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default JournalEditor;
