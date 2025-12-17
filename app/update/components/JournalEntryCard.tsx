import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { JournalEntry } from "./types";

interface JournalEntryCardProps {
    entry: JournalEntry;
    onEdit: (entry: JournalEntry) => void;
    onDelete: (id: string) => void;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({
    entry,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="group bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 rounded-xl p-5 transition-all">
            <div className="flex justify-between items-start gap-4">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap flex-1">
                    {entry.update}
                </p>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(entry)}
                        className="p-2 text-slate-500 hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-all"
                        title="Edit"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(entry._id)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="text-slate-600 text-xs mt-3">
                {new Date(entry.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>
        </div>
    );
};

export default JournalEntryCard;
