import { useEffect, useState } from "react";
import type { ChatMessage } from "../types/chat";
import { aiService } from "../services/aiService";

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
  const saved = localStorage.getItem("ai-chat");

  return saved ? JSON.parse(saved) : [];
});
useEffect(() => {
  localStorage.setItem("ai-chat", JSON.stringify(messages));
}, [messages]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const reply = await aiService.sendMessage(text);

    const aiMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: reply,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  const clearChat = () => {
  setMessages([]);
  localStorage.removeItem("ai-chat");
};

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
  };
};