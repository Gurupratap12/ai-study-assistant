import { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const ChatInput = ({ onSend, loading, value, onChange }: ChatInputProps) => {
  const [message, setMessage] = useState(value || "");

  useEffect(() => {
    if (value !== undefined) {
      setMessage(value);
    }
  }, [value]);

  const updateMessage = (newValue: string) => {
    setMessage(newValue);
    onChange?.(newValue);
  };

  const handleSend = () => {
    if (!message.trim() || loading) return;

    onSend(message);

    updateMessage("");
  };

  return (
    <div className="flex items-end gap-3 border-t border-slate-200 bg-white p-4">
      <textarea
        value={message}
        onChange={(e) => updateMessage(e.target.value)}
        placeholder="Ask anything..."
        rows={2}
        className="flex-1 resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        <SendHorizontal size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
