


// Utility/TechStackBadges.tsx
import React from 'react';

export const TechStackBadges: React.FC<{ techStack: string[]; variant?: 'gradient' | 'white' | 'modern' }> = ({
  techStack,
  variant = 'gradient',
}) => {
  const badgeClass =
    variant === 'gradient'
      ? 'px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 rounded-full text-xs font-medium'
      : 'px-2 py-1 bg-white text-blue-800 rounded-full text-xs font-medium border border-blue-200';

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-1 sm:gap-2">
        {techStack.map((tech, index) => (
          <span key={index} className={badgeClass}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
// import React from 'react';

// export const TechStackBadges: React.FC<{ techStack: string[]; variant?: 'gradient' | 'white' | 'modern' }> = ({ techStack, variant = 'gradient' }) => {
//   const badgeClass =
//     variant === 'gradient'
//       ? 'px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 rounded-full text-xs font-medium'
//       : 'px-2 py-1 bg-white text-blue-800 rounded-full text-xs font-medium border border-blue-200';

//   return (
//     <div className="mb-4">
//       <div className="flex flex-wrap gap-1 sm:gap-2">
//         {techStack.map((tech, index) => (
//           <span key={index} className={badgeClass}>
//             {tech}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };
