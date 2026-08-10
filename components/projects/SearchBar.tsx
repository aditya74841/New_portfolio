"use client";

import React from "react";
import { Search, X } from "lucide-react";

type Props = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Search projects by title or technology...",
}) => {
  const handleClear = () => setSearchTerm("");

  return (
    <div className="relative mb-6">
      <div className="max-w-md mx-auto">
        <div className="relative flex items-center bg-gray-900 rounded-xl border border-gray-800 focus-within:border-gray-600 transition-colors">
          <Search className="absolute left-4 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="absolute right-3.5 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
