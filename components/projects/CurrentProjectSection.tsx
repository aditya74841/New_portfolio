// import React from 'react';
// import type { Project } from './projectData';
// import CurrentProjectCard from './CurrentProjectCard';

// type Props = {
//   projects: Project[];
//   isVisible: boolean;
// };

// const CurrentProjectsSection: React.FC<Props> = ({ projects, isVisible }) => {
//   return (
//     <div className="mb-12 sm:mb-20">
//       <div className="text-center mb-8 sm:mb-12">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Currently Building</h2>
//         <p className="text-gray-600 max-w-2xl mx-auto">Exciting projects in development that showcase cutting-edge technologies and innovative solutions</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
//         {projects.map((project, index) => (
//           <CurrentProjectCard key={project.id} project={project} index={index} isVisible={isVisible} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CurrentProjectsSection;

// CurrentProjectsSection.tsx
import React, { useState } from 'react';
import type { Project } from './projectData';
import CurrentProjectCard from './CurrentProjectCard';
import ProjectDetailModal from './ProjectDetailModal';

type Props = {
  projects: Project[];
  isVisible: boolean;
};

const CurrentProjectsSection: React.FC<Props> = ({ projects, isVisible }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <>
      <div className="mb-12 sm:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Currently Building
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Exciting projects in development that showcase cutting-edge technologies and
            innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <CurrentProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
              onLearnMore={() => setSelectedProjectId(project.id)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProjectId(null)} />
      )}
    </>
  );
};

export default CurrentProjectsSection;
