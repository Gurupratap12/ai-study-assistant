type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatData = {
  clerkId?: string;
  title?: string;
  messages?: ChatMessage[];
  [key: string]: unknown;
};

type ChatResponse = {
  id?: string;
  _id?: string;
  clerkId?: string;
  title?: string;
  messages?: ChatMessage[];
  [key: string]: unknown;
};

type AIResponse = {
  reply?: string;
};

const API_URL = `${import.meta.env.VITE_API_URL}/chats`;

export const aiService = {
  // ==================== AI CHAT ====================

  async sendMessage(message: string, history: ChatMessage[] = []): Promise<string> {
    try {
      const response = await fetch('https://ai-study-assistant-dttq.onrender.com/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error('AI request failed');
      }

      const data: AIResponse = await response.json();

      return data.reply || 'No response received.';
    } catch (error) {
      console.error('AI Error:', error);

      return 'Sorry, something went wrong. Please try again.';
    }
  },

  // ==================== GET CHATS ====================

  async getChats(clerkId: string): Promise<ChatResponse[]> {
    const response = await fetch(`${API_URL}?clerkId=${encodeURIComponent(clerkId)}`);

    if (!response.ok) {
      throw new Error('Failed to fetch chats');
    }

    const data: ChatResponse[] = await response.json();

    return data;
  },

  // ==================== CREATE CHAT ====================

  async createChat(data: ChatData): Promise<ChatResponse> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create chat');
    }

    const result: ChatResponse = await response.json();

    return result;
  },

  // ==================== UPDATE CHAT ====================

  async updateChat(id: string, data: ChatData): Promise<ChatResponse> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update chat');
    }

    const result: ChatResponse = await response.json();

    return result;
  },

  // ==================== SAVE CHAT ====================

  async saveChat(id: string | null, data: ChatData): Promise<ChatResponse> {
    if (!id) {
      return await this.createChat(data);
    }

    return await this.updateChat(id, data);
  },

  // ==================== DELETE CHAT ====================

  async deleteChat(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete chat');
    }
  },
};
