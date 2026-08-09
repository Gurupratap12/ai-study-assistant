import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import FeatureCard from "../../components/dashboard/FeatureCard";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { notesService } from "../../services/notesService";
import { aiService } from "../../services/aiService";
import { quizService } from "../../services/quizService";

import {
  NotebookPen,
  Brain,
  TrendingUp,
  Bot,
  FileText,
  Sparkles,
} from "lucide-react";
const features = [
  {
    title: "AI Notes",
    description: "Generate smart notes instantly.",
    icon: <FileText size={22} />,
  },
  {
    title: "AI Quiz",
    description: "Practice with AI generated quizzes.",
    icon: <Brain size={22} />,
  },
  {
    title: "AI Assistant",
    description: "Ask anything and learn faster.",
    icon: <Bot size={22} />,
  },
];
const DashboardPage = () => {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const userName = user?.firstName || user?.username || "Student";
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    notes: 0,
    chats: 0,
    quizzes: 0,
    progress: 0,
  });
  const progress = stats.notes === 0 ? 0 : Math.min(100, stats.notes * 10);
  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/login");
    }
  }, [isLoaded, userId, navigate]);

  useEffect(() => {
    const loadDashboard = async () => {
      if (!user) return;

      try {
        const notes = await notesService.getNotes(user.id);
        const chats = await aiService.getChats(user.id);
        const quizzes = await quizService.getQuizResults(user.id);

        const totalMessages = chats.reduce(
          (count: number, chat: any) => count + (chat.messages?.length || 0),
          0,
        );

        const averageScore =
          quizzes.length > 0
            ? Math.round(
                quizzes.reduce(
                  (sum: number, quiz: any) => sum + (quiz.score || 0),
                  0,
                ) / quizzes.length,
              )
            : 0;

        setStats({
          notes: notes.length,
          chats: totalMessages,
          quizzes: quizzes.length,
          progress: averageScore,
        });
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    loadDashboard();
  }, [user]);
  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white px-10 py-12 shadow-sm">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-50 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles size={16} />
              AI Study Assistant
            </span>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
              Welcome back, {userName}
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Continue your learning journey with AI. Create smart notes,
              practice quizzes, chat with AI and keep track of your progress in
              one beautiful workspace.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                className="
          rounded-xl
          bg-slate-900
          px-6
          py-3
          font-semibold
          text-white
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-slate-800
          "
              >
                Start Learning
              </button>

              <button
                className="
          rounded-xl
          border
          border-slate-300
          bg-white
          px-6
          py-3
          font-semibold
          text-slate-700
          transition-all
          duration-300
          hover:border-blue-600
          hover:text-blue-600
          "
              >
                Ask AI
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Study Streak</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">1 Day</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Today's Goal</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                2 Hours
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">AI Chats</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {stats.chats}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Completion</p>
              <h2 className="mt-2 text-3xl font-bold text-blue-600">
                {progress}%
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Study Notes"
          value={stats.notes.toString()}
          icon={<NotebookPen size={22} />}
        />

        <StatCard
          title="AI Chats"
          value={stats.chats.toString()}
          icon={<Bot size={22} />}
        />

        <StatCard
          title="AI Quizzes"
          value={stats.quizzes.toString()}
          icon={<Brain size={22} />}
        />

        <StatCard
          title="Progress"
          value={`${stats.progress}%`}
          icon={<TrendingUp size={22} />}
        />
      </section>

      {/* AI Tools */}
      <section className="mt-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            AI Learning Tools
          </h2>

          <p className="mt-2 text-slate-500">
            Everything you need to study smarter.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
