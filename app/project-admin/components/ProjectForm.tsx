'use client';

import { useState, useEffect } from 'react';
import { Project, CATEGORIES, PRIORITIES, DIFFICULTIES, STATUSES, FAQ } from '../types';
import { X, Plus, Trash2 } from 'lucide-react';

interface ProjectFormProps {
    project?: Project | null;
    onSubmit: (data: Partial<Project>) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function ProjectForm({ project, onSubmit, onCancel, isLoading }: ProjectFormProps) {
    const [formData, setFormData] = useState<Partial<Project>>({
        title: '',
        description: '',
        category: undefined,
        techStack: [],
        features: [],
        githubLink: '',
        liveDemoLink: '',
        apiDocsLink: '',
        image: '',
        gradient: 'from-blue-500 via-purple-500 to-pink-500',
        status: 'current',
        progress: 0,
        priority: 'medium',
        completedDate: '',
        expectedCompletion: '',
        difficulty: 'Intermediate',
        duration: '',
        faqs: [],
        isVisible: true,
    });

    const [techInput, setTechInput] = useState('');
    const [featureInput, setFeatureInput] = useState('');
    const [faqQuestion, setFaqQuestion] = useState('');
    const [faqAnswer, setFaqAnswer] = useState('');

    useEffect(() => {
        if (project) {
            setFormData({
                ...project,
                techStack: project.techStack || [],
                features: project.features || [],
                faqs: project.faqs || [],
            });
        }
    }, [project]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const addTech = () => {
        if (techInput.trim() && !formData.techStack?.includes(techInput.trim())) {
            setFormData(prev => ({
                ...prev,
                techStack: [...(prev.techStack || []), techInput.trim()],
            }));
            setTechInput('');
        }
    };

    const removeTech = (tech: string) => {
        setFormData(prev => ({
            ...prev,
            techStack: prev.techStack?.filter(t => t !== tech) || [],
        }));
    };

    const addFeature = () => {
        if (featureInput.trim() && !formData.features?.includes(featureInput.trim())) {
            setFormData(prev => ({
                ...prev,
                features: [...(prev.features || []), featureInput.trim()],
            }));
            setFeatureInput('');
        }
    };

    const removeFeature = (feature: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features?.filter(f => f !== feature) || [],
        }));
    };

    const addFaq = () => {
        if (faqQuestion.trim() && faqAnswer.trim()) {
            setFormData(prev => ({
                ...prev,
                faqs: [...(prev.faqs || []), { question: faqQuestion.trim(), answer: faqAnswer.trim() }],
            }));
            setFaqQuestion('');
            setFaqAnswer('');
        }
    };

    const removeFaq = (index: number) => {
        setFormData(prev => ({
            ...prev,
            faqs: prev.faqs?.filter((_, i) => i !== index) || [],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto p-1">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Project title"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Project description"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select category</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                    <select
                        name="status"
                        value={formData.status || 'current'}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    >
                        {STATUSES.map(status => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                    <select
                        name="priority"
                        value={formData.priority || 'medium'}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    >
                        {PRIORITIES.map(priority => (
                            <option key={priority.value} value={priority.value}>{priority.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
                    <select
                        name="difficulty"
                        value={formData.difficulty || 'Intermediate'}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    >
                        {DIFFICULTIES.map(diff => (
                            <option key={diff.value} value={diff.value}>{diff.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Progress ({formData.progress}%)</label>
                    <input
                        type="range"
                        name="progress"
                        value={formData.progress || 0}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 3 months"
                    />
                </div>
            </div>

            {/* Links */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">GitHub Link</label>
                        <input
                            type="url"
                            name="githubLink"
                            value={formData.githubLink || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="https://github.com/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Live Demo Link</label>
                        <input
                            type="url"
                            name="liveDemoLink"
                            value={formData.liveDemoLink || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">API Docs Link</label>
                        <input
                            type="url"
                            name="apiDocsLink"
                            value={formData.apiDocsLink || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="https://..."
                        />
                    </div>
                </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Completed Date</label>
                    <input
                        type="text"
                        name="completedDate"
                        value={formData.completedDate || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., March 2025"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Expected Completion</label>
                    <input
                        type="text"
                        name="expectedCompletion"
                        value={formData.expectedCompletion || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., August 2025"
                    />
                </div>
            </div>

            {/* Styling */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Gradient</label>
                <input
                    type="text"
                    name="gradient"
                    value={formData.gradient || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="from-blue-500 via-purple-500 to-pink-500"
                />
                {formData.gradient && (
                    <div className={`mt-2 h-4 rounded-full bg-gradient-to-r ${formData.gradient}`} />
                )}
            </div>

            {/* Tech Stack */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tech Stack</label>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Add technology (press Enter)"
                    />
                    <button
                        type="button"
                        onClick={addTech}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.techStack?.map((tech, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                            {tech}
                            <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-400">
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Features</label>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Add feature (press Enter)"
                    />
                    <button
                        type="button"
                        onClick={addFeature}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.features?.map((feature, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
                            {feature}
                            <button type="button" onClick={() => removeFeature(feature)} className="hover:text-red-400">
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* FAQs */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">FAQs</label>
                <div className="space-y-2 mb-2">
                    <input
                        type="text"
                        value={faqQuestion}
                        onChange={(e) => setFaqQuestion(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Question"
                    />
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={faqAnswer}
                            onChange={(e) => setFaqAnswer(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFaq())}
                            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Answer"
                        />
                        <button
                            type="button"
                            onClick={addFaq}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    {formData.faqs?.map((faq, i) => (
                        <div key={i} className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-white font-medium">Q: {faq.question}</p>
                                    <p className="text-gray-400 text-sm mt-1">A: {faq.answer}</p>
                                </div>
                                <button type="button" onClick={() => removeFaq(i)} className="text-gray-400 hover:text-red-400">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visibility */}
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="isVisible"
                    checked={formData.isVisible ?? true}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm text-gray-300">Visible on portfolio</label>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg text-white transition-colors"
                >
                    {isLoading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
                </button>
            </div>
        </form>
    );
}
