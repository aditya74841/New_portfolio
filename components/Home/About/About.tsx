"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFileAlt, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { Briefcase, Rocket, Globe, BookOpen } from "lucide-react";

interface QuickFact {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const quickFacts: QuickFact[] = [
  {
    icon: <Briefcase className="w-6 h-6 text-gray-300" />,
    title: "2+ Years",
    desc: "Development Experience",
  },
  {
    icon: <Rocket className="w-6 h-6 text-gray-300" />,
    title: "15+ Projects",
    desc: "Built & Delivered",
  },
  {
    icon: <Globe className="w-6 h-6 text-gray-300" />,
    title: "India",
    desc: "Open to Global / Remote",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-gray-300" />,
    title: "Continuous Learner",
    desc: "Full Stack & AI Integration",
  },
];

const About = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector("#about");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 md:py-28 bg-gray-950 relative overflow-hidden">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gray-900/40 blur-3xl rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-3">
            Get to Know
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-16 h-0.5 bg-gray-700 mx-auto"></div>
        </div>

        {/* Quick Facts Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {quickFacts.map((fact, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-900/80 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mb-4">
                {fact.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {fact.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {fact.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Card */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gray-900/80 rounded-3xl p-8 md:p-12 border border-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-2xl">
                👋
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Hello, I'm Aditya!
              </h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              I am a passionate <span className="text-white font-semibold underline underline-offset-4 decoration-gray-600">Full Stack Developer</span> with over two years of experience building fast, reliable, and scalable web applications. My expertise spans modern front-end engineering with <span className="text-white font-semibold">React, Next.js, and TypeScript</span>, as well as backend systems using <span className="text-white font-semibold">Node.js, Express, MongoDB, and Python</span>.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-10">
              I focus on writing clean, maintainable code, leveraging AI integrations (Gemini API, OpenAI) to automate workflows, and delivering high-performance digital experiences that solve real-world problems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-950 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                <FiMessageCircle className="text-lg" />
                Let's Talk
              </a>
              <Link
                href="/cv"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-gray-300 border border-gray-700 rounded-full font-semibold hover:border-white hover:text-white transition-all duration-300"
              >
                <FaFileAlt className="text-sm" />
                View CV / Resume
              </Link>
            </div>
          </div>
        </div>

        {/* Coding Profiles Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* GitHub Card */}
          <div className="bg-gray-900/80 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <FaGithub className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">GitHub Profile</h3>
                <p className="text-gray-400 text-xs">Open Source & Projects</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Explore 50+ public repositories featuring full-stack applications, AI tools, and utility libraries.
            </p>
            <a
              href="https://github.com/aditya74841"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gray-300 transition-colors"
            >
              <span>View GitHub</span>
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>

          {/* Currently Building Card */}
          <div className="bg-gray-900/80 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-xl">
                🚀
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Focus Areas</h3>
                <p className="text-gray-400 text-xs">What I'm building now</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              AI-powered productivity platforms, serverless architectures, and modern web applications with Next.js.
            </p>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gray-300 transition-colors"
            >
              <span>Explore Featured Work</span>
              <span className="text-xs">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
