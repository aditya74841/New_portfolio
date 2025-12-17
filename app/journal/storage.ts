import { Goal, Todo, Thought, Habit, HabitStreak, StreakData } from "./types";

const STORAGE_KEYS = {
    GOALS: "journal_goals",
    TODOS: "journal_todos",
    THOUGHTS: "journal_thoughts",
    HABITS: "journal_habits",
};

// Generate unique ID
export const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get today's date as YYYY-MM-DD
export const getTodayDate = (): string => {
    return new Date().toISOString().split("T")[0];
};

// Goals
export const getGoals = (): Goal[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.GOALS);
    return data ? JSON.parse(data) : [];
};

export const saveGoals = (goals: Goal[]): void => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
};

export const addGoal = (title: string): Goal => {
    const goals = getGoals();
    const newGoal: Goal = {
        id: generateId(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
    };
    goals.unshift(newGoal);
    saveGoals(goals);
    return newGoal;
};

export const toggleGoal = (id: string): void => {
    const goals = getGoals();
    const goal = goals.find((g) => g.id === id);
    if (goal) {
        goal.completed = !goal.completed;
        saveGoals(goals);
    }
};

export const deleteGoal = (id: string): void => {
    const goals = getGoals().filter((g) => g.id !== id);
    saveGoals(goals);
};

// Todos
export const getTodos = (): Todo[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.TODOS);
    return data ? JSON.parse(data) : [];
};

export const saveTodos = (todos: Todo[]): void => {
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
};

export const addTodo = (task: string): Todo => {
    const todos = getTodos();
    const newTodo: Todo = {
        id: generateId(),
        task,
        completed: false,
        date: new Date().toISOString(),
    };
    todos.unshift(newTodo);
    saveTodos(todos);
    return newTodo;
};

export const toggleTodo = (id: string): void => {
    const todos = getTodos();
    const todo = todos.find((t) => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
    }
};

export const deleteTodo = (id: string): void => {
    const todos = getTodos().filter((t) => t.id !== id);
    saveTodos(todos);
};

// Thoughts
export const getThoughts = (): Thought[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.THOUGHTS);
    return data ? JSON.parse(data) : [];
};

export const saveThoughts = (thoughts: Thought[]): void => {
    localStorage.setItem(STORAGE_KEYS.THOUGHTS, JSON.stringify(thoughts));
};

export const addThought = (content: string): Thought => {
    const thoughts = getThoughts();
    const newThought: Thought = {
        id: generateId(),
        content,
        createdAt: new Date().toISOString(),
    };
    thoughts.unshift(newThought);
    saveThoughts(thoughts);
    return newThought;
};

export const deleteThought = (id: string): void => {
    const thoughts = getThoughts().filter((t) => t.id !== id);
    saveThoughts(thoughts);
};

// Habits
export const getHabits = (): Habit[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.HABITS);
    return data ? JSON.parse(data) : [];
};

export const saveHabits = (habits: Habit[]): void => {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
};

export const addHabit = (name: string, emoji: string, color: string): Habit => {
    const habits = getHabits();
    const newHabit: Habit = {
        id: generateId(),
        name,
        emoji,
        color,
        completedDates: [],
        createdAt: new Date().toISOString(),
    };
    habits.push(newHabit);
    saveHabits(habits);
    return newHabit;
};

export const toggleHabitToday = (id: string): void => {
    const habits = getHabits();
    const habit = habits.find((h) => h.id === id);
    if (habit) {
        const today = getTodayDate();
        const index = habit.completedDates.indexOf(today);
        if (index > -1) {
            habit.completedDates.splice(index, 1);
        } else {
            habit.completedDates.push(today);
        }
        saveHabits(habits);
    }
};

export const deleteHabit = (id: string): void => {
    const habits = getHabits().filter((h) => h.id !== id);
    saveHabits(habits);
};

