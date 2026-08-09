import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ProgressCard from "../../components/progress/ProgressCard";
import { useProgress } from "../../hooks/useProgress";
import { useUser } from "@clerk/clerk-react";

import { NotebookPen, Bot, Brain, Trophy } from "lucide-react";

const ProgressPage = () => {
  const { user } = useUser();

const { progress } = useProgress(user?.id ?? null);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold text-slate-900">Study Progress</h1>

          <p className="mt-2 text-slate-500">
            Track your learning journey and achievements.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <ProgressCard
            title="Notes"
            value={progress.notesCount}
            icon={<NotebookPen size={26} />}
            color="bg-blue-100 text-blue-600"
          />

          <ProgressCard
            title="AI Chats"
            value={progress.aiChats}
            icon={<Bot size={26} />}
            color="bg-green-100 text-green-600"
          />

          <ProgressCard
            title="Quizzes"
            value={progress.quizzesTaken}
            icon={<Brain size={26} />}
            color="bg-purple-100 text-purple-600"
          />

          <ProgressCard
            title="Average Score"
            value={`${progress.averageScore}%`}
            icon={<Trophy size={26} />}
            color="bg-yellow-100 text-yellow-600"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProgressPage;
