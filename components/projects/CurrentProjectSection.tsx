"use client";

import React from "react";
import type { Project } from "./projectData";
import CurrentProjectCard from "./CurrentProjectCard";

type Props = {
  projects: Project[];
  isVisible: boolean;
};

const CurrentProjectsSection: React.FC<Props> = ({ projects, isVisible }) => {
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Currently Building
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Active projects in development leveraging cutting-edge web technologies and AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <CurrentProjectCard
            key={project.id}
            project={project}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
};

export default CurrentProjectsSection;
