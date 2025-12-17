"use client";
import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, Flame } from "lucide-react";
import GoalsPanel from "./components/GoalsPanel";
import TodosPanel from "./components/TodosPanel";
import ThoughtsPanel from "./components/ThoughtsPanel";
import StreakPanel from "./components/StreakPanel";
import PastEntries from "./components/PastEntries";
import { Goal, Todo, Thought, Habit } from "./types";
import {
    getGoals,
    addGoal,
    toggleGoal,
    deleteGoal,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    getThoughts,
    addThought,
    deleteThought,
    getHabits,
    addHabit,
    toggleHabitToday,
    deleteHabit,
    calculateHabitStreak,
} from "./storage";

const JournalPage: React.FC = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [thoughts, setThoughts] = useState<Thought[]>([]);
    const [habits, setHabits] = useState<Habit[]>([]);

    // Load data on mount
    useEffect(() => {
        setGoals(getGoals());
        setTodos(getTodos());
        setThoughts(getThoughts());
        setHabits(getHabits());
    }, []);

    // Goals handlers
    const handleAddGoal = useCallback((title: string) => {
        addGoal(title);
        setGoals(getGoals());
    }, []);

    const handleToggleGoal = useCallback((id: string) => {
        toggleGoal(id);
        setGoals(getGoals());
    }, []);

    const handleDeleteGoal = useCallback((id: string) => {
        deleteGoal(id);
        setGoals(getGoals());
    }, []);

    // Todos handlers
    const handleAddTodo = useCallback((task: string) => {
        addTodo(task);
        setTodos(getTodos());
    }, []);

    const handleToggleTodo = useCallback((id: string) => {
        toggleTodo(id);
        setTodos(getTodos());
    }, []);

    const handleDeleteTodo = useCallback((id: string) => {
        deleteTodo(id);
        setTodos(getTodos());
    }, []);

    // Thoughts handlers
    const handleAddThought = useCallback((content: string) => {
        addThought(content);
        setThoughts(getThoughts());
    }, []);

    const handleDeleteThought = useCallback((id: string) => {
        deleteThought(id);
        setThoughts(getThoughts());
    }, []);

    // Habits handlers
    const handleAddHabit = useCallback((name: string, emoji: string, color: string) => {
        addHabit(name, emoji, color);
        setHabits(getHabits());
    }, []);

    const handleToggleHabit = useCallback((id: string) => {
        toggleHabitToday(id);
        setHabits(getHabits());
    }, []);

    const handleDeleteHabit = useCallback((id: string) => {
        deleteHabit(id);
        setHabits(getHabits());
    }, []);

    // Calculate total active streaks
    const activeStreaks = habits.filter(
        (h) => calculateHabitStreak(h).currentStreak > 0
    ).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">My Journal</h1>
                            <p className="text-slate-500 text-sm">
                                Track your goals, thoughts, and habits
                            </p>
                        </div>
                    </div>
                    {activeStreaks > 0 && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-xl">
                            <Flame className="w-5 h-5 text-orange-400" />
                            <span className="text-orange-400 font-semibold">
                                {activeStreaks} Active {activeStreaks === 1 ? "Streak" : "Streaks"}
                            </span>
                        </div>
                    )}
                </div>

                {/* 4-Panel Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Goals */}
                    <GoalsPanel
                        goals={goals}
                        onAdd={handleAddGoal}
                        onToggle={handleToggleGoal}
                        onDelete={handleDeleteGoal}
                    />

                    {/* Thoughts */}
                    <ThoughtsPanel
                        thoughts={thoughts}
                        onAdd={handleAddThought}
                        onDelete={handleDeleteThought}
                    />

                    {/* Todos */}
                    <TodosPanel
                        todos={todos}
                        onAdd={handleAddTodo}
                        onToggle={handleToggleTodo}
                        onDelete={handleDeleteTodo}
                    />

                    {/* Habit Streaks */}
                    <StreakPanel
                        habits={habits}
                        onAdd={handleAddHabit}
                        onToggle={handleToggleHabit}
                        onDelete={handleDeleteHabit}
                    />
                </div>

                {/* Past Entries */}
                <PastEntries thoughts={thoughts} onDelete={handleDeleteThought} />
            </div>
        </div>
    );
};

export default JournalPage;
