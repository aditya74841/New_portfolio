"use client";

import React from "react";
import type { Project } from "./projectData";
import ProjectCard from "./ProjectCard";

type Props = {
  projects: Project[];
  isVisible: boolean;
};

const CompletedProjectsSection: React.FC<Props> = ({ projects }) => {
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Completed Projects
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          A showcase of {projects.length} applications and libraries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default CompletedProjectsSection;
