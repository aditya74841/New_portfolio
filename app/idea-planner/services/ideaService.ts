import axios from "axios";
import { LOCAL_SERVER_API_URL } from "../../constant";
import type { ApiResponse, Idea, IdeaStatus } from "../types";

const API_URL = LOCAL_SERVER_API_URL;

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const ideaService = {
  async listIdeas(token: string): Promise<Idea[]> {
    const res = await axios.get<ApiResponse<{ ideas: Idea[] }>>(`${API_URL}/idea`, {
      headers: authHeaders(token),
    });
    return res.data.data.ideas;
  },

  async getIdeaById(token: string, id: string): Promise<Idea> {
    const res = await axios.get<ApiResponse<Idea>>(`${API_URL}/idea/${id}`, {
      headers: authHeaders(token),
    });
    return res.data.data;
  },

  async createIdea(
    token: string,
    data: { title: string; description: string; status?: IdeaStatus }
  ): Promise<Idea> {
    const res = await axios.post<ApiResponse<Idea>>(`${API_URL}/idea`, data, {
      headers: authHeaders(token),
    });
    return res.data.data;
  },

  async updateIdea(
    token: string,
    id: string,
    data: Partial<{ title: string; description: string; status: IdeaStatus }>
  ): Promise<Idea> {
    const res = await axios.patch<ApiResponse<Idea>>(`${API_URL}/idea/${id}`, data, {
      headers: authHeaders(token),
    });
    return res.data.data;
  },

  async addUpdate(
    token: string,
    id: string,
    data: { description: string; links?: string[] }
  ): Promise<Idea> {
    const res = await axios.post<ApiResponse<Idea>>(`${API_URL}/idea/${id}/updates`, data, {
      headers: authHeaders(token),
    });
    return res.data.data;
  },

  async deleteUpdate(token: string, id: string, updateId: string): Promise<Idea> {
    const res = await axios.delete<ApiResponse<Idea>>(`${API_URL}/idea/${id}/updates/${updateId}`, {
      headers: authHeaders(token),
    });
    return res.data.data;
  },
};

