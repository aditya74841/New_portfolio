import React from 'react';
import type { Project } from './projectData';
import ProjectCard from './ProjectCard';

type Props = {
  projects: Project[];
  isVisible: boolean;
};

const CompletedProjectsSection: React.FC<Props> = ({ projects, isVisible }) => {
  return (
    <div className="mb-12 sm:mb-20">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Completed Projects</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">A showcase of {projects.length} successful projects that demonstrate my skills and creativity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} isVisible={isVisible} />
        ))}
      </div>
    </div>
  );
};

export default CompletedProjectsSection;
