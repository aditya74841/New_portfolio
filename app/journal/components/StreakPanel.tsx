import React, { useState } from "react";
import { Flame, Plus, Trash2, Check } from "lucide-react";
import { Habit, HabitStreak } from "../types";
import { calculateHabitStreak } from "../storage";

interface StreakPanelProps {
    habits: Habit[];
    onAdd: (name: string, emoji: string, color: string) => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const PRESET_EMOJIS = ["📚", "💪", "🧘", "💻", "🎨", "🎵", "✍️", "🏃"];
const PRESET_COLORS = [
    "bg-orange-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-cyan-500",
];

const StreakPanel: React.FC<StreakPanelProps> = ({
    habits,
    onAdd,
    onToggle,
    onDelete,
}) => {
    const [showForm, setShowForm] = useState(false);
    const [newHabit, setNewHabit] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState("📚");
    const [selectedColor, setSelectedColor] = useState("bg-orange-500");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newHabit.trim()) {
            onAdd(newHabit.trim(), selectedEmoji, selectedColor);
            setNewHabit("");
            setShowForm(false);
        }
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-400" />
                    <h2 className="text-lg font-semibold text-white">Habit Streaks</h2>
                </div>
                <span className="text-xs text-slate-500">{habits.length} habits</span>
            </div>

            {/* Habits List */}
            <div className="space-y-3 max-h-[220px] overflow-y-auto mb-3">
                {habits.length === 0 ? (
                    <p className="text-slate-500 text-sm text-center py-4">
                        No habits yet. Create one!
                    </p>
                ) : (
                    habits.map((habit) => {
                        const streak: HabitStreak = calculateHabitStreak(habit);
                        return (
                            <div
                                key={habit.id}
                                className="group bg-slate-700/30 rounded-xl p-3 hover:bg-slate-700/50 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => onToggle(habit.id)}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${streak.completedToday
                                                    ? `${habit.color} text-white`
                                                    : "bg-slate-600 hover:bg-slate-500"
                                                }`}
                                        >
                                            {streak.completedToday ? (
                                                <Check className="w-5 h-5" />
                                            ) : (
                                                habit.emoji
                                            )}
                                        </button>
                                        <div>
                                            <div className="text-white text-sm font-medium">
                                                {habit.name}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {streak.completedToday ? "Done today ✓" : "Tap to complete"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <div className="flex items-center gap-1">
                                                <span className="text-lg font-bold text-orange-400">
                                                    {streak.currentStreak}
                                                </span>
                                                <Flame className="w-4 h-4 text-orange-400" />
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                Best: {streak.longestStreak}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => onDelete(habit.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Add Habit Form */}
            {showForm ? (
                <form onSubmit={handleSubmit} className="space-y-3 p-3 bg-slate-700/30 rounded-xl">
                    <input
                        type="text"
                        value={newHabit}
                        onChange={(e) => setNewHabit(e.target.value)}
                        placeholder="Habit name (e.g., Reading)"
                        autoFocus
                        className="w-full px-3 py-2 bg-slate-600/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />

                    {/* Emoji Selection */}
                    <div className="flex gap-1 flex-wrap">
                        {PRESET_EMOJIS.map((emoji) => (
                            <button
                                key={emoji}
                                type="button"
                                onClick={() => setSelectedEmoji(emoji)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all ${selectedEmoji === emoji
                                        ? "bg-slate-600 ring-2 ring-orange-400"
                                        : "bg-slate-700/50 hover:bg-slate-600"
                                    }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>

                    {/* Color Selection */}
                    <div className="flex gap-1">
                        {PRESET_COLORS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => setSelectedColor(color)}
                                className={`w-6 h-6 rounded-full ${color} transition-all ${selectedColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-slate-800" : ""
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex-1 px-3 py-2 bg-orange-500 text-slate-900 rounded-lg text-sm font-medium hover:bg-orange-400 transition-all"
                        >
                            Add Habit
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-3 py-2 text-slate-400 hover:text-white text-sm transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-slate-400 hover:text-orange-400 hover:bg-slate-700/30 rounded-lg transition-all text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Habit
                </button>
            )}
        </div>
    );
};

export default StreakPanel;
