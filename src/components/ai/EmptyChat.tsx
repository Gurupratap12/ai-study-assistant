import { Bot } from "lucide-react";

const EmptyChat = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="rounded-full bg-blue-100 p-5 text-blue-600">
        <Bot size={40} />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        AI Assistant
      </h2>

      <p className="mt-2 max-w-md text-slate-500">
        Ask any study-related question and I'll help you
        with explanations, notes, summaries, and more.
      </p>
    </div>
  );
};

export default EmptyChat;