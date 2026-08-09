import type { ProgressData } from "../types/progress";
import { notesService } from "./notesService";
import { aiService } from "./aiService";
import { quizService } from "./quizService";

export const progressService = {
  async getProgress(userId: string): Promise<ProgressData> {
    const notes = await notesService.getNotes(userId);
    const chats = await aiService.getChats(userId);
    const quizzes = await quizService.getQuizResults(userId);

    const totalMessages = chats.reduce(
      (count: number, chat: any) =>
        count + (chat.messages?.length || 0),
      0,
    );

    const averageScore =
  quizzes.length > 0
    ? Math.round(
        quizzes.reduce(
          (sum: number, quiz: any) =>
            sum + (quiz.percentage || 0),
          0,
        ) / quizzes.length,
      )
    : 0;

    return {
      notesCount: notes.length,
      aiChats: totalMessages,
      quizzesTaken: quizzes.length,
      averageScore,
    };
  },
};