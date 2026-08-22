import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import ChatInput from "../../components/ai/ChatInput";
import ChatWindow from "../../components/ai/ChatWindow";

import { useChat } from "../../hooks/useChat";

const AIAssistantPage = () => {
  const { messages, loading, sendMessage, clearChat } = useChat();

  const location = useLocation();

  const [voiceMessage, setVoiceMessage] = useState("");

  useEffect(() => {
    const action = location.state?.action;
    const message = location.state?.message;

    if (action === "ask-ai" && message) {
      setVoiceMessage(message);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-120px)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Assistant</h1>

            <p className="text-sm text-slate-500">
              Ask anything and learn faster.
            </p>
          </div>

          <button
            onClick={clearChat}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
          >
            Clear Chat
          </button>
        </div>

        {/* Messages */}
        <ChatWindow messages={messages} loading={loading} />

        {/* Input */}
        <ChatInput
          onSend={sendMessage}
          loading={loading}
          value={voiceMessage}
          onChange={setVoiceMessage}
        />
      </div>
    </DashboardLayout>
  );
};

export default AIAssistantPage;
