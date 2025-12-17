import React from "react";
import { BookOpen } from "lucide-react";
import { JournalEntry } from "./types";
import JournalEntryCard from "./JournalEntryCard";
import { formatDate } from "./utils";

interface JournalEntryListProps {
    groupedEntries: { [key: string]: JournalEntry[] };
    loading: boolean;
    searchTerm: string;
    onEdit: (entry: JournalEntry) => void;
    onDelete: (id: string) => void;
}

const JournalEntryList: React.FC<JournalEntryListProps> = ({
    groupedEntries,
    loading,
    searchTerm,
    onEdit,
    onDelete,
}) => {
    const hasEntries = Object.keys(groupedEntries).length > 0;

    if (loading && !hasEntries) {
        return (
            <div className="text-center py-12 text-slate-500">
                Loading journal...
            </div>
        );
    }

    if (!hasEntries) {
        return (
            <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">
                    {searchTerm ? "No entries found" : "Your journal is empty"}
                </p>
                {!searchTerm && (
                    <p className="text-slate-600 text-sm mt-2">
                        Click &quot;New Entry&quot; to write your first entry
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {Object.entries(groupedEntries).map(([date, dayEntries]) => (
                <div key={date}>
                    {/* Date Header */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="text-amber-500 text-sm font-medium">
                            {formatDate(dayEntries[0].createdAt)}
                        </div>
                        <div className="flex-1 h-px bg-slate-800" />
                    </div>

                    {/* Day's Entries */}
                    <div className="space-y-3">
                        {dayEntries.map((entry) => (
                            <JournalEntryCard
                                key={entry._id}
                                entry={entry}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JournalEntryList;
