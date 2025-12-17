import React from "react";
import { notFound } from "next/navigation";
import { Github, ExternalLink, PlayCircle, Code2, Database, Zap, ArrowLeft, Trophy, AlertCircle } from "lucide-react";
import Link from "next/link";
import { projectsData } from "@/components/projects/projectData";

// Helper to find project by ID
const getProject = (id: string) => {
    const allProjects = [...projectsData.currentProjects, ...projectsData.completedProjects];
    return allProjects.find((p) => p.id === id);
};

export async function generateStaticParams() {
    const allProjects = [...projectsData.currentProjects, ...projectsData.completedProjects];
    return allProjects.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const project = getProject(params.id);

    if (!project) {
        notFound();
    }

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/projects" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition font-medium">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Projects
                    </Link>
                    <div className="flex gap-4">
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition">
                                <Github className="w-6 h-6" />
                            </a>
                        )}
                        {project.liveDemoLink && (
                            <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition">
                                <ExternalLink className="w-6 h-6" />
                            </a>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="flex items-start gap-4 mb-6">
                        <div className={`p-3 rounded-lg bg-slate-100 text-slate-600`}>
                            {project.icon ? project.icon : <PlayCircle className="w-8 h-8" />}
                        </div>
                        {project.category && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold self-center">
                                {project.category}
                            </span>
                        )}
                    </div>
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">{project.title}</h1>
                    <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
                        {project.description}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Project Overview (Long Description) */}
                        {project.longDescription && (
                            <section>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                    <span className="w-1 h-8 bg-blue-600 rounded"></span>
                                    Project Overview
                                </h2>
                                <p className="text-slate-700 leading-relaxed text-lg">
                                    {project.longDescription}
                                </p>
                            </section>
                        )}

                        {/* Features (if any) */}
                        {project.features && project.features.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-1 h-8 bg-green-600 rounded"></span>
                                    Key Features
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.features.map((feature, idx) => (
                                        <div key={idx} className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-start gap-3">
                                            <div className="mt-1 min-w-[20px]">
                                                <Zap className="w-5 h-5 text-green-600" />
                                            </div>
                                            <p className="text-slate-700">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Challenges (if any) */}
                        {project.challenges && project.challenges.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-1 h-8 bg-orange-600 rounded"></span>
                                    Challenges & Solutions
                                </h2>
                                <div className="space-y-4">
                                    {project.challenges.map((challenge, idx) => (
                                        <div key={idx} className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                                            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5 text-orange-600" />
                                                {challenge.problem}
                                            </h3>
                                            <p className="text-slate-600 pl-7">{challenge.solution}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}


                        {/* Tech Stack */}
                        {project.techStack && project.techStack.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-1 h-8 bg-purple-600 rounded"></span>
                                    Technology Stack
                                </h2>
                                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                                    <div className="flex flex-wrap gap-3">
                                        {project.techStack.map((tech) => (
                                            <span key={tech} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium flex items-center gap-2">
                                                <Code2 className="w-4 h-4 text-purple-600" />
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Project Info Card */}
                        <div className="bg-white border border-slate-200 rounded-lg p-8 sticky top-24 space-y-6 shadow-sm">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Status</h3>
                                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold 
                    ${project.status === 'In Improvement' || project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                    {project.status || 'Completed'}
                                </div>
                            </div>

                            {project.completedDate && (
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Completion Date</h3>
                                    <p className="text-slate-900 font-medium">{project.completedDate}</p>
                                </div>
                            )}

                            {project.difficulty && (
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Difficulty</h3>
                                    <span className="font-medium text-slate-900">{project.difficulty}</span>
                                </div>
                            )}


                            <div>
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Links</h3>
                                <div className="space-y-3">
                                    {project.githubLink && (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition">
                                            <Github className="w-5 h-5" />
                                            View on GitHub
                                        </a>
                                    )}
                                    {project.liveDemoLink && (
                                        <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                                            <ExternalLink className="w-5 h-5" />
                                            Live Demo
                                        </a>
                                    )}
                                    {!project.githubLink && !project.liveDemoLink && (
                                        <p className="text-sm text-slate-500 italic">No public links available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 bg-white">
                <div className="max-w-6xl mx-auto px-6 py-8 text-center text-slate-600">
                    <p>© {new Date().getFullYear()} Project Portfolio • Designed by Aditya</p>
                </div>
            </div>
        </div>
    );
}
