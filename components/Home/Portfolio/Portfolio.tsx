"use client";
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaEye,
  FaCode,
  FaStar,
} from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";
import { IconType } from "react-icons";

import IMG1 from "../../../assets/meta_tag.png";
import IMG2 from "../../../assets/aiVideoSummarizer.png";
import IMG3 from "../../../assets/to-do.png";
import IMG8 from "../../../assets/auditImage.png";

// Type definitions
interface Project {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  githubLink: string;
  liveDemoLink?: string;
  technologies: string[];
  featured: boolean;
  category: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const Portfolio: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("portfolio");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Featured projects - your best work
  const featuredProjects: Project[] = [
    {
      id: 1,
      imgSrc: IMG1.src,
      title: "MetaForge - Create any metatags for your website",
      description:
        "Metagorge simplifies website SEO by instantly generating perfect, optimized meta tags, titles, and descriptions to boost your search ranking.",
      githubLink: "https://github.com/aditya74841/Meta_tag_generator",
      liveDemoLink: "https://metaforge.allaboutcse.com/",
      technologies: ["React", "Nextjs.js", "Tailwindcss",  "Shadcn"],
      featured: true,
      category: "Frontend",
    },
    {
      id: 2,
      imgSrc: IMG8.src,
      title: "Audit management system",
      description:
        "End-to-end audit system for companies, enabling standardized audits across locations with multimedia support for detailed, flexible submissions.",
      githubLink: "https://github.com/aditya74841/Url_Shortner",
      liveDemoLink: "https://audit.iamadityaranjan.com/",
      technologies: ["React", "Node.js", "MongoDB", "Express", "cloudinary", "Nextjs"],
      featured: true,
      category: "Full Stack",
    },
    {
      id: 3,
      imgSrc: IMG2.src,
      title: "Video Summarizer using ai",
      description:
        "This AI tool quickly watches videos and reads the transcript to create a short summary, helping you save time.",
      githubLink: "https://github.com/aditya74841/Ai_Video_Summarizer",
      liveDemoLink: "https://ai-video-summarizer-qrmb.vercel.app/",
      technologies: ["React", "Shadcn","Nextjs", "Shadcn","MongoDB","Nodejs", "Express" , "Gemini API","ffmpeg","TypeScript"," TailwindCSS",],
      featured: true,
      category: "Full Stack",
    },
    {
      id: 4,
      imgSrc: IMG3.src,
      title: "Task Management System",
      description:
        "A comprehensive todo application with user authentication, categories, and progress tracking.",
      githubLink: "https://github.com",
      liveDemoLink: "https://p5.iamadityaranjan.com/login",
      technologies: ["React", "Node.js", "JWT", "MongoDB"],
      featured: true,
      category: "Full Stack",
    },
  ];

  const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const isHovered = hoveredProject === project.id;

    return (
      <div
        className={`group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ animationDelay: `${index * 150}ms` }}
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => setHoveredProject(null)}
      >
        {/* Project Image */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src={project.imgSrc}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-linear-to-t from-black/60 to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 flex items-center gap-1 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              <FaStar className="text-xs" />
              Featured
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium">
            {project.category}
          </div>

          {/* Hover Actions */}
          <div
            className={`absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-gray-900/90 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300 text-sm font-medium"
            >
              <FaGithub />
              <span className="hidden sm:inline">Code</span>
            </a>
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-indigo-600/90 text-white px-4 py-2 rounded-full hover:bg-indigo-500 transition-colors duration-300 text-sm font-medium"
              >
                <FaExternalLinkAlt />
                <span className="hidden sm:inline">Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-linear-to-r from-indigo-500/20 to-purple-500/20 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 text-sm"
            >
              <FaCode />
              View Code
            </a>
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300 text-sm"
              >
                <FaEye />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="portfolio"
      className="py-12 md:py-20 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-linear-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-linear-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h5 className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-light mb-2">
            My Recent Work
          </h5>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
            Featured Projects
          </h2>
          <div className="w-16 md:w-24 h-1 bg-linear-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Here are some of my best projects that showcase my skills in
            full-stack development, modern web technologies, and user
            experience design.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`text-center transition-all duration-1000 delay-600 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/20 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Want to see more?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Explore my complete portfolio with detailed project
                  breakdowns, live demos, and source code.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/projects"
                  className="group flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  View All Projects
                  <BsArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>

                <a
                  href="https://github.com/aditya74841"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-gray-800 dark:bg-gray-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <FaGithub />
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-16 transition-all duration-1000 delay-800 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center group">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaCode className="text-white text-lg md:text-2xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 md:mb-2">
              15+
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Projects
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaGithub className="text-white text-lg md:text-2xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 md:mb-2">
              50+
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Repositories
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaExternalLinkAlt className="text-white text-lg md:text-2xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 md:mb-2">
              10+
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Live Demos
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaStar className="text-white text-lg md:text-2xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 md:mb-2">
              4
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Featured
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
