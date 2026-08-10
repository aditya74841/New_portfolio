"use client";

import React from "react";
import { Calendar, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "./projectData";
import { ProgressBar } from "./Utility/ProgressBar";
import Link from "next/link";

type Props = {
  project: Project;
  index: number;
  isVisible: boolean;
};

const CurrentProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {project.title}
            </h3>
            <p className="text-xs font-mono text-gray-400">
              {project.category}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {project.status || "In Progress"}
          </span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="mb-6">
          <ProgressBar progress={project.progress || 50} />
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {(project.techStack || []).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono text-gray-300 bg-gray-800 rounded-md border border-gray-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center text-xs text-gray-400 bg-gray-950/60 rounded-xl p-3 mb-4 border border-gray-800/80">
          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
          <span>
            Expected Completion: <span className="text-white font-mono">{project.expectedCompletion}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 pt-2">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 text-gray-200 text-xs font-semibold hover:bg-gray-700 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
          {project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-gray-950 text-xs font-bold hover:bg-gray-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-gray-300 ml-auto transition-colors"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CurrentProjectCard;
