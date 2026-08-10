"use client";

import React from "react";
import { Filter } from "lucide-react";
import type { Category } from "./projectData";

type Props = {
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  categories: Category[];
};

const ProjectFilters: React.FC<Props> = ({
  activeFilter,
  setActiveFilter,
  categories,
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
              activeFilter === category.id
                ? "bg-white text-gray-950 font-bold shadow"
                : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700 hover:text-white"
            }`}
          >
            <span>{category.name}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activeFilter === category.id
                  ? "bg-gray-950 text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilters;
