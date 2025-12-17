export interface Goal {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
}

export interface Todo {
    id: string;
    task: string;
    completed: boolean;
    date: string;
}

export interface Thought {
    id: string;
    content: string;
    createdAt: string;
}

export interface Habit {
    id: string;
    name: string;
    emoji: string;
    color: string;
    completedDates: string[]; // Array of date strings (YYYY-MM-DD)
    createdAt: string;
}

export interface HabitStreak {
    currentStreak: number;
    longestStreak: number;
    totalCompletions: number;
    completedToday: boolean;
}

export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    totalEntries: number;
    thisWeek: number;
    lastEntryDate: string | null;
}
