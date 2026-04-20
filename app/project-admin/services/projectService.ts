import axios from 'axios';
import { Project, ProjectsResponse, ApiResponse } from '../types';
import { LOCAL_SERVER_API_URL } from '../../constant';

const API_URL = LOCAL_SERVER_API_URL;

export const projectService = {
    // Get all projects with pagination and filters
    async getProjects(params?: {
        page?: number;
        limit?: number;
        search?: string;
        category?: string;
        status?: string;
        priority?: string;
    }): Promise<ProjectsResponse> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.search) queryParams.append('search', params.search);
        if (params?.category) queryParams.append('category', params.category);
        if (params?.status) queryParams.append('status', params.status);
        if (params?.priority) queryParams.append('priority', params.priority);

        const response = await axios.get<ApiResponse<ProjectsResponse>>(
            `${API_URL}/project?${queryParams.toString()}`
        );
        return response.data.data;
    },

    // Get single project by ID
    async getProjectById(id: string): Promise<Project> {
        const response = await axios.get<ApiResponse<Project>>(
            `${API_URL}/project/${id}`
        );
        return response.data.data;
    },

    // Create a new project
    async createProject(data: Partial<Project>): Promise<Project> {
        const response = await axios.post<ApiResponse<Project>>(
            `${API_URL}/project`,
            data
        );
        return response.data.data;
    },

    // Update a project
    async updateProject(id: string, data: Partial<Project>): Promise<Project> {
        const response = await axios.put<ApiResponse<Project>>(
            `${API_URL}/project/${id}`,
            data
        );
        return response.data.data;
    },

    // Delete a project
    async deleteProject(id: string): Promise<void> {
        await axios.delete(`${API_URL}/project/${id}`);
    },

    // Toggle visibility
    async toggleVisibility(id: string): Promise<Project> {
        const response = await axios.patch<ApiResponse<Project>>(
            `${API_URL}/project/${id}/visibility/toggle`
        );
        return response.data.data;
    },

    // Update status
    async updateStatus(id: string, status: 'current' | 'completed'): Promise<Project> {
        const response = await axios.patch<ApiResponse<Project>>(
            `${API_URL}/project/${id}/status`,
            { status }
        );
        return response.data.data;
    },

    // Update progress
    async updateProgress(id: string, progress: number): Promise<Project> {
        const response = await axios.patch<ApiResponse<Project>>(
            `${API_URL}/project/${id}/progress`,
            { progress }
        );
        return response.data.data;
    },

    // Add FAQ
    async addFaq(id: string, question: string, answer: string): Promise<Project> {
        const response = await axios.post<ApiResponse<Project>>(
            `${API_URL}/project/${id}/faq`,
            { question, answer }
        );
        return response.data.data;
    },

    // Remove FAQ
    async removeFaq(projectId: string, faqId: string): Promise<Project> {
        const response = await axios.delete<ApiResponse<Project>>(
            `${API_URL}/project/${projectId}/faq/${faqId}`
        );
        return response.data.data;
    },

    // Get project stats
    async getStats(): Promise<{
        totalProjects: number;
        currentProjects: number;
        completedProjects: number;
        visibleProjects: number;
        categoryStats: Array<{ _id: string; count: number }>;
        techStats: Array<{ _id: string; count: number }>;
    }> {
        const response = await axios.get<ApiResponse<{
            totalProjects: number;
            currentProjects: number;
            completedProjects: number;
            visibleProjects: number;
            categoryStats: Array<{ _id: string; count: number }>;
            techStats: Array<{ _id: string; count: number }>;
        }>>(`${API_URL}/project/stats`);
        return response.data.data;
    },
};
