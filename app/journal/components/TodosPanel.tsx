import React, { useState } from "react";
import { CheckSquare, Plus, Check, Trash2, Square } from "lucide-react";
import { Todo } from "../types";

interface TodosPanelProps {
    todos: Todo[];
    onAdd: (task: string) => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodosPanel: React.FC<TodosPanelProps> = ({
    todos,
    onAdd,
    onToggle,
    onDelete,
}) => {
    const [newTodo, setNewTodo] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodo.trim()) {
            onAdd(newTodo.trim());
            setNewTodo("");
            setShowInput(false);
        }
    };

    // Get today's todos first, then others
    const today = new Date().toDateString();
    const sortedTodos = [...todos].sort((a, b) => {
        const aIsToday = new Date(a.date).toDateString() === today;
        const bIsToday = new Date(b.date).toDateString() === today;
        if (aIsToday && !bIsToday) return -1;
        if (!aIsToday && bIsToday) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const completedCount = todos.filter((t) => t.completed).length;

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-green-400" />
                    <h2 className="text-lg font-semibold text-white">Today&apos;s Todos</h2>
                </div>
                <span className="text-xs text-slate-500">
                    {completedCount}/{todos.length}
                </span>
            </div>

            <div className="space-y-2 max-h-[200px] overflow-y-auto mb-3">
                {sortedTodos.length === 0 ? (
                    <p className="text-slate-500 text-sm text-center py-4">
                        No todos yet
                    </p>
                ) : (
                    sortedTodos.map((todo) => (
                        <div
                            key={todo.id}
                            className="flex items-center gap-3 group p-2 rounded-lg hover:bg-slate-700/30 transition-all"
                        >
                            <button
                                onClick={() => onToggle(todo.id)}
                                className={`w-5 h-5 rounded flex items-center justify-center transition-all ${todo.completed
                                        ? "text-green-400"
                                        : "text-slate-600 hover:text-green-400"
                                    }`}
                            >
                                {todo.completed ? (
                                    <CheckSquare className="w-5 h-5" />
                                ) : (
                                    <Square className="w-5 h-5" />
                                )}
                            </button>
                            <span
                                className={`flex-1 text-sm ${todo.completed
                                        ? "text-slate-500 line-through"
                                        : "text-slate-300"
                                    }`}
                            >
                                {todo.task}
                            </span>
                            <button
                                onClick={() => onDelete(todo.id)}
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
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter task..."
                        autoFocus
                        className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-green-500"
                    />
                    <button
                        type="submit"
                        className="px-3 py-2 bg-green-500 text-slate-900 rounded-lg text-sm font-medium hover:bg-green-400 transition-all"
                    >
                        Add
                    </button>
                </form>
            ) : (
                <button
                    onClick={() => setShowInput(true)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-slate-400 hover:text-green-400 hover:bg-slate-700/30 rounded-lg transition-all text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Todo
                </button>
            )}
        </div>
    );
};

export default TodosPanel;
