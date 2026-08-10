"use client";

import React, { useEffect, useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaCode, FaStar } from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";
import IMG1 from "../../../assets/MetaTagGenerator.png";
import IMG2 from "../../../assets/portfolio2.jpg";
import IMG3 from "../../../assets/portfolio3.jpg";
import IMG8 from "../../../assets/auditImage.png";
import IMG12 from "../../../assets/ai_browsing.png";

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

const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const card = document.getElementById(`home-project-${project.id}`);
    if (card) {
      observer.observe(card);
    }

    return () => {
      if (card) {
        observer.unobserve(card);
      }
    };
  }, [project.id]);

  return (
    <div
      id={`home-project-${project.id}`}
      className={`group bg-gray-900/80 rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-500 flex flex-col ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Image Preview */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gray-950">
        <img
          src={project.imgSrc}
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
        <div className="absolute top-3 right-3 bg-gray-950/80 backdrop-blur-md text-gray-300 px-3 py-1 rounded-full text-xs font-mono border border-gray-800">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-gray-800/80 text-gray-300 rounded-md text-xs font-mono border border-gray-700/50"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-800/80">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub className="text-base" />
              <span>Source Code</span>
            </a>
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-gray-300 ml-auto transition-colors"
              >
                <span>Live Demo</span>
                <BsArrowUpRight className="text-xs" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector("#portfolio");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const featuredProjects: Project[] = [
    {
      id: 1,
      imgSrc: IMG1.src,
      title: "MetaForge Pro — AI SEO Meta Tag Generator",
      description:
        "AI-powered SEO intelligence platform that crawls websites, analyzes page structure, and generates optimized meta titles, descriptions, Open Graph tags, Twitter Cards, and Schema.org structured data.",
      githubLink: "https://github.com/aditya74841/Meta_tag_generator",
      liveDemoLink: "https://metaforge.allaboutcse.com/",
      technologies: ["React", "Next.js", "TailwindCSS", "Shadcn", "Node.js", "Express", "Groq", "Cheerio", "SEO Audit"],
      featured: true,
      category: "AI",
    },
    {
      id: 2,
      imgSrc: IMG8.src,
      title: "Enterprise Audit Management System",
      description:
        "End-to-end audit platform enabling standardized audits across locations with multimedia evidence support. Handles 200+ concurrent auditors with real-time sync.",
      githubLink: "https://github.com/aditya74841/Url_Shortner",
      liveDemoLink: "https://audit.iamadityaranjan.com/",
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "Express", "Cloudinary"],
      featured: true,
      category: "Full Stack",
    },
    {
      id: 3,
      imgSrc: IMG2.src,
      title: "AI Video Summarizer",
      description:
        "AI-powered platform that transcribes and summarizes video content in seconds using Gemini API. Supports 50+ video formats with FFmpeg processing pipeline.",
      githubLink: "https://github.com/aditya74841/Ai_Video_Summarizer",
      liveDemoLink: "https://ai-video-summarizer-qrmb.vercel.app/",
      technologies: ["Next.js", "Node.js", "MongoDB", "Gemini API", "FFmpeg", "TypeScript"],
      featured: true,
      category: "Full Stack",
    },
    {
      id: 4,
      imgSrc: IMG3.src,
      title: "Task Management System",
      description:
        "Comprehensive task manager with JWT authentication, categories, priority levels, and visual progress tracking. Built with security-first design.",
      githubLink: "https://github.com/aditya74841",
      liveDemoLink: "https://p5.iamadityaranjan.com/login",
      technologies: ["React", "Node.js", "JWT", "MongoDB"],
      featured: true,
      category: "Full Stack",
    },
    {
      id: 5,
      imgSrc: IMG12.src,
      title: "AI Search Assistant",
      description:
        "An AI-powered chat and search application that combines live web retrieval with LLM reasoning to deliver grounded, context-aware answers.",
      githubLink: "https://github.com/aditya74841/Web-browsing-AI-agents",
      liveDemoLink: "https://aibrowsing.iamadityaranjan.com/",
      technologies: ["React",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Groq",
        "Tavily API",
        "express-rate-limit",],
      featured: true,
      category: "Full Stack, AI",
    },
  ];

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-3">
            Selected Works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-16 h-0.5 bg-gray-700 mx-auto"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action Card */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gray-900/80 rounded-3xl p-8 md:p-12 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Want to see more projects?
              </h3>
              <p className="text-gray-400 text-sm md:text-base">
                Explore the complete project gallery with category filters and detailed breakdowns.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-gray-950 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                <span>View All Projects</span>
                <BsArrowUpRight className="text-xs" />
              </a>
              <a
                href="https://github.com/aditya74841"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-800 text-white rounded-full font-semibold border border-gray-700 hover:border-gray-500 transition-all duration-300"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
