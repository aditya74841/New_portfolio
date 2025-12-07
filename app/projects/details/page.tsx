"use client"

import React, { useEffect, useState } from "react";
import { Github, Linkedin, ExternalLink, PlayCircle, Code2, Database, Zap } from "lucide-react";

export default function ProjectPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }));
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Projects</h2>
          <div className="flex gap-4">
            <button className="text-slate-600 hover:text-slate-900 transition">GitHub</button>
            <button className="text-slate-600 hover:text-slate-900 transition">LinkedIn</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <PlayCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">AI Video Summarizer</h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            An intelligent web application that leverages AI and video processing technology to automatically generate concise summaries from video content, enabling users to quickly understand key insights without watching entire videos.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Overview */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-blue-600 rounded"></span>
                Project Overview
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                This project demonstrates the integration of multiple modern technologies to create a practical AI-powered solution. By combining video processing with large language models, the application provides users with an efficient way to extract and understand key information from video content.
              </p>
            </section>

            {/* Objectives */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-green-600 rounded"></span>
                Project Objectives
              </h2>
              <div className="space-y-3">
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                  <p className="text-slate-700 font-semibold">Learn AI Integration</p>
                  <p className="text-slate-600">Master the implementation of AI APIs and understanding different AI models for text generation</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                  <p className="text-slate-700 font-semibold">Video Processing</p>
                  <p className="text-slate-600">Gain expertise in FFmpeg for efficient audio extraction and video manipulation</p>
                </div>
              </div>
            </section>

            {/* Tech Stack */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-purple-600 rounded"></span>
                Technology Stack
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Frontend */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4">
                    <Code2 className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-slate-900">Frontend</h3>
                  </div>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      <span><strong>Framework:</strong> Next.js</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      <span><strong>Styling:</strong> Tailwind CSS</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      <span><strong>Benefits:</strong> SSR, Fast performance</span>
                    </li>
                  </ul>
                </div>

                {/* Backend */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-xl font-semibold text-slate-900">Backend</h3>
                  </div>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
                      <span><strong>Runtime:</strong> Node.js</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
                      <span><strong>Framework:</strong> Express.js</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
                      <span><strong>Tool:</strong> FFmpeg</span>
                    </li>
                  </ul>
                </div>

                {/* Database */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-semibold text-slate-900">Database</h3>
                  </div>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      <span><strong>Platform:</strong> MongoDB</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      <span><strong>Type:</strong> NoSQL</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      <span><strong>Advantage:</strong> Flexible schema</span>
                    </li>
                  </ul>
                </div>

                {/* APIs & Tools */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-4">
                    <Code2 className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-semibold text-slate-900">APIs & Tools</h3>
                  </div>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                      <span><strong>AI Model:</strong> Google Gemini API</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                      <span><strong>Version Control:</strong> Git & GitHub</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                      <span><strong>Assistance:</strong> ChatGPT</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Key Learnings */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-orange-600 rounded"></span>
                Key Learning Outcomes
              </h2>
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Video Processing with FFmpeg</h3>
                  <p className="text-slate-600">Implemented audio extraction and video manipulation techniques, understanding codec handling and stream processing pipelines.</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">AI Model Integration</h3>
                  <p className="text-slate-600">Explored various AI models and learned how to effectively integrate external AI services into applications through APIs.</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Full-Stack Development</h3>
                  <p className="text-slate-600">Gained hands-on experience building scalable web applications with modern frontend and backend technologies.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Project Info Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 sticky top-24 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Status</h3>
                <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  Completed
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Last Updated</h3>
                <p className="text-slate-900 font-medium">{currentDate}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition">
                    <Github className="w-5 h-5" />
                    View on GitHub
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Skills Demonstrated</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Node.js", "MongoDB", "AI/ML", "FFmpeg"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-slate-600">
          <p>Built with modern web technologies • Designed for performance and scalability</p>
        </div>
      </div>
    </div>
  );
}