import React from "react";
import {
  Github,
  ExternalLink,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { Project } from "./projectData";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const isHighComplexity = project.complexity === "High";
  const techStack = project.techStack ?? [];

  return (
    <div className="group relative flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300/50 transition-all duration-300">
      {/* Top Status Bar */}
      <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              project.status === "In Progress"
                ? "bg-amber-500 animate-pulse"
                : "bg-emerald-500"
            }`}
          />
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            {project.category}
          </span>
        </div>
        {isHighComplexity && (
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
            COMPLEX
          </span>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-900"
              >
                <Github size={18} />
              </a>
            )}
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-blue-600"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-auto space-y-4">
          {/* Tech Stack Badges - Compact Style */}
          <div>
            <div className="flex flex-wrap gap-1.5">
              {techStack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-md border border-slate-200"
                >
                  {tech}
                </span>
              ))}
              {techStack.length > 5 && (
                <span className="px-2 py-1 text-xs font-medium text-slate-400 bg-slate-50 rounded-md border border-slate-100">
                  +{techStack.length - 5}
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              {project.completedDate || "Ongoing"}
            </div>
            <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer transition-colors">
              <Link
                href={`/projects/details/`}
                className="flex items-center gap-1"
              >
                View Details <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
};

export default ProjectCard;

// "use client"

// import React, { useState } from 'react';
// import { Eye, Star, Clock, ExternalLink, Github } from 'lucide-react';
// import type { Project } from './projectData';
// import { TechStackBadges } from './Utility/TechStackBadges';
// import { ActionButtons } from './Utility/ActionButtons';

// type Props = {
//   project: Project;
//   index: number;
//   isVisible: boolean;
// };

// const ProjectCard: React.FC<Props> = ({ project, index, isVisible }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className={`group relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:scale-[1.02] border border-gray-100 ${
//         isVisible ? 'animate-fadeInUp' : 'opacity-0'
//       }`}
//       style={{
//         animationDelay: `${index * 150}ms`,
//         height: '520px',
//         minHeight: '520px',
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div
//         className={`relative bg-linear-to-br ${project.gradient} overflow-hidden`}
//         style={{ height: '180px' }}
//       >
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full opacity-10 animate-pulse"></div>
//           <div className="absolute top-12 right-8 w-16 h-16 bg-white rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
//           <div className="absolute bottom-8 left-12 w-12 h-12 bg-white rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
//         </div>

//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-white text-6xl font-black opacity-40 transform group-hover:scale-110 transition-transform duration-500">
//             {project.title.charAt(0)}
//           </div>
//         </div>

//         <div className="absolute top-4 left-4 flex gap-3">
//           <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
//             <Eye className="w-3.5 h-3.5" />
//             {project.views}
//           </div>
//           <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
//             <Star className="w-3.5 h-3.5" />
//             {project.stars}
//           </div>
//         </div>

//         <div className="absolute top-4 right-4 bg-white/25 backdrop-blur-lg border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
//           {project.category}
//         </div>

//         <div className={`absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent transition-all duration-500 ${
//           isHovered ? 'opacity-100' : 'opacity-0'
//         }`}>
//           <div className="absolute bottom-4 left-4 right-4">
//             <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               {project.liveDemoLink && (
//                 <button
//                   onClick={() => window.open(project.liveDemoLink, '_blank')}
//                   className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-colors"
//                 >
//                   <ExternalLink className="w-4 h-4" />
//                 </button>
//               )}
//               {project.githubLink && (
//                 <button
//                   onClick={() => window.open(project.githubLink, '_blank')}
//                   className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-colors"
//                 >
//                   <Github className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6 flex flex-col" style={{ height: '340px' }}>
//         <div className="flex items-start justify-between mb-4" style={{ minHeight: '52px' }}>
//           <div className="flex-1 pr-3">
//             <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
//               {project.title}
//             </h3>
//           </div>
//           <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
//             <Clock className="w-3.5 h-3.5" />
//             <span className="font-medium">{project.duration}</span>
//           </div>
//         </div>

//         <div className="mb-5" style={{ height: '84px' }}>
//           <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 overflow-hidden">{project.description}</p>
//         </div>

//         <div className="mb-5" style={{ minHeight: '48px' }}>
//           <div className="flex flex-wrap gap-2">
//             <TechStackBadges techStack={project.techStack || []} variant="modern" />
//           </div>
//         </div>

//         <div className="mb-5" style={{ minHeight: '44px' }}>
//           <ActionButtons project={project} />
//         </div>
//       </div>

//       <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
//     </div>
//   );
// };

// export default ProjectCard;
