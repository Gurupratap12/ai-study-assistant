import { useEffect, useState } from "react";
import { progressService } from "../services/progressService";
import type { ProgressData } from "../types/progress";

export const useProgress = (userId: string | null) => {
  const [progress, setProgress] = useState<ProgressData>({
    notesCount: 0,
    aiChats: 0,
    quizzesTaken: 0,
    averageScore: 0,
  });

  const loadProgress = async () => {
    if (!userId) return;

    try {
      const data = await progressService.getProgress(userId);
      setProgress(data);
    } catch (error) {
      console.error("Progress Error:", error);
    }
  };

  useEffect(() => {
    loadProgress();
  }, [userId]);

  return {
    progress,
    refreshProgress: loadProgress,
  };
};