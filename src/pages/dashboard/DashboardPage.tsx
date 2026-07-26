import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import FeatureCard from "../../components/dashboard/FeatureCard";
import { ai } from "../../lib/gemini";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import {
  NotebookPen,
  Brain,
  Clock3,
  TrendingUp,
  Bot,
  FileText,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Study Notes",
    value: "24",
    icon: <NotebookPen size={22} />,
  },
  {
    title: "AI Quizzes",
    value: "12",
    icon: <Brain size={22} />,
  },
  {
    title: "Study Hours",
    value: "36h",
    icon: <Clock3 size={22} />,
  },
  {
    title: "Progress",
    value: "78%",
    icon: <TrendingUp size={22} />,
  },
];

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
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/login");
    }
  }, [isLoaded, userId, navigate]);

  const testGemini = async () => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: "What is the capital of Japan?",
      });

      console.log(response.text);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (isLoaded && !userId) {
      window.location.href = "/login";
    }
  }, [isLoaded, userId]);
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
              Welcome back, Manu
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
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                12 Days
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Today's Goal</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                2 Hours
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">AI Chats</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">146</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Completion</p>
              <h2 className="mt-2 text-3xl font-bold text-blue-600">78%</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
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
        <button
          onClick={testGemini}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Test Gemini
        </button>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
