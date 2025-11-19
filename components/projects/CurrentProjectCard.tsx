"use client";

import React from 'react';
import { Calendar, Github, ExternalLink, BookOpen } from 'lucide-react';
import type { Project } from './projectData';
import { ProgressBar } from './Utility/ProgressBar';
import { TechStackBadges } from './Utility/TechStackBadges';

type Props = {
  project: Project;
  index: number;
  isVisible: boolean;
  onLearnMore?: () => void;
};

const CurrentProjectCard: React.FC<Props> = ({ project, index, isVisible, onLearnMore }) => {
  return (
    <div
      className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group ${
        isVisible ? 'animate-fadeInUp' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-full bg-gradient-to-r ${
                project.priority === 'high'
                  ? 'from-red-500 to-orange-500'
                  : project.priority === 'medium'
                    ? 'from-yellow-500 to-amber-500'
                    : 'from-green-500 to-emerald-500'
              } text-white transition-transform duration-300 group-hover:scale-110`}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">{project.title}</h3>
            </div>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">{project.description}</p>

        <ProgressBar progress={project.progress || 0} />

        <TechStackBadges techStack={project.techStack || []} variant="white" />

        <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mt-4 mb-6">
          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
          <span>
            Expected completion: <span className="font-semibold">{project.expectedCompletion}</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {(project.githubLink || (project as any).githubUrl) && (
            <a
              href={project.githubLink || (project as any).githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium text-sm transition-all duration-300 hover:shadow-lg"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}

          {(project.liveDemoLink || (project as any).liveUrl) && (
            <a
              href={project.liveDemoLink || (project as any).liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all duration-300 hover:shadow-lg"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}

          {onLearnMore && (
            <button
              onClick={onLearnMore}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition-all duration-300 hover:shadow-lg"
            >
              <BookOpen className="w-4 h-4" />
              Learn More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status?: string }> = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      status === 'In Development'
        ? 'bg-yellow-100 text-yellow-800'
        : status === 'Planning'
          ? 'bg-blue-100 text-blue-800'
          : 'bg-green-100 text-green-800'
    }`}
  >
    {status}
  </span>
);

export default CurrentProjectCard;

