'use client';

import { X } from 'lucide-react';
import { Project } from '../types';
import ProjectForm from './ProjectForm';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project?: Project | null;
    onSubmit: (data: Partial<Project>) => void;
    isLoading?: boolean;
}

export default function ProjectModal({ isOpen, onClose, project, onSubmit, isLoading }: ProjectModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-3xl mx-4 bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white">
                        {project ? 'Edit Project' : 'Create New Project'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <ProjectForm
                        project={project}
                        onSubmit={onSubmit}
                        onCancel={onClose}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}
