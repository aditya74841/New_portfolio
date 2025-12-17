import React from "react";
import { Trash2, Calendar } from "lucide-react";
import { Thought } from "../types";

interface PastEntriesProps {
    thoughts: Thought[];
    onDelete: (id: string) => void;
}

const PastEntries: React.FC<PastEntriesProps> = ({ thoughts, onDelete }) => {
    // Group thoughts by date
    const today = new Date().toDateString();
    const pastThoughts = thoughts.filter(
        (t) => new Date(t.createdAt).toDateString() !== today
    );

    // Group by date
    const grouped: { [key: string]: Thought[] } = {};
    pastThoughts.forEach((thought) => {
        const dateKey = new Date(thought.createdAt).toDateString();
        if (!grouped[dateKey]) {
            grouped[dateKey] = [];
        }
        grouped[dateKey].push(thought);
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (pastThoughts.length === 0) {
        return null;
    }

    return (
        <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="text-slate-400 text-sm font-medium">Past Entries</div>
                <div className="flex-1 h-px bg-slate-800" />
            </div>

            <div className="space-y-4">
                {Object.entries(grouped).map(([date, entries]) => (
                    <div key={date}>
                        <div className="flex items-center gap-2 text-amber-500 text-sm mb-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(date)}
                        </div>
                        <div className="space-y-2">
                            {entries.map((thought) => (
                                <div
                                    key={thought.id}
                                    className="group bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 transition-all"
                                >
                                    <div className="flex justify-between items-start gap-3">
                                        <p className="text-slate-300 text-sm leading-relaxed flex-1 whitespace-pre-wrap">
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
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PastEntries;
