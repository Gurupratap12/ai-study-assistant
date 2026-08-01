import { useEffect, useRef } from "react";

import type { ChatMessage } from "../../types/chat";
import ChatMessageItem from "./ChatMessage";
import EmptyChat from "./EmptyChat";
import TypingIndicator from "./TypingIndicator";

interface ChatWindowProps {
  messages: ChatMessage[];
  loading: boolean;
}

const ChatWindow = ({
  messages,
  loading,
}: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  if (messages.length === 0) {
    return <EmptyChat />;
  }

  return (
    <div className="flex-1 space-y-6 overflow-y-auto p-6">
      {messages.map((message) => (
        <ChatMessageItem
          key={message.id}
          message={message}
        />
      ))}

      {loading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;