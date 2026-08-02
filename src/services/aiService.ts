import { ai } from "../lib/gemini";
const API_URL = "http://localhost:5000/api/chats";
export const aiService = {
  async sendMessage(message: string): Promise<string> {
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: message,
      });

      return response.text || "No response received.";
    } catch (error) {
      console.error("Gemini Error:", error);

      return "Sorry, something went wrong. Please try again.";
    }
  },

  async getChats(clerkId: string) {
    const response = await fetch(
      `${API_URL}?clerkId=${clerkId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch chats");
    }

    return await response.json();
  },

  async createChat(data: any) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create chat");
    }

    return await response.json();
  },

  async updateChat(id: string, data: any) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update chat");
    }

    return await response.json();
  },
  async saveChat(id: string | null, data: any) {
  if (!id) {
    return await this.createChat(data);
  }

  return await this.updateChat(id, data);
},

  async deleteChat(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete chat");
    }
  },
};