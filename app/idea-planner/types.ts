export type IdeaStatus = "idea" | "researching" | "building" | "shipped" | "paused";

export interface IdeaUpdate {
  _id: string;
  description: string;
  links?: string[];
  createdAt: string;
}

export interface Idea {
  _id: string;
  title: string;
  description: string;
  status: IdeaStatus;
  updates: IdeaUpdate[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

