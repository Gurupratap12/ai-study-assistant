import { useEffect, useState } from "react";
import { progressService } from "../services/progressService";
import type { ProgressData } from "../types/progress";

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressData>({
    notesCount: 0,
    aiChats: 0,
    quizzesTaken: 0,
    averageScore: 0,
  });

  const loadProgress = () => {
    const data = progressService.getProgress();
    setProgress(data);
  };

  useEffect(() => {
    loadProgress();
  }, []);

  return {
    progress,
    refreshProgress: loadProgress,
  };
};