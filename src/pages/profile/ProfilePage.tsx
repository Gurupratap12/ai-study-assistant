import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  User,
  Mail,
  ShieldCheck,
  FileText,
  Bot,
  Brain,
  Trophy,
} from "lucide-react";

import { notesService } from "../../services/notesService";
import { aiService } from "../../services/aiService";
import { quizService } from "../../services/quizService";

const ProfilePage = () => {
  const { user } = useUser();

  const [stats, setStats] = useState({
    notes: 0,
    chats: 0,
    quizzes: 0,
    averageScore: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;

      try {
        const [notes, chats, quizzes] = await Promise.all([
          notesService.getNotes(user.id),
          aiService.getChats(user.id),
          quizService.getQuizResults(user.id),
        ]);

        const totalMessages = chats.reduce(
          (count: number, chat: any) => count + (chat.messages?.length || 0),
          0,
        );

        const percentages = quizzes
          .map((quiz: any) => quiz.percentage)
          .filter(
            (percentage: unknown): percentage is number =>
              typeof percentage === "number",
          );

        const averageScore =
          percentages.length > 0
            ? Math.round(
                percentages.reduce(
                  (sum: number, percentage: number) => sum + percentage,
                  0,
                ) / percentages.length,
              )
            : 0;

        setStats({
          notes: notes.length,
          chats: totalMessages,
          quizzes: quizzes.length,
          averageScore,
        });
      } catch (error) {
        console.error("Profile Stats Error:", error);
      }
    };

    loadStats();
  }, [user]);

  const userName = user?.fullName || user?.firstName || "Student";

  const userEmail =
    user?.primaryEmailAddress?.emailAddress || "No email available";

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Profile
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your account and view your study activity.
          </p>
        </div>

        {/* Profile Header */}
        <div
          className="
        rounded-3xl
          border border-slate-200
          bg-white
          p-8
          shadow-sm

          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-black/20
        "
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div
              className="
            flex
              h-24
              w-24
              shrink-0
              items-center
              justify-center
              rounded-3xl
              bg-blue-100
              text-4xl
              font-bold
              text-blue-600

              dark:bg-blue-950
              dark:text-blue-400
            "
            >
              {userInitial}
            </div>

            {/* User Details */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {userName}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Mail size={16} />
                <span>{userEmail}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className="
                  rounded-full
                  bg-blue-100
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-blue-700

                  dark:bg-blue-950
                  dark:text-blue-300
                "
                >
                  Student
                </span>

                <span
                  className="
                flex
                items-center
                gap-1
                rounded-full
                bg-green-100
                px-3
                py-1
                  text-sm
                  font-medium
                  text-green-700

                  dark:bg-green-950
                  dark:text-green-300
                  "
                >
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            Account Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={<User size={20} />}
              title="Full Name"
              value={userName}
            />

            <InfoCard
              icon={<Mail size={20} />}
              title="Email"
              value={userEmail}
            />

            <InfoCard
              icon={<ShieldCheck size={20} />}
              title="Account Type"
              value="Student"
            />

            <InfoCard
              icon={<ShieldCheck size={20} />}
              title="Account Status"
              value="Active"
              valueClassName="text-green-600 dark:text-green-400"
            />
          </div>
        </section>

        {/* Study Statistics */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
            Study Statistics
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<FileText size={22} />}
              title="Notes"
              value={stats.notes}
            />

            <StatCard
              icon={<Bot size={22} />}
              title="AI Chats"
              value={stats.chats}
            />

            <StatCard
              icon={<Brain size={22} />}
              title="Quiz Attempts"
              value={stats.quizzes}
            />

            <StatCard
              icon={<Trophy size={22} />}
              title="Average Score"
              value={`${stats.averageScore}%`}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  valueClassName?: string;
}

const InfoCard = ({
  icon,
  title,
  value,
  valueClassName = "text-slate-900 dark:text-white",
}: InfoCardProps) => {
  return (
    <div
      className="
    flex
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm

        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-black/20
        "
    >
      <div
        className="
        flex
        h-11
        w-11
          items-center
          justify-center
          rounded-xl
          bg-slate-100
          text-slate-600

          dark:bg-slate-800
          dark:text-slate-300
          "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>

        <p className={`mt-1 truncate font-semibold ${valueClassName}`}>
          {value}
        </p>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const StatCard = ({ icon, title, value }: StatCardProps) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-md

        dark:border-slate-700
        dark:bg-slate-900
        dark:shadow-black/20
        dark:hover:border-slate-600
        dark:hover:bg-slate-800
        "
    >
      <div className="flex items-center justify-between">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-600
            
            dark:bg-slate-800
            dark:text-slate-300
            "
        >
          {icon}
        </div>
      </div>

      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{title}</p>

      <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
};

export default ProfilePage;
