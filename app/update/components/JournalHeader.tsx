import React from "react";
import { BookOpen, Plus, X } from "lucide-react";

interface JournalHeaderProps {
    entryCount: number;
    showEditor: boolean;
    onToggleEditor: () => void;
}

const JournalHeader: React.FC<JournalHeaderProps> = ({
    entryCount,
    showEditor,
    onToggleEditor,
}) => {
    return (
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">My Dev Journal</h1>
                    <p className="text-slate-500 text-sm">{entryCount} entries</p>
                </div>
            </div>
            <button
                onClick={onToggleEditor}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl font-medium transition-all"
            >
                {showEditor ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {showEditor ? "Close" : "New Entry"}
            </button>
        </div>
    );
};

export default JournalHeader;
