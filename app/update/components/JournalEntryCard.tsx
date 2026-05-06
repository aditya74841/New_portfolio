import React from "react";
import { Edit2, Trash2, Heart, Smile, Meh, Frown, Monitor, Clock } from "lucide-react";
import { JournalEntry } from "./types";

interface JournalEntryCardProps {
    entry: JournalEntry;
    onEdit: (entry: JournalEntry) => void;
    onDelete: (id: string) => void;
}

const moodIcons: Record<string, any> = {
    great: { icon: Heart, color: "text-rose-400" },
    good: { icon: Smile, color: "text-emerald-400" },
    okay: { icon: Meh, color: "text-amber-400" },
    bad: { icon: Frown, color: "text-indigo-400" },
};

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({
    entry,
    onEdit,
    onDelete,
}) => {
    const MoodIcon = moodIcons[entry.mood]?.icon || Smile;
    const moodColor = moodIcons[entry.mood]?.color || "text-slate-400";

    return (
        <div className="group relative bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-slate-950/50">
            <div className="flex justify-between items-start gap-6 mb-6">
                <div className="flex-1">
                    <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap font-medium tracking-tight">
                        {entry.update}
                    </p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                        onClick={() => onEdit(entry)}
                        className="size-10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 rounded-2xl transition-all"
                        title="Edit Reflection"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(entry._id)}
                        className="size-10 flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-2xl transition-all"
                        title="Delete Reflection"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-6 pt-6 border-t border-slate-800/50">
                <div className="flex flex-wrap items-center gap-8">
                    {entry.mood && (
                        <div className="flex items-center gap-3">
                            <div className={`size-10 rounded-2xl bg-slate-800/50 flex items-center justify-center ${moodColor}`}>
                                <MoodIcon className="size-5" />
                            </div>
                            <div>
                                <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Mood</span>
                                <span className={`text-sm font-bold capitalize ${moodColor}`}>{entry.mood}</span>
                                {entry.why && (
                                    <span className="block text-[11px] text-slate-400 font-medium italic mt-0.5 line-clamp-1">
                                        &ldquo;{entry.why}&rdquo;
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {entry.screenTime && (entry.screenTime.hours > 0 || entry.screenTime.minutes > 0) && (
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <Monitor className="size-5" />
                            </div>
                            <div>
                                <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Screen</span>
                                <span className="text-sm font-bold text-blue-400">
                                    {entry.screenTime.hours}h {entry.screenTime.minutes}m
                                </span>
                                {entry.screenTime.note && (
                                    <span className="block text-[11px] text-slate-400 font-medium italic mt-0.5 line-clamp-1">
                                        &ldquo;{entry.screenTime.note}&rdquo;
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="size-3" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                            {new Date(entry.createdAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                            })}
                        </span>
                    </div>
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />
                </div>
            </div>
        </div>
    );
};

export default JournalEntryCard;
