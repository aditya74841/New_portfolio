"use client";

import React from "react";
import { TrendingUp } from "lucide-react";

export const ProgressBar: React.FC<{ progress?: number }> = ({
  progress = 0,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5 text-xs font-mono">
        <span className="text-gray-400 flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5 text-gray-500" />
          Progress
        </span>
        <span className="text-white font-bold">{progress}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-700/50">
        <div
          className="bg-white h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
