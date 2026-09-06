import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import FeatureCard from '../../components/dashboard/FeatureCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

import { notesService } from '../../services/notesService';
import { aiService } from '../../services/aiService';
import { quizService } from '../../services/quizService';

import { NotebookPen, Brain, TrendingUp, Bot, Mic, Sparkles, Target } from 'lucide-react';

const features = [
  {
    title: 'Nehu Commands',
    description: 'See what you can ask Nehu to do.',
    icon: <Mic size={22} />,
    route: '/nehu-commands',
  },
  {
    title: 'AI Quiz',
    description: 'Practice with AI generated quizzes.',
    icon: <Brain size={22} />,
    route: '/quiz',
  },
  {
    title: 'AI Assistant',
    description: 'Ask anything and learn faster.',
    icon: <Bot size={22} />,
    route: '/ai-assistant',
  },
];

const getTodayKey = () => {
  return new Date().toISOString().split('T')[0];
};

const DashboardPage = () => {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const userName = user?.firstName || user?.username || 'Student';
  const location = useLocation();
  const [stats, setStats] = useState({
    notes: 0,
    chats: 0,
    quizzes: 0,
    progress: 0,
  });

  // -----------------------------
  // Study Goal
  // -----------------------------

  const [goalMinutes, setGoalMinutes] = useState(() => {
    const saved = localStorage.getItem('studyGoalMinutes');

    return saved ? Number(saved) : 120;
  });

  const [studyMinutes, setStudyMinutes] = useState(() => {
    const savedDate = localStorage.getItem('studyDate');
    const savedMinutes = localStorage.getItem('studyMinutes');

    if (savedDate !== getTodayKey()) {
      localStorage.setItem('studyDate', getTodayKey());
      localStorage.setItem('studyMinutes', '0');

      return 0;
    }

    return savedMinutes ? Number(savedMinutes) : 0;
  });

  // -----------------------------
  // Track study time
  // -----------------------------

  useEffect(() => {
    // Games page par study time count nahi hoga
    if (location.pathname.startsWith('/games')) {
      return;
    }

    const today = getTodayKey();

    const savedDate = localStorage.getItem('studyDate');

    if (savedDate !== today) {
      localStorage.setItem('studyDate', today);
      localStorage.setItem('studyMinutes', '0');
      setStudyMinutes(0);
    }

    const interval = setInterval(() => {
      setStudyMinutes((previous) => {
        const updated = previous + 1;

        localStorage.setItem('studyMinutes', updated.toString());
        localStorage.setItem('studyDate', today);

        return updated;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  // -----------------------------
  // Set Goal
  // -----------------------------

  const handleSetGoal = () => {
    const currentHours = goalMinutes / 60;

    const input = window.prompt(`Set today's study goal in hours.\n\nCurrent goal: ${currentHours} hours`, currentHours.toString());

    if (input === null) return;

    const hours = Number(input);

    if (!Number.isFinite(hours) || hours <= 0) {
      alert('Please enter a valid goal.');
      return;
    }

    const minutes = Math.round(hours * 60);

    setGoalMinutes(minutes);

    localStorage.setItem('studyGoalMinutes', minutes.toString());
  };

  // -----------------------------
  // Completion %
  // -----------------------------

  const completion = Math.min(100, Math.round((studyMinutes / goalMinutes) * 100));

  const goalHours = Math.floor(goalMinutes / 60);
  const goalRemainingMinutes = goalMinutes % 60;

  const formattedGoal = goalRemainingMinutes === 0 ? `${goalHours} Hours` : `${goalHours}h ${goalRemainingMinutes}m`;

  // -----------------------------
  // Authentication
  // -----------------------------

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/login');
    }
  }, [isLoaded, userId, navigate]);

  // -----------------------------
  // Load Dashboard Stats
  // -----------------------------

  useEffect(() => {
    const loadDashboard = async () => {
      if (!user) return;

      try {
        const notes = await notesService.getNotes(user.id);
        const chats = await aiService.getChats(user.id);
        const quizzes = await quizService.getQuizResults(user.id);

        const totalMessages = chats.reduce((count: number, chat: any) => count + (chat.messages?.length || 0), 0);

        const averageScore = quizzes.length > 0 ? Math.round(quizzes.reduce((sum: number, quiz: any) => sum + (quiz.percentage || 0), 0) / quizzes.length) : 0;

        setStats({
          notes: notes.length,
          chats: totalMessages,
          quizzes: quizzes.length,
          progress: averageScore,
        });
      } catch (error) {
        console.error('Dashboard Error:', error);
      }
    };

    loadDashboard();
  }, [user]);

  return (
    <DashboardLayout>
      {/* Welcome Section */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-slate-200
          bg-white
          px-10
          py-12
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div
          className="
            absolute
            right-0
            top-0
            h-56
            w-56
            rounded-full
            bg-blue-50
            blur-3xl
            dark:bg-blue-950/30
          "
        />

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Left Content */}

          <div className="max-w-2xl">
            {/* Badge */}

            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-blue-50
                px-4
                py-2
                text-sm
                font-medium
                text-blue-700
                dark:border-blue-900
                dark:bg-blue-950
                dark:text-blue-300
              "
            >
              <Sparkles size={16} />
              AI Study Assistant
            </span>

            {/* Heading */}

            <h1
              className="
                mt-6
                text-5xl
                font-bold
                tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              Welcome back, {userName}
            </h1>

            {/* Description */}

            <p
              className="
                mt-5
                text-lg
                leading-8
                text-slate-600
                dark:text-slate-300
              "
            >
              Continue your learning journey with AI. Create smart notes, practice quizzes, chat with AI and keep track of your progress in one beautiful workspace.
            </p>

            {/* Goal Button */}

            <div className="mt-8">
              <button
                onClick={handleSetGoal}
                className="
                  inline-flex
                  items-center
                  gap-2
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
                  dark:bg-white
                  dark:text-slate-900
                  dark:hover:bg-slate-200
                "
              >
                <Target size={19} />
                Set Today's Goal
              </button>
            </div>
          </div>

          {/* Mini Statistics */}

          <div className="grid grid-cols-2 gap-4">
            {/* Study Streak */}

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
                dark:border-slate-700
                dark:bg-slate-800
              "
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">Study Streak</p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">1 Day</h2>
            </div>

            {/* Today's Goal */}

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
                dark:border-slate-700
                dark:bg-slate-800
              "
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">Today's Goal</p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{formattedGoal}</h2>
            </div>

            {/* AI Chats */}

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
                dark:border-slate-700
                dark:bg-slate-800
              "
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">AI Chats</p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stats.chats}</h2>
            </div>

            {/* Completion */}

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
                dark:border-slate-700
                dark:bg-slate-800
              "
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">Goal Completion</p>

              <h2
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-blue-600
                  dark:text-blue-400
                "
              >
                {completion}%
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {studyMinutes} / {goalMinutes} minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Study Notes" value={stats.notes.toString()} icon={<NotebookPen size={22} />} />

        <StatCard title="AI Chats" value={stats.chats.toString()} icon={<Bot size={22} />} />

        <StatCard title="AI Quizzes" value={stats.quizzes.toString()} icon={<Brain size={22} />} />

        <StatCard title="Progress" value={`${stats.progress}%`} icon={<TrendingUp size={22} />} />
      </section>

      {/* AI Tools */}

      <section className="mt-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI Learning Tools</h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">Everything you need to study smarter.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item) => (
            <FeatureCard key={item.title} title={item.title} description={item.description} icon={item.icon} onClick={() => navigate(item.route)} />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
