'use client';

import { useState, useEffect, useCallback } from 'react';
import { Project } from './types';
import { projectService } from './services/projectService';
import ProjectList from './components/ProjectList';
import ProjectModal from './components/ProjectModal';
import { Plus, Search, RefreshCw, BarChart3, FolderOpen, Eye, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useAuth } from '../Providers';
import { useRouter } from 'next/navigation';

export default function ProjectAdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [stats, setStats] = useState<{
        totalProjects: number;
        currentProjects: number;
        completedProjects: number;
        visibleProjects: number;
    } | null>(null);

    const { user, isLoading: isAuthLoading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthLoading && !user) {
            router.push('/login');
        }
    }, [user, isAuthLoading, router]);

    // Fetch projects
    const fetchProjects = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await projectService.getProjects({
                limit: 100,
                search: searchQuery || undefined,
                status: statusFilter || undefined,
            });
            setProjects(response.docs);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            toast.error('Failed to fetch projects');
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, statusFilter]);

    // Fetch stats
    const fetchStats = useCallback(async () => {
        try {
            const data = await projectService.getStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
        fetchStats();
    }, [fetchProjects, fetchStats]);

    // Handle create/update
    const handleSubmit = async (data: Partial<Project>) => {
        try {
            setIsSaving(true);
            if (selectedProject?._id) {
                await projectService.updateProject(selectedProject._id, data);
                toast.success('Project updated successfully');
            } else {
                await projectService.createProject(data);
                toast.success('Project created successfully');
            }
            setIsModalOpen(false);
            setSelectedProject(null);
            fetchProjects();
            fetchStats();
        } catch (error: unknown) {
            console.error('Failed to save project:', error);
            const message = error instanceof Error ? error.message : 'Failed to save project';
            toast.error(message);
        } finally {
            setIsSaving(false);
        }
    };

    // Handle edit
    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    // Handle delete
    const handleDelete = async (project: Project) => {
        if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;

        try {
            await projectService.deleteProject(project._id!);
            toast.success('Project deleted successfully');
            fetchProjects();
            fetchStats();
        } catch (error) {
            console.error('Failed to delete project:', error);
            toast.error('Failed to delete project');
        }
    };

    // Handle toggle visibility
    const handleToggleVisibility = async (project: Project) => {
        try {
            await projectService.toggleVisibility(project._id!);
            toast.success(project.isVisible ? 'Project hidden' : 'Project visible');
            fetchProjects();
            fetchStats();
        } catch (error) {
            console.error('Failed to toggle visibility:', error);
            toast.error('Failed to toggle visibility');
        }
    };

    // Open create modal
    const handleCreate = () => {
        setSelectedProject(null);
        setIsModalOpen(true);
    };

    if (isAuthLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Project Admin
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">Manage your portfolio projects</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/"
                                className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                ← Back to Portfolio
                            </Link>
                            <Link
                                href="/idea-planner"
                                className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                Idea Planner
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                    router.push('/');
                                }}
                                className="px-4 py-2 text-red-400 hover:text-white hover:bg-red-900/50 rounded-lg transition-colors"
                            >
                                Logout
                            </button>
                            <button
                                onClick={handleCreate}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                            >
                                <Plus size={20} />
                                New Project
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <FolderOpen className="text-blue-400" size={20} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{stats.totalProjects}</p>
                                    <p className="text-gray-400 text-sm">Total Projects</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-500/20 rounded-lg">
                                    <Clock className="text-yellow-400" size={20} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{stats.currentProjects}</p>
                                    <p className="text-gray-400 text-sm">In Progress</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/20 rounded-lg">
                                    <BarChart3 className="text-green-400" size={20} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{stats.completedProjects}</p>
                                    <p className="text-gray-400 text-sm">Completed</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Eye className="text-purple-400" size={20} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{stats.visibleProjects}</p>
                                    <p className="text-gray-400 text-sm">Visible</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Status</option>
                        <option value="current">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button
                        onClick={() => {
                            fetchProjects();
                            fetchStats();
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-colors"
                    >
                        <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                        Refresh
                    </button>
                </div>

                {/* Project List */}
                <ProjectList
                    projects={projects}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleVisibility={handleToggleVisibility}
                    isLoading={isLoading}
                />
            </main>

            {/* Modal */}
            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedProject(null);
                }}
                project={selectedProject}
                onSubmit={handleSubmit}
                isLoading={isSaving}
            />
        </div>
    );
}
