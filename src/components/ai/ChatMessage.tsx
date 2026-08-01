import type { ChatMessage as Message } from "../../types/chat";
import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message.content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[80%] gap-3 ${isUser ? "flex-row-reverse" : ""}`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isUser ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-800 border border-slate-200"
          }`}
        >
          <div className="prose prose-sm max-w-none wrap-break-word">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {message.content}
  </ReactMarkdown>
</div>

          <p
            className={`mt-2 text-xs ${
              isUser ? "text-blue-100" : "text-slate-400"
            }`}
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {!isUser && (
            <button
              onClick={copyMessage}
              className="mt-3 flex items-center gap-2 text-xs text-slate-500 transition hover:text-blue-600"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
