"use client";

import React from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaDownload,
  FaPrint,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaCopy,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { toast } from "react-hot-toast";

const CVPage: React.FC = () => {
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => toast.success("CV link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy link."));
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-6 sm:py-12 md:py-16 px-3 sm:px-6 lg:px-8 print:p-0 print:bg-white print:min-h-0 print:text-black overflow-x-hidden">
      {/* Global Print Style overrides */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 10mm;
          }
          body, html {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            overflow: visible !important;
          }
          .print-container {
            background: #ffffff !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Action Bar (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-4 sm:mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center justify-end gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-[11px] sm:text-xs text-gray-300 hover:text-white hover:border-gray-700 transition-colors"
          >
            <FaCopy className="text-xs" />
            <span>Copy Link</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-[11px] sm:text-xs text-gray-300 hover:text-white hover:border-gray-700 transition-colors"
          >
            <FaPrint className="text-xs" />
            <span>Print</span>
          </button>

          <a
            href="/aditya_resume.pdf"
            download
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-gray-950 font-bold rounded-lg text-[11px] sm:text-xs hover:bg-gray-200 transition-colors shadow-sm"
          >
            <FaDownload className="text-xs" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Main CV Container Sheet */}
      <main className="print-container max-w-4xl mx-auto bg-gray-900/90 border border-gray-800/90 rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-10 shadow-2xl space-y-6 font-sans print:bg-white print:text-black print:border-none print:shadow-none print:p-0 print:space-y-4">
        {/* CV Header */}
        <header className="border-b border-gray-800 pb-5 print:border-gray-300 print:pb-3">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight print:text-black print:text-2xl">
                  Aditya Ranjan
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 print:border-emerald-700 print:text-emerald-800 print:bg-emerald-50">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse print:hidden"></span>
                  Availability: Immediate
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-emerald-400 mt-1 print:text-emerald-700 print:text-xs">
                Full Stack Software Developer • MERN Stack • AI-Integrated Applications
              </p>
            </div>

            {/* Quick Contact Badge Grid / Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap gap-2 sm:gap-x-4 sm:gap-y-2 text-xs font-mono text-gray-400 print:text-gray-700 print:gap-x-3 print:text-[11px]">
              <a
                href="tel:+917481092465"
                className="flex items-center gap-1.5 hover:text-white transition-colors break-all"
              >
                <FaPhoneAlt className="text-gray-500 shrink-0 print:text-gray-700" />
                <span>+91 7481092465</span>
              </a>
              <a
                href="mailto:aditya@iamadityaranjan.com"
                className="flex items-center gap-1.5 hover:text-white transition-colors break-all"
              >
                <FaEnvelope className="text-gray-500 shrink-0 print:text-gray-700" />
                <span>aditya@iamadityaranjan.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/iamadityaranjan/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <FaLinkedin className="text-gray-500 shrink-0 print:text-gray-700" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/aditya74841"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <FaGithub className="text-gray-500 shrink-0 print:text-gray-700" />
                <span>GitHub</span>
              </a>
              <a
                href="https://iamadityaranjan.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <FaGlobe className="text-gray-500 shrink-0 print:text-gray-700" />
                <span>Portfolio</span>
              </a>
              <a
                href="https://x.com/adixranjan08"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <FaSquareXTwitter className="text-gray-500 shrink-0 print:text-gray-700" />
                <span>X</span>
              </a>
            </div>
          </div>
        </header>

        {/* 1. Professional Summary */}
        <section className="space-y-1.5">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 print:text-gray-800 font-bold">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed print:text-gray-800 print:text-xs">
            Full Stack Developer with 2.5+ years building production apps using React, Next.js, Node.js, Express, MongoDB. Skilled in REST APIs, real-time systems, optimization, and AI integrations with LLMs, RAG, embeddings, and semantic search.
          </p>
        </section>

        {/* 2. Technical Skills */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 print:text-gray-800 border-b border-gray-800/80 pb-1 print:border-gray-300 font-bold">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
            <div>
              <span className="font-mono text-gray-400 block mb-0.5 print:text-gray-800">Frontend</span>
              <p className="text-gray-300 print:text-gray-900 font-medium">
                JavaScript (ES6+), React.js, Next.js, TypeScript, Redux, TailwindCSS
              </p>
            </div>
            <div>
              <span className="font-mono text-gray-400 block mb-0.5 print:text-gray-800">Backend</span>
              <p className="text-gray-300 print:text-gray-900 font-medium">
                Node.js, Express.js, RESTful APIs, JWT Authentication, Socket.io, WebSockets
              </p>
            </div>
            <div>
              <span className="font-mono text-gray-400 block mb-0.5 print:text-gray-800">Language</span>
              <p className="text-gray-300 print:text-gray-900 font-medium">
                C, C++
              </p>
            </div>
            <div>
              <span className="font-mono text-gray-400 block mb-0.5 print:text-gray-800">Database</span>
              <p className="text-gray-300 print:text-gray-900 font-medium">
                MongoDB, Vector Databases, Embeddings, Semantic Search
              </p>
            </div>
            <div>
              <span className="font-mono text-gray-400 block mb-0.5 print:text-gray-800">Development Tools</span>
              <p className="text-gray-300 print:text-gray-900 font-medium">
                Git/GitHub, Postman, Socket.io, Cloudinary, Vite
              </p>
            </div>
            <div>
              <span className="font-mono text-gray-400 block mb-0.5 print:text-gray-800">AI</span>
              <p className="text-gray-300 print:text-gray-900 font-medium">
                OpenRouter API, Tavily API, RAG, LLM Integration, Prompt Engineering
              </p>
            </div>
          </div>
        </section>

        {/* 3. Professional Experience */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 print:text-gray-800 border-b border-gray-800/80 pb-1 print:border-gray-300 font-bold">
            Work Experience
          </h2>

          {/* Job 1 */}
          <div className="space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-white print:text-black">
                  Full Stack Developer • <span className="text-emerald-400 font-medium print:text-emerald-700">CodenCreative</span>
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-mono text-gray-400 print:text-gray-600">
                Feb 2024 – Dec 2025
              </span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-gray-300 print:text-gray-800 leading-relaxed">
              <li>
                Improved e-commerce application performance through backend query optimization, code splitting, and CDN integration.
              </li>
              <li>
                Developed secure REST APIs using Node.js, Express, MongoDB, and JWT-based authentication/RBAC.
              </li>
            </ul>
          </div>

          {/* Job 2 */}
          <div className="space-y-1.5 pt-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-white print:text-black">
                  Full Stack Developer • <span className="text-emerald-400 font-medium print:text-emerald-700">BlackWater Coffee Pvt Ltd.</span>
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-mono text-gray-400 print:text-gray-600">
                Dec 2022 – Jan 2024
              </span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-gray-300 print:text-gray-800 leading-relaxed">
              <li>
                Developed a full-stack POS and inventory management system with real-time stock tracking, automated low-stock alerts, and multi-user authentication.
              </li>
              <li>
                Integrated a Socket.io-based Kitchen Display System (KDS) for order synchronization between POS and kitchen.
              </li>
            </ul>
          </div>
        </section>

        {/* 4. Projects */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-gray-800/80 pb-1 print:border-gray-300">
            <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 print:text-gray-800 font-bold">
              Projects
            </h2>
            <Link
              href="/projects"
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors print:hidden"
            >
              <span>View All Projects</span>
              <FaExternalLinkAlt className="text-[9px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Project 1 */}
            <div className="bg-gray-950/60 border border-gray-800/80 p-3 sm:p-3.5 rounded-xl space-y-1.5 print:bg-white print:border-gray-200 print:p-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-white print:text-black">
                  ClearLearn — AI Knowledge Platform
                </h3>
                <a
                  href="https://clearlearn.iamadityaranjan.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 print:text-gray-700"
                >
                  <span>Live Demo</span> <FaExternalLinkAlt className="text-[9px]" />
                </a>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-300 print:text-gray-800 leading-relaxed">
                <li>
                  Built an AI-powered knowledge platform with context-aware LLM chat, hierarchical chat/subchat/note architecture, and real-time synchronization.
                </li>
                <li>
                  Implemented semantic vector search and Tavily web search to retrieve relevant content and ground AI responses with current web information.
                </li>
              </ul>
              <div className="flex flex-wrap gap-1 pt-0.5">
                {["Node.js", "Express", "MongoDB", "JWT", "Socket.io", "Next.js", "Tailwind CSS", "Openrouter", "Tavily"].map((tech) => (
                  <span key={tech} className="px-1.5 py-0.5 bg-gray-900 border border-gray-800 text-[10px] font-mono text-gray-300 rounded print:bg-gray-100 print:text-black print:border-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-gray-950/60 border border-gray-800/80 p-3 sm:p-3.5 rounded-xl space-y-1.5 print:bg-white print:border-gray-200 print:p-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-white print:text-black">
                  MetaForge Pro - Meta Tag Generator Suite
                </h3>
                <a
                  href="https://metaforge.allaboutcse.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 print:text-gray-700"
                >
                  <span>Live Demo</span> <FaExternalLinkAlt className="text-[9px]" />
                </a>
              </div>
              <p className="text-xs text-gray-300 print:text-gray-800 leading-relaxed">
                Engineered 17+ SEO/meta generators with live previews, optimizing performance and UI responsiveness.
              </p>
              <div className="flex flex-wrap gap-1 pt-0.5">
                {["Next.js", "JavaScript", "HTML", "CSS", "Groq sdk", "cheerio", "Shadcn"].map((tech) => (
                  <span key={tech} className="px-1.5 py-0.5 bg-gray-900 border border-gray-800 text-[10px] font-mono text-gray-300 rounded print:bg-gray-100 print:text-black print:border-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* View More Projects Action Footer Card */}
          <div className="mt-2 text-center pt-2 print:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-950 border border-gray-800 hover:border-emerald-500/50 rounded-xl text-xs font-mono text-gray-300 hover:text-emerald-400 transition-all group"
            >
              <span>Explore full portfolio &amp; all projects</span>
              <FaExternalLinkAlt className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>

        {/* 5. Education */}
        <section className="space-y-1.5 pt-1 border-t border-gray-800/80 print:border-gray-300">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 print:text-gray-800 font-bold">
            Education
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
            <div>
              <h3 className="font-bold text-white print:text-black">
                Bachelor of Technology in Computer Science
              </h3>
              <p className="text-gray-400 print:text-gray-700">
                Amritsar College of Engineering &amp; Technology
              </p>
            </div>
            <div className="text-left sm:text-right font-mono text-gray-400 print:text-gray-700">
              <p>2019 – 2023</p>
              <p className="text-emerald-400 print:text-emerald-700">CGPA: 7.4</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CVPage;
