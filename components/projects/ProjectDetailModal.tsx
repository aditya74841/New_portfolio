
// ProjectDetailModal.tsx
import React from 'react';
import { Github, ExternalLink, X } from 'lucide-react';
import type { Project } from './projectData';
import { TechStackBadges } from './Utility/TechStackBadges';

type Props = {
  project: Project;
  onClose: () => void;
};

const ProjectDetailModal: React.FC<Props> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8 text-white rounded-t-2xl flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-white/20 backdrop-blur">
              {project.icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{project.title}</h1>
              <p className="text-white/90">{project.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <p className="text-gray-600 text-sm font-medium">Progress</p>
              <p className="text-2xl font-bold text-blue-600">{project.progress || 0}%</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <p className="text-gray-600 text-sm font-medium">Status</p>
              <p className="text-sm font-bold text-purple-600">{project.status}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <p className="text-gray-600 text-sm font-medium">Priority</p>
              <p className="text-sm font-bold text-green-600 capitalize">{project.priority}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
              <p className="text-gray-600 text-sm font-medium">Expected</p>
              <p className="text-sm font-bold text-orange-600">{project.expectedCompletion}</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Technologies</h2>
            <TechStackBadges techStack={project.techStack || []} variant="white" />
          </div>

          {/* Project Details */}
          {project.longDescription && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">About This Project</h2>
              <p className="text-gray-600 leading-relaxed">{project.longDescription}</p>
            </div>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Details */}
          {project.technicalDetails && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">Technical Details</h2>
              <p className="text-gray-600 leading-relaxed">{project.technicalDetails}</p>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Challenges & Solutions</h2>
              <div className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">🎯 {challenge.problem}</p>
                    <p className="text-gray-600 text-sm">✓ {challenge.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
            {(project.githubLink || (project as any).githubUrl) && (
              <a
                href={project.githubLink || (project as any).githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-900 text-white font-medium transition-all duration-300 hover:shadow-lg"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            )}

            {(project.liveDemoLink || (project as any).liveUrl) && (
              <a
                href={project.liveDemoLink || (project as any).liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 hover:shadow-lg"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            )}

            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;