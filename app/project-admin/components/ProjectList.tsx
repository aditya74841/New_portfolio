'use client';

import { Project, CATEGORIES, PRIORITIES, STATUSES } from '../types';
import { Edit, Trash2, Eye, EyeOff, ExternalLink, Github } from 'lucide-react';

interface ProjectListProps {
    projects: Project[];
    onEdit: (project: Project) => void;
    onDelete: (project: Project) => void;
    onToggleVisibility: (project: Project) => void;
    isLoading?: boolean;
}

export default function ProjectList({
    projects,
    onEdit,
    onDelete,
    onToggleVisibility,
    isLoading,
}: ProjectListProps) {
    const getCategoryLabel = (category?: string) => {
        return CATEGORIES.find(c => c.value === category)?.label || category || 'Uncategorized';
    };

    const getPriorityColor = (priority?: string) => {
        const colors: Record<string, string> = {
            high: 'bg-red-500/20 text-red-400 border-red-500/30',
            medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            low: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        };
        return colors[priority || 'medium'] || colors.medium;
    };

    const getStatusColor = (status?: string) => {
        return status === 'completed'
            ? 'bg-green-500/20 text-green-400 border-green-500/30'
            : 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                <p className="text-lg">No projects found</p>
                <p className="text-sm mt-1">Create your first project to get started</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {projects.map((project) => (
                <div
                    key={project._id}
                    className={`p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all ${!project.isVisible ? 'opacity-60' : ''
                        }`}
                >
                    <div className="flex items-start justify-between gap-4">
                        {/* Left: Project Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-lg font-semibold text-white truncate">
                                    {project.title}
                                </h3>
                                {!project.isVisible && (
                                    <span className="text-xs px-2 py-0.5 bg-gray-600/50 text-gray-300 rounded-full">
                                        Hidden
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex items-center gap-2 mt-3 flex-wrap">
                                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(project.priority)}`}>
                                    {project.priority?.charAt(0).toUpperCase()}{project.priority?.slice(1)} Priority
                                </span>
                                <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                                    {getCategoryLabel(project.category)}
                                </span>
                            </div>

                            {/* Tech Stack */}
                            {project.techStack && project.techStack.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {project.techStack.slice(0, 5).map((tech, i) => (
                                        <span key={i} className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 5 && (
                                        <span className="text-xs px-2 py-0.5 bg-gray-700 text-gray-400 rounded">
                                            +{project.techStack.length - 5} more
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Progress Bar */}
                            {project.status === 'current' && (
                                <div className="mt-3">
                                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                                        <span>Progress</span>
                                        <span>{project.progress || 0}%</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                                            style={{ width: `${project.progress || 0}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2">
                            {/* Links */}
                            {project.githubLink && (
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                    title="GitHub"
                                >
                                    <Github size={18} />
                                </a>
                            )}
                            {project.liveDemoLink && (
                                <a
                                    href={project.liveDemoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                    title="Live Demo"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            )}

                            <div className="w-px h-6 bg-gray-700" />

                            {/* Toggle Visibility */}
                            <button
                                onClick={() => onToggleVisibility(project)}
                                className={`p-2 rounded-lg transition-colors ${project.isVisible
                                        ? 'text-green-400 hover:bg-green-500/20'
                                        : 'text-gray-400 hover:bg-gray-700'
                                    }`}
                                title={project.isVisible ? 'Hide from portfolio' : 'Show on portfolio'}
                            >
                                {project.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>

                            {/* Edit */}
                            <button
                                onClick={() => onEdit(project)}
                                className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                title="Edit project"
                            >
                                <Edit size={18} />
                            </button>

                            {/* Delete */}
                            <button
                                onClick={() => onDelete(project)}
                                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                title="Delete project"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
