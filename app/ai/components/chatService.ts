import axios from "axios";
import { Message } from "./types";
import { SERVER_API_URL } from "../../constant";

// Using production server
const API_URL = SERVER_API_URL;

export interface ChatResponse {
    response: string;
    aiId?: string;
    messages?: Message[];
}

export const chatService = {
    // Fetch existing chat messages
    async getMessages(chatId: string): Promise<Message[]> {
        const response = await axios.get<{ messages: Message[] }>(
            `${API_URL}/ai/chat/${chatId}`
        );
        return response.data.messages || [];
    },

    // Send a new message
    async sendMessage(
        message: string,
        chatId?: string | null
    ): Promise<ChatResponse> {
        const url = chatId
            ? `${API_URL}/ai/chat?id=${chatId}`
            : `${API_URL}/ai/chat`;

        const response = await axios.post<ChatResponse>(url, { message });
        return response.data;
    },
};
