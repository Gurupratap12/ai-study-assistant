import type { ProgressData } from "../types/progress";

export const progressService = {
  getProgress(): ProgressData {
    const notes =
      JSON.parse(localStorage.getItem("ai-study-notes") || "[]");

    const chats =
      JSON.parse(localStorage.getItem("ai-chat") || "[]");

    const quizScores =
      JSON.parse(localStorage.getItem("ai-study-quiz-scores") || "[]");

    const averageScore =
      quizScores.length > 0
        ? Math.round(
            quizScores.reduce(
              (sum: number, score: number) => sum + score,
              0,
            ) / quizScores.length,
          )
        : 0;

    return {
      notesCount: notes.length,
      aiChats: chats.length,
      quizzesTaken: quizScores.length,
      averageScore,
    };
  },
};