import { useEffect, useState } from "react";
import type { ChatMessage } from "../types/chat";
import { aiService } from "../services/aiService";
import { useUser } from "@clerk/clerk-react";
export const useChat = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  
useEffect(() => {
  if (!user) return;

  const loadChats = async () => {
    try {
      const chats = await aiService.getChats(user.id);

     if (chats.length > 0) {
  setCurrentChatId(chats[0]._id);
  setMessages(chats[0].messages);
}
    } catch (error) {
      console.error(error);
    }
  };

  loadChats();
}, [user]);

  const sendMessage = async (text: string) => {
    console.log("Current Chat ID:", currentChatId);
  if (!text.trim() || !user) return;

  setLoading(true);

  try {
    // User Message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    const currentMessages = [...messages, userMessage];

    setMessages(currentMessages);

   
    const reply = await aiService.sendMessage(text);

    const aiMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: reply,
      createdAt: new Date().toISOString(),
    };

    const updatedMessages = [...currentMessages, aiMessage];

    setMessages(updatedMessages);

    // Save / Update Chat
const chat = await aiService.saveChat(currentChatId, {
  clerkId: user.id,
  title: text.substring(0, 30),
  messages: updatedMessages,
});

if (!currentChatId) {
  setCurrentChatId(chat._id);
}
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const clearChat = async () => {
  try {
    setMessages([]);
    localStorage.removeItem("ai-chat");

    if (currentChatId) {
      await aiService.updateChat(currentChatId, {
        messages: [],
      });
    }
  } catch (error) {
    console.error("Failed to clear chat:", error);
  }
};

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
  };
};