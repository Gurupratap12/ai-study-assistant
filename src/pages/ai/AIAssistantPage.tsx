import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Bot,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';

import DashboardLayout from '../../components/dashboard/DashboardLayout';

import ChatInput from '../../components/ai/ChatInput';
import ChatWindow from '../../components/ai/ChatWindow';

import { useChat } from '../../hooks/useChat';

const AIAssistantPage = () => {
  const {
    messages,
    loading,
    chats,
    currentChatId,
    sendMessage,
    clearChat,
    createNewChat,
    selectChat,
    deleteChat,
  } = useChat();

  const location = useLocation();

  const [voiceMessage, setVoiceMessage] = useState('');
  const [historyOpen, setHistoryOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // -----------------------------------------
  // Voice Assistant → Ask AI
  // -----------------------------------------

  useEffect(() => {
    const state = location.state as {
      action?: string;
      message?: string;
    } | null;

    const action = state?.action;
    const message = state?.message;

    if (action === 'ask-ai' && message) {
     // setVoiceMessage(message);

      window.history.replaceState(
        {},
        document.title,
        window.location.pathname,
      );
    }
  }, [location.state]);

  // -----------------------------------------
  // Filter chats
  // -----------------------------------------

  const filteredChats = chats.filter((chat) =>
    chat.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  // -----------------------------------------
  // New Chat
  // -----------------------------------------

  const handleNewChat = () => {
    createNewChat();
    setVoiceMessage('');
  };

  // -----------------------------------------
  // Delete Chat
  // -----------------------------------------

  const handleDeleteChat = async (
    event: React.MouseEvent<HTMLButtonElement>,
    chatId: string,
  ) => {
    event.stopPropagation();

    await deleteChat(chatId);
  };

  return (
    <DashboardLayout>
      <div
        className="
          flex
          h-[calc(100vh-120px)]
          min-h-155
          overflow-hidden
          rounded-[30px]
          border
          border-slate-200
          bg-white
          shadow-sm

          dark:border-slate-800
          dark:bg-slate-950
        "
      >
        {/* =========================================
            CHAT HISTORY SIDEBAR
        ========================================= */}

        <aside
          className={`
            ${
              historyOpen
                ? 'w-71.25 opacity-100'
                : 'w-0 opacity-0'
            }

            relative
            shrink-0
            overflow-hidden
            border-r
            border-slate-200
            bg-slate-50
            transition-all
            duration-300

            dark:border-slate-800
            dark:bg-slate-900/60
          `}
        >
          <div className="flex h-full w-71.25 flex-col">
            {/* History Header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-200
                px-4
                py-4

                dark:border-slate-800
              "
            >
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-100
                    text-blue-600

                    dark:bg-blue-950
                    dark:text-blue-400
                  "
                >
                  <MessageSquare size={17} />
                </div>

                <div>
                  <h2
                    className="
                      text-sm
                      font-bold
                      text-slate-900

                      dark:text-white
                    "
                  >
                    Conversations
                  </h2>

                  <p
                    className="
                      text-[11px]
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    {chats.length}{' '}
                    {chats.length === 1
                      ? 'conversation'
                      : 'conversations'}
                  </p>
                </div>
              </div>
            </div>

            {/* New Chat */}

            <div className="px-4 pt-4">
              <button
                onClick={handleNewChat}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-blue-600
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:bg-blue-700
                  hover:shadow-md
                  active:translate-y-0

                  dark:bg-blue-600
                  dark:hover:bg-blue-500
                "
              >
                <Plus size={18} />
                New Chat
              </button>
            </div>

            {/* Search */}

            <div className="px-4 pt-4">
              <div className="relative">
                <Search
                  size={16}
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search conversations..."
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-2.5
                    pl-10
                    pr-3
                    text-xs
                    text-slate-800
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-blue-400
                    focus:ring-2
                    focus:ring-blue-100

                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                    dark:placeholder:text-slate-500
                    dark:focus:border-blue-500
                    dark:focus:ring-blue-950
                  "
                />
              </div>
            </div>

            {/* Recent Chats */}

            <div className="flex-1 overflow-y-auto px-3 pb-4 pt-5">
              <div className="mb-2 px-2">
                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Recent Chats
                </p>
              </div>

              {filteredChats.length === 0 ? (
                <div
                  className="
                    mx-1
                    mt-8
                    rounded-2xl
                    border
                    border-dashed
                    border-slate-300
                    p-5
                    text-center

                    dark:border-slate-700
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-slate-100
                      text-slate-400

                      dark:bg-slate-800
                    "
                  >
                    <MessageSquare size={18} />
                  </div>

                  <p
                    className="
                      mt-3
                      text-xs
                      font-medium
                      text-slate-600

                      dark:text-slate-300
                    "
                  >
                    {searchQuery
                      ? 'No chats found'
                      : 'No conversations yet'}
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      leading-5
                      text-slate-400
                    "
                  >
                    {searchQuery
                      ? 'Try a different search.'
                      : 'Start a new chat and your conversations will appear here.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {filteredChats.map((chat) => {
                    const isActive =
                      chat._id === currentChatId;

                    return (
                      <div
                        key={chat._id}
                        className={`
                          group
                          flex
                          items-center
                          gap-2
                          rounded-2xl
                          border
                          p-2
                          transition

                          ${
                            isActive
                              ? `
                                border-blue-200
                                bg-blue-50
                                shadow-sm

                                dark:border-blue-900
                                dark:bg-blue-950/40
                              `
                              : `
                                border-transparent
                                hover:border-slate-200
                                hover:bg-white

                                dark:hover:border-slate-800
                                dark:hover:bg-slate-800
                              `
                          }
                        `}
                      >
                        <button
                          onClick={() =>
                            selectChat(chat._id)
                          }
                          className="
                            flex
                            min-w-0
                            flex-1
                            items-center
                            gap-3
                            text-left
                          "
                        >
                          <div
                            className={`
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl

                              ${
                                isActive
                                  ? `
                                    bg-blue-600
                                    text-white
                                  `
                                  : `
                                    bg-slate-100
                                    text-slate-500

                                    dark:bg-slate-700
                                    dark:text-slate-300
                                  `
                              }
                            `}
                          >
                            <MessageSquare size={15} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p
                              className={`
                                truncate
                                text-xs
                                font-semibold

                                ${
                                  isActive
                                    ? `
                                      text-blue-700

                                      dark:text-blue-300
                                    `
                                    : `
                                      text-slate-700

                                      dark:text-slate-200
                                    `
                                }
                              `}
                            >
                              {chat.title ||
                                'Untitled Chat'}
                            </p>

                            <p
                              className="
                                mt-0.5
                                text-[10px]
                                text-slate-400
                              "
                            >
                              {chat.messages?.length ?? 0}{' '}
                              {chat.messages?.length === 1
                                ? 'message'
                                : 'messages'}
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={(event) =>
                            handleDeleteChat(
                              event,
                              chat._id,
                            )
                          }
                          className="
                            rounded-lg
                            p-2
                            text-slate-400
                            opacity-0
                            transition
                            hover:bg-red-50
                            hover:text-red-500
                            group-hover:opacity-100

                            dark:hover:bg-red-950/40
                          "
                          title="Delete chat"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* =========================================
            MAIN CHAT AREA
        ========================================= */}

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-slate-200
              bg-white
              px-5
              py-4

              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* History Toggle */}

              <button
                onClick={() =>
                  setHistoryOpen((previous) => !previous)
                }
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-600
                  transition
                  hover:bg-slate-100

                  dark:border-slate-700
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
                title={
                  historyOpen
                    ? 'Hide chat history'
                    : 'Show chat history'
                }
              >
                {historyOpen ? (
                  <ChevronLeft size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {/* AI Icon */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  text-blue-600

                  dark:bg-blue-950
                  dark:text-blue-400
                "
              >
                <Bot size={21} />
              </div>

              <div className="min-w-0">
                <h1
                  className="
                    truncate
                    text-lg
                    font-bold
                    text-slate-900

                    dark:text-white
                  "
                >
                  AI Assistant
                </h1>

                <div className="flex items-center gap-1.5">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-500
                    "
                  />

                  <p
                    className="
                      text-xs
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    Ready to help you learn
                  </p>
                </div>
              </div>
            </div>

            {/* Header Actions */}

            <div className="flex items-center gap-2">
              <button
                onClick={handleNewChat}
                className="
                  hidden
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-50
                  sm:flex

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-200
                  dark:hover:bg-slate-700
                "
              >
                <Plus size={15} />
                New Chat
              </button>

              <button
                onClick={clearChat}
                disabled={messages.length === 0}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-slate-600
                  transition
                  hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-40

                  dark:border-slate-700
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                "
              >
                Clear
              </button>
            </div>
          </div>

          {/* =========================================
              CHAT WINDOW
          ========================================= */}

          <div className="flex min-h-0 flex-1 flex-col">
            <ChatWindow
              messages={messages}
              loading={loading}
            />

            {/* Input */}

            <ChatInput
              onSend={sendMessage}
              loading={loading}
              value={voiceMessage}
              onChange={setVoiceMessage}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistantPage;