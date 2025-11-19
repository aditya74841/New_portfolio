import React from 'react';
import { Github, ExternalLink, Code } from 'lucide-react';
import type { Project } from '../projectData';

export const ActionButtons: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {project.githubLink && (
        <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:shadow-lg hover:from-gray-900 hover:to-black transition-all duration-300 text-sm font-semibold shadow-md">
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      )}

      {project.liveDemoLink && (
        <a href={project.liveDemoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm font-semibold shadow-md flex-1">
          <ExternalLink className="w-4 h-4" />
          <span className="hidden sm:inline">Live Demo</span>
        </a>
      )}

      {project.apiDocsLink && (
        <a href={project.apiDocsLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl hover:shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 text-sm font-semibold shadow-md">
          <Code className="w-4 h-4" />
          <span className="hidden sm:inline">API Docs</span>
        </a>
      )}

      {!project.githubLink && !project.liveDemoLink && !project.apiDocsLink && (
        <div className="flex-1 bg-gray-100 text-gray-400 px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed">
          <ExternalLink className="w-4 h-4" />
          No Links Available
        </div>
      )}
    </div>
  );
};
