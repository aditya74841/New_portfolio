"use client";

import React from "react";
import { Github, ExternalLink, Calendar, ArrowUpRight } from "lucide-react";
import { Project } from "./projectData";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const isHighComplexity = project.complexity === "High";
  const techStack = project.techStack ?? [];

  return (
    <div className="group flex flex-col bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300">
      {/* Header Bar */}
      <div className="px-6 py-3 border-b border-gray-800/80 bg-gray-950/60 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              project.status === "In Progress"
                ? "bg-amber-400 animate-pulse"
                : "bg-emerald-400"
            }`}
          />
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
            {project.category}
          </span>
        </div>
        {isHighComplexity && (
          <span className="text-[10px] font-mono font-bold text-gray-300 bg-gray-800 px-2 py-0.5 rounded border border-gray-700">
            COMPLEX
          </span>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors">
              {project.title}
            </h3>
            <div className="flex gap-3">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={18} />
                </a>
              )}
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="space-y-4">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5">
            {techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono text-gray-300 bg-gray-800/80 rounded-md border border-gray-700/50"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 5 && (
              <span className="px-2 py-1 text-xs font-mono text-gray-400 bg-gray-800/40 rounded-md border border-gray-800">
                +{techStack.length - 5}
              </span>
            )}
          </div>

          <div className="pt-4 border-t border-gray-800/80 flex justify-between items-center text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-gray-500" />
              <span>{project.completedDate || "Ongoing"}</span>
            </div>
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-1 text-white hover:text-gray-300 font-semibold transition-colors"
            >
              <span>Details</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
