"use client"

import React, { useState } from 'react';
import { Eye, Star, Clock, ExternalLink, Github } from 'lucide-react';
import type { Project } from './projectData';
import { TechStackBadges } from './Utility/TechStackBadges';
import { ActionButtons } from './Utility/ActionButtons';

type Props = {
  project: Project;
  index: number;
  isVisible: boolean;
};

const ProjectCard: React.FC<Props> = ({ project, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] border border-gray-100 ${
        isVisible ? 'animate-fadeInUp' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${index * 150}ms`,
        height: '520px',
        minHeight: '520px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative bg-linear-to-br ${project.gradient} overflow-hidden`}
        style={{ height: '180px' }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-12 right-8 w-16 h-16 bg-white rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-8 left-12 w-12 h-12 bg-white rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-6xl font-black opacity-40 transform group-hover:scale-110 transition-transform duration-500">
            {project.title.charAt(0)}
          </div>
        </div>

        <div className="absolute top-4 left-4 flex gap-3">
          <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5" />
            {project.views}
          </div>
          <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
            <Star className="w-3.5 h-3.5" />
            {project.stars}
          </div>
        </div>

        <div className="absolute top-4 right-4 bg-white/25 backdrop-blur-lg border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
          {project.category}
        </div>

        <div className={`absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.liveDemoLink && (
                <button
                  onClick={() => window.open(project.liveDemoLink, '_blank')}
                  className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
              {project.githubLink && (
                <button
                  onClick={() => window.open(project.githubLink, '_blank')}
                  className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col" style={{ height: '340px' }}>
        <div className="flex items-start justify-between mb-4" style={{ minHeight: '52px' }}>
          <div className="flex-1 pr-3">
            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">{project.duration}</span>
          </div>
        </div>

        <div className="mb-5" style={{ height: '84px' }}>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 overflow-hidden">{project.description}</p>
        </div>

        <div className="mb-5" style={{ minHeight: '48px' }}>
          <div className="flex flex-wrap gap-2">
            <TechStackBadges techStack={project.techStack || []} variant="modern" />
          </div>
        </div>

        <div className="mb-5" style={{ minHeight: '44px' }}>
          <ActionButtons project={project} />
        </div>
      </div>

      <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
    </div>
  );
};

export default ProjectCard;
