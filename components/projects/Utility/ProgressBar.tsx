
import React from 'react';
import { TrendingUp } from 'lucide-react';

export const ProgressBar: React.FC<{ progress?: number }> = ({ progress = 0 }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          Progress
        </span>
        <span className="text-sm font-bold text-gray-800">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// import React from 'react';
// import { TrendingUp } from 'lucide-react';

// export const ProgressBar: React.FC<{ progress?: number }> = ({ progress = 0 }) => {
//   return (
//     <div className="mb-6">
//       <div className="flex justify-between items-center mb-2">
//         <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
//           <TrendingUp className="w-4 h-4" />
//           Progress
//         </span>
//         <span className="text-sm font-bold text-gray-800">{progress}%</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
//         <div className="bg-linear-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
//       </div>
//     </div>
//   );
// };
