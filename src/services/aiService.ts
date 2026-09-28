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
  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(
        'https://ai-study-assistant-dttq.onrender.com/api/ai/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

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

  async getChats(clerkId: string): Promise<ChatResponse[]> {
    const response = await fetch(`${API_URL}?clerkId=${clerkId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch chats');
    }

    const data: ChatResponse[] = await response.json();

    return data;
  },

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

  async saveChat(
    id: string | null,
    data: ChatData
  ): Promise<ChatResponse> {
    if (!id) {
      return await this.createChat(data);
    }

    return await this.updateChat(id, data);
  },

  async deleteChat(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete chat');
    }
  },
};