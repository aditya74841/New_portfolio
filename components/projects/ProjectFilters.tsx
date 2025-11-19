import React from 'react';
import { Filter } from 'lucide-react';
import type { Category } from './projectData';

type Props = {
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  categories: Category[];
};

const ProjectFilters: React.FC<Props> = ({ activeFilter, setActiveFilter, categories }) => {
  return (
    <div className="mb-8 sm:mb-12">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 text-gray-700 mb-4">
          <Filter className="w-5 h-5" />
          <h3 className="text-xl sm:text-2xl font-bold">Explore by Category</h3>
        </div>
        <p className="text-gray-600">Filter projects to find exactly what you're looking for</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {categories.map((category) => (
          <FilterButton key={category.id} category={category} isActive={activeFilter === category.id} onClick={() => setActiveFilter(category.id)} />
        ))}
      </div>
    </div>
  );
};

const FilterButton: React.FC<{ category: Category; isActive: boolean; onClick: () => void }> = ({ category, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
      isActive ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300'
    }`}
  >
    <span className="flex items-center gap-2">
      <span>{category.icon}</span>
      <span className="hidden sm:inline">{category.name}</span>
      <span className="sm:hidden">{category.name.split(' ')[0]}</span>
      <span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">{category.count}</span>
    </span>
  </button>
);

export default ProjectFilters;
