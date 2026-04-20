// Project types matching the backend schema

export interface FAQ {
    _id?: string;
    question: string;
    answer: string;
}

export interface Project {
    _id?: string;
    title: string;
    description: string;
    category?: 'frontend' | 'backend' | 'fullstack' | 'api' | 'portfolio' | 'documentation' | 'messaging' | 'news' | 'seo-tools';
    techStack?: string[];
    features?: string[];
    githubLink?: string;
    liveDemoLink?: string;
    apiDocsLink?: string;
    image?: string;
    gradient?: string;
    status?: 'current' | 'completed';
    progress?: number;
    priority?: 'low' | 'medium' | 'high';
    completedDate?: string;
    expectedCompletion?: string;
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    duration?: string;
    faqs?: FAQ[];
    isVisible?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProjectsResponse {
    docs: Project[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

export const CATEGORIES = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'api', label: 'API' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'messaging', label: 'Messaging' },
    { value: 'news', label: 'News' },
    { value: 'seo-tools', label: 'SEO Tools' },
] as const;

export const PRIORITIES = [
    { value: 'low', label: 'Low', color: 'bg-gray-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-red-500' },
] as const;

export const DIFFICULTIES = [
    { value: 'Beginner', label: 'Beginner', color: 'bg-green-500' },
    { value: 'Intermediate', label: 'Intermediate', color: 'bg-yellow-500' },
    { value: 'Advanced', label: 'Advanced', color: 'bg-red-500' },
] as const;

export const STATUSES = [
    { value: 'current', label: 'In Progress', color: 'bg-blue-500' },
    { value: 'completed', label: 'Completed', color: 'bg-green-500' },
] as const;
