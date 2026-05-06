export interface JournalEntry {
    _id: string;
    title: string;
    date: string;
    update: string;
    mood: string;
    why?: string;
    screenTime?: { hours: number; minutes: number };
    qas: Array<{ question: string; answer: string }>;
    createdAt: string;
    updatedAt: string;
}
