import React from "react";
import { Search } from "lucide-react";

interface JournalSearchProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const JournalSearch: React.FC<JournalSearchProps> = ({
    searchTerm,
    onSearchChange,
}) => {
    return (
        <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-all"
            />
        </div>
    );
};

export default JournalSearch;
