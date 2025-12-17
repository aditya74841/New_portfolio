import React, { useState } from "react";
import { Target, Plus, Check, Trash2 } from "lucide-react";
import { Goal } from "../types";

interface GoalsPanelProps {
    goals: Goal[];
    onAdd: (title: string) => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const GoalsPanel: React.FC<GoalsPanelProps> = ({
    goals,
    onAdd,
    onToggle,
    onDelete,
}) => {
    const [newGoal, setNewGoal] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newGoal.trim()) {
            onAdd(newGoal.trim());
            setNewGoal("");
            setShowInput(false);
        }
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-400" />
                    <h2 className="text-lg font-semibold text-white">Goals</h2>
                </div>
                <span className="text-xs text-slate-500">
                    {goals.filter((g) => g.completed).length}/{goals.length}
                </span>
            </div>

            <div className="space-y-2 max-h-[200px] overflow-y-auto mb-3">
                {goals.length === 0 ? (
                    <p className="text-slate-500 text-sm text-center py-4">
                        No goals yet
                    </p>
                ) : (
                    goals.map((goal) => (
                        <div
                            key={goal.id}
                            className="flex items-center gap-3 group p-2 rounded-lg hover:bg-slate-700/30 transition-all"
                        >
                            <button
                                onClick={() => onToggle(goal.id)}
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${goal.completed
                                        ? "bg-amber-500 border-amber-500"
                                        : "border-slate-600 hover:border-amber-400"
                                    }`}
                            >
                                {goal.completed && <Check className="w-3 h-3 text-slate-900" />}
                            </button>
                            <span
                                className={`flex-1 text-sm ${goal.completed
                                        ? "text-slate-500 line-through"
                                        : "text-slate-300"
                                    }`}
                            >
                                {goal.title}
                            </span>
                            <button
                                onClick={() => onDelete(goal.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {showInput ? (
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        placeholder="Enter goal..."
                        autoFocus
                        className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    <button
                        type="submit"
                        className="px-3 py-2 bg-amber-500 text-slate-900 rounded-lg text-sm font-medium hover:bg-amber-400 transition-all"
                    >
                        Add
                    </button>
                </form>
            ) : (
                <button
                    onClick={() => setShowInput(true)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-slate-400 hover:text-amber-400 hover:bg-slate-700/30 rounded-lg transition-all text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Goal
                </button>
            )}
        </div>
    );
};

export default GoalsPanel;
