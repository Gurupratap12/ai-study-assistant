import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

import type { ChatMessage } from '../types/chat';
import { aiService } from '../services/aiService';

type Chat = {
  _id: string;
  clerkId: string;
  title: string;
  messages: ChatMessage[];
};

export const useChat = () => {
  const { user } = useUser();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadChats = async () => {
      try {
        const chats = (await aiService.getChats(user.id)) as Chat[];

        if (chats.length > 0) {
          const latestChat = chats[0];

          setCurrentChatId(latestChat._id);
          setMessages(latestChat.messages ?? []);
        }
      } catch (error) {
        console.error('Failed to load chats:', error);
      }
    };

    loadChats();
  }, [user]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || !user) return;

    setLoading(true);

    try {
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
        createdAt: new Date().toISOString(),
      };

      const currentMessages = [...messages, userMessage];

      setMessages(currentMessages);

      const reply = await aiService.sendMessage(text);

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply,
        createdAt: new Date().toISOString(),
      };

      const updatedMessages = [...currentMessages, aiMessage];

      setMessages(updatedMessages);

      const chat = (await aiService.saveChat(currentChatId, {
        clerkId: user.id,
        title: text.substring(0, 30),
        messages: updatedMessages,
      })) as Chat;

      if (!currentChatId) {
        setCurrentChatId(chat._id);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    try {
      setMessages([]);
      localStorage.removeItem('ai-chat');

      if (currentChatId) {
        await aiService.updateChat(currentChatId, {
          messages: [],
        });
      }
    } catch (error) {
      console.error('Failed to clear chat:', error);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
  };
};