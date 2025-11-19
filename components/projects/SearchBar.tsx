import React from 'react';
import { Search, X } from 'lucide-react';

type Props = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({ searchTerm, setSearchTerm, placeholder = 'Search projects...' }) => {
  const handleClear = () => setSearchTerm('');

  return (
    <div className="relative mb-8">
      <div className="max-w-md mx-auto">
        <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <Search className="absolute left-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
          {searchTerm && (
            <button onClick={handleClear} className="absolute right-4 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <X className="w-full h-full" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
