import React from "react";
import { notFound } from "next/navigation";
import {
  Github,
  ExternalLink,
  PlayCircle,
  Code2,
  ArrowLeft,
  AlertCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { projectsData } from "@/components/projects/projectData";

const getProject = (id: string) => {
  const allProjects = [
    ...projectsData.currentProjects,
    ...projectsData.completedProjects,
  ];
  return allProjects.find((p) => p.id === id);
};

export async function generateStaticParams() {
  const allProjects = [
    ...projectsData.currentProjects,
    ...projectsData.completedProjects,
  ];
  return allProjects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const project = getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      {/* Navigation Header */}
      <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
          <div className="flex gap-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-300">
              {project.icon ? project.icon : <PlayCircle className="w-6 h-6" />}
            </div>
            {project.category && (
              <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-mono border border-gray-700">
                {project.category}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Long Description */}
            {project.longDescription && (
              <section className="bg-gray-900/80 rounded-2xl p-8 border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-4">
                  Overview
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {project.longDescription}
                </p>
              </section>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-6">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-900/80 border border-gray-800 p-5 rounded-xl flex items-start gap-3"
                    >
                      <Zap className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <p className="text-gray-300 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-6">
                  Engineering Challenges &amp; Solutions
                </h2>
                <div className="space-y-4">
                  {project.challenges.map((challenge, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-900/80 border border-gray-800 rounded-xl p-6"
                    >
                      <h3 className="font-bold text-white mb-2 flex items-center gap-2 text-base">
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                        {challenge.problem}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed pl-6">
                        {challenge.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <section className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-xs font-mono border border-gray-700/50 flex items-center gap-2"
                    >
                      <Code2 className="w-3.5 h-3.5 text-gray-400" />
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 sticky top-24 space-y-6">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
                  Project Status
                </h3>
                <span className="inline-block px-3 py-1 bg-gray-800 text-gray-200 border border-gray-700 rounded-full text-xs font-mono">
                  {project.status || "Completed"}
                </span>
              </div>

              {project.completedDate && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">
                    Timeline
                  </h3>
                  <p className="text-gray-300 text-sm font-mono">
                    {project.completedDate}
                  </p>
                </div>
              )}

              {project.difficulty && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">
                    Complexity
                  </h3>
                  <p className="text-gray-300 text-sm font-mono">
                    {project.difficulty}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-800 space-y-3">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-white text-gray-950 font-bold py-3 rounded-xl hover:bg-gray-200 transition text-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>View on GitHub</span>
                  </a>
                )}
                {project.liveDemoLink && (
                  <a
                    href={project.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-3 rounded-xl border border-gray-700 hover:border-gray-500 transition text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-900 bg-gray-950 py-8 text-center text-xs text-gray-500">
        <p suppressHydrationWarning>© {new Date().getFullYear()} Aditya Ranjan • Full Stack Developer</p>
      </footer>
    </div>
  );
}
