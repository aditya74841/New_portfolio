import axios from "axios";
import { Message } from "./types";
import { LOCAL_SERVER_API_URL } from "../../constant";

// Using local server for development - change to SERVER_API_URL for production
const SERVER_API_URL = LOCAL_SERVER_API_URL; // "http://localhost:8080/api/v1"

export interface ChatResponse {
    response: string;
    aiId?: string;
    messages?: Message[];
}

export const chatService = {
    // Fetch existing chat messages
    async getMessages(chatId: string): Promise<Message[]> {
        const response = await axios.get<{ messages: Message[] }>(
            `${SERVER_API_URL}/ai/chat/${chatId}`
        );
        return response.data.messages || [];
    },

    // Send a new message
    async sendMessage(
        message: string,
        chatId?: string | null
    ): Promise<ChatResponse> {
        const url = chatId
            ? `${SERVER_API_URL}/ai/chat?id=${chatId}`
            : `${SERVER_API_URL}/ai/chat`;

        const response = await axios.post<ChatResponse>(url, { message });
        return response.data;
    },
};
