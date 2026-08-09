import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import { notesService } from "../../services/notesService";
import { aiService } from "../../services/aiService";
import { quizService } from "../../services/quizService";

const ProfilePage = () => {
  const { user } = useUser();

  const [stats, setStats] = useState({
    notes: 0,
    chats: 0,
    quizzes: 0,
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
        setStats({
          notes: notes.length,
          chats: totalMessages,
          quizzes: quizzes.length,
        });
      } catch (error) {
        console.error("Profile Stats Error:", error);
      }
    };

    loadStats();
  }, [user]);

  const userName = user?.firstName || user?.fullName || "Student";

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold text-slate-900">Profile</h1>

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
      >
        {/* Avatar */}
        <div className="flex items-center gap-5">
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-3xl
              bg-linear-to-r
              from-sky-300
              via-slate-500
              to-emerald-300
              text-4xl
              font-bold
              text-white
            "
          >
            {userInitial}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{userName}</h2>

            <p className="text-slate-500">Student</p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Account Type</p>
            <p className="mt-1 font-semibold">Student</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Status</p>
            <p className="mt-1 font-semibold text-green-600">Active</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Notes</p>
            <p className="mt-1 text-2xl font-bold">{stats.notes}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">AI Chats</p>
            <p className="mt-1 text-2xl font-bold">{stats.chats}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Quiz Attempts</p>
            <p className="mt-1 text-2xl font-bold">{stats.quizzes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
