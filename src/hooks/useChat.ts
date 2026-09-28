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

  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // ==================== LOAD CHATS ====================

  useEffect(() => {
    if (!user) return;

    const loadChats = async () => {
      try {
        const response = await aiService.getChats(user.id);

        const loadedChats = response as Chat[];

        setChats(loadedChats);

        if (loadedChats.length > 0) {
          const firstChat = loadedChats[0];

          setCurrentChatId(firstChat._id);
          setMessages(firstChat.messages ?? []);
        } else {
          setCurrentChatId(null);
          setMessages([]);
        }
      } catch (error) {
        console.error('Failed to load chats:', error);
      }
    };

    loadChats();
  }, [user]);

  // ==================== CREATE NEW CHAT ====================

  const createNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  };

  // ==================== SELECT CHAT ====================

  const selectChat = (chatId: string) => {
    const selectedChat = chats.find((chat) => chat._id === chatId);

    if (!selectedChat) return;

    setCurrentChatId(selectedChat._id);
    setMessages(selectedChat.messages ?? []);
  };

  // ==================== SEND MESSAGE ====================

  const sendMessage = async (text: string) => {
    if (!text.trim() || !user || loading) return;

    setLoading(true);

    try {
      const cleanText = text.trim();

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: cleanText,
        createdAt: new Date().toISOString(),
      };

      /*
       * Short-term memory:
       * Send only the latest 20 messages from the current chat.
       *
       * We send the history BEFORE adding the current message,
       * because the backend will add the current message itself.
       */
      const shortTermHistory = messages.slice(-20);

      const currentMessages = [...messages, userMessage];

      setMessages(currentMessages);

      // Send current message + previous chat history to AI
      const reply = await aiService.sendMessage(cleanText, shortTermHistory);

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply,
        createdAt: new Date().toISOString(),
      };

      const updatedMessages = [...currentMessages, aiMessage];

      setMessages(updatedMessages);

      // ==================== SAVE CHAT ====================

      const title = cleanText.length > 32 ? `${cleanText.substring(0, 32)}...` : cleanText;

      const savedChat = (await aiService.saveChat(currentChatId, {
        clerkId: user.id,
        title,
        messages: updatedMessages,
      })) as Chat;

      // ==================== NEW CHAT SAVED ====================

      if (!currentChatId) {
        setCurrentChatId(savedChat._id);

        setChats((previousChats) => [savedChat, ...previousChats]);
      }

      // ==================== EXISTING CHAT UPDATED ====================
      else {
        setChats((previousChats) =>
          previousChats.map((chat) =>
            chat._id === currentChatId
              ? {
                  ...chat,
                  title,
                  messages: updatedMessages,
                }
              : chat,
          ),
        );
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  // ==================== CLEAR CURRENT CHAT ====================

  const clearChat = async () => {
    if (!currentChatId) {
      setMessages([]);
      return;
    }

    try {
      setMessages([]);

      await aiService.updateChat(currentChatId, {
        messages: [],
      });

      setChats((previousChats) =>
        previousChats.map((chat) =>
          chat._id === currentChatId
            ? {
                ...chat,
                messages: [],
              }
            : chat,
        ),
      );
    } catch (error) {
      console.error('Failed to clear chat:', error);
    }
  };

  // ==================== DELETE CHAT ====================

  const deleteChat = async (chatId: string) => {
    try {
      await aiService.deleteChat(chatId);

      const remainingChats = chats.filter((chat) => chat._id !== chatId);

      setChats(remainingChats);

      if (currentChatId === chatId) {
        if (remainingChats.length > 0) {
          const nextChat = remainingChats[0];

          setCurrentChatId(nextChat._id);
          setMessages(nextChat.messages ?? []);
        } else {
          setCurrentChatId(null);
          setMessages([]);
        }
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  // ==================== RETURN ====================

  return {
    messages,
    loading,
    chats,
    currentChatId,
    sendMessage,
    clearChat,
    createNewChat,
    selectChat,
    deleteChat,
  };
};
