
import axios, { AxiosResponse } from "axios";
import { SERVER_API_URL } from "../constant";

const BASE_URL = `${SERVER_API_URL}/update`;
const CATEGORY_URL = `${SERVER_API_URL}/category`;

// Type Definitions
interface UpdateData {
  update: string;
}

interface CategoryData {
  _id: string;
  name: string;
}

interface UpdateResponse {
  _id: string;
  update: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryResponse {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: {
    docs?: T[];
    [key: string]: any;
  };
}

interface CreateUpdateResponse {
  success: boolean;
  message: string;
  data: UpdateResponse;
}

// Fetch all updates
export const fetchUpdates = async (): Promise<UpdateResponse[]> => {
  try {
    const res: AxiosResponse<ApiResponse<UpdateResponse>> = await axios.get(
      `${BASE_URL}?page=1&limit=100`
    );
    return res.data.data.updates || res.data.data || [];
  } catch (error) {
    console.error("Error fetching updates:", error);
    throw error;
  }
};

// Fetch all categories
// export const fetchCategories = async (): Promise<CategoryResponse[]> => {
//   try {
//     const res: AxiosResponse<ApiResponse<CategoryResponse>> = await axios.get(
//       `${CATEGORY_URL}?page=1&limit=100`
//     );
//     return res.data.data.docs || res.data.data || [];
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     throw error;
//   }
// };

// Create a new update
export const createUpdate = async (
  form: UpdateData
): Promise<AxiosResponse<CreateUpdateResponse>> => {
  try {
    return await axios.post<CreateUpdateResponse>(BASE_URL, form);
  } catch (error) {
    console.error("Error creating update:", error);
    throw error;
  }
};

// Update an existing update
export const updateUpdate = async (
  id: string,
  form: UpdateData
): Promise<AxiosResponse<CreateUpdateResponse>> => {
  try {
    return await axios.put<CreateUpdateResponse>(`${BASE_URL}/${id}`, form);
  } catch (error) {
    console.error("Error updating update:", error);
    throw error;
  }
};

// Delete an update
export const deleteUpdate = async (id: string): Promise<AxiosResponse<any>> => {
  try {
    return await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting update:", error);
    throw error;
  }
};
// import axios from "axios";
// import { SERVER_API_URL } from "../constant";

// // const BASE_URL = `https://portfolio-server-8zb7.onrender.com/api/v1/update`;
// // const CATEGORY_URL = `https://portfolio-server-8zb7.onrender.com/api/v1/category`;
// const 
// const BASE_URL = `${SERVER_API_URL}/update`;
// const CATEGORY_URL = `${SERVER_API_URL}/category`;

// export const fetchUpdates = async () => {
//   const res = await axios.get(`${BASE_URL}?page=1&limit=100`);
//   return res.data.data.docs || res.data.data || [];
// };

// export const fetchCategories = async () => {
//   const res = await axios.get(`${CATEGORY_URL}?page=1&limit=100`);
//   return res.data.data.docs || res.data.data || [];
// };

// export const createUpdate = async (form) => {
//   return axios.post(BASE_URL, form);
// };

// export const updateUpdate = async (id, form) => {
//   return axios.put(`${BASE_URL}/${id}`, form);
// };

// export const deleteUpdate = async (id) => {
//   return axios.delete(`${BASE_URL}/${id}`);
// };