// Calculate streak for a habit
export const calculateHabitStreak = (habit: Habit): HabitStreak => {
    const today = getTodayDate();
    const completedToday = habit.completedDates.includes(today);

    if (habit.completedDates.length === 0) {
        return {
            currentStreak: 0,
            longestStreak: 0,
            totalCompletions: 0,
            completedToday: false,
        };
    }

    // Sort dates descending
    const sortedDates = [...habit.completedDates].sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    // Calculate current streak
    let currentStreak = 0;
    const todayTime = new Date(today).getTime();
    const yesterdayDate = new Date(todayTime - 86400000).toISOString().split("T")[0];

    // Check if streak is active (completed today or yesterday)
    if (sortedDates[0] === today || sortedDates[0] === yesterdayDate) {
        for (let i = 0; i < sortedDates.length; i++) {
            const expectedDate = new Date(todayTime - (i * 86400000)).toISOString().split("T")[0];
            const adjustedExpected = sortedDates[0] === yesterdayDate
                ? new Date(todayTime - ((i + 1) * 86400000)).toISOString().split("T")[0]
                : expectedDate;

            if (sortedDates.includes(adjustedExpected) || sortedDates.includes(expectedDate)) {
                currentStreak++;
            } else {
                break;
            }
        }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 1;

    const sortedAsc = [...habit.completedDates].sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    for (let i = 1; i < sortedAsc.length; i++) {
        const prev = new Date(sortedAsc[i - 1]).getTime();
        const curr = new Date(sortedAsc[i]).getTime();
        const diffDays = Math.round((curr - prev) / 86400000);

        if (diffDays === 1) {
            tempStreak++;
        } else {
            longestStreak = Math.max(longestStreak, tempStreak);
            tempStreak = 1;
        }
    }
    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

    return {
        currentStreak,
        longestStreak,
        totalCompletions: habit.completedDates.length,
        completedToday,
    };
};

// Legacy streak calculation (from thoughts)
export const calculateStreak = (thoughts: Thought[]): StreakData => {
    if (thoughts.length === 0) {
        return {
            currentStreak: 0,
            longestStreak: 0,
            totalEntries: 0,
            thisWeek: 0,
            lastEntryDate: null,
        };
    }

    // Sort by date descending
    const sorted = [...thoughts].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Get unique dates
    const uniqueDatesSet = new Set(
        sorted.map((t) => new Date(t.createdAt).toDateString())
    );
    const uniqueDates = Array.from(uniqueDatesSet);

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    // Calculate current streak
    let currentStreak = 0;
    const startDate = uniqueDates[0] === today || uniqueDates[0] === yesterday ? uniqueDates[0] : null;

    if (startDate) {
        for (let i = 0; i < uniqueDates.length; i++) {
            const expectedDate = new Date(Date.now() - (i * 86400000)).toDateString();
            const adjustedExpected = uniqueDates[0] === yesterday
                ? new Date(Date.now() - ((i + 1) * 86400000)).toDateString()
                : expectedDate;

            if (uniqueDates[i] === adjustedExpected || uniqueDates[i] === expectedDate) {
                currentStreak++;
            } else {
                break;
            }
        }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
        const prev = new Date(uniqueDates[i - 1]).getTime();
        const curr = new Date(uniqueDates[i]).getTime();
        const diffDays = Math.round((prev - curr) / 86400000);

        if (diffDays === 1) {
            tempStreak++;
        } else {
            longestStreak = Math.max(longestStreak, tempStreak);
            tempStreak = 1;
        }
    }
    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

    // This week entries
    const weekAgo = Date.now() - 7 * 86400000;
    const thisWeek = thoughts.filter(
        (t) => new Date(t.createdAt).getTime() > weekAgo
    ).length;

    return {
        currentStreak,
        longestStreak,
        totalEntries: thoughts.length,
        thisWeek,
        lastEntryDate: sorted[0]?.createdAt || null,
    };
};
