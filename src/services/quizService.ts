import type { QuizQuestion } from "../types/quiz";
const API_URL = "https://ai-study-assistant-dttq.onrender.com/api/quizzes";
export const quizService = {
  async generateQuiz(
  topic: string,
  difficulty: string,
  count: number,
): Promise<QuizQuestion[]> {
  try {
    const response = await fetch(
      "https://ai-study-assistant-dttq.onrender.com/api/ai/quiz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          difficulty,
          count,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Quiz generation failed");
    }

    const data = await response.json();

    console.log("Quiz Provider:", data.provider);

    return data.questions || [];
  } catch (error) {
    console.error("Quiz Error:", error);
    return [];
  }
},
  async saveQuizResult(data: any) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save quiz");
  }

  return await response.json();
},
async getQuizResults(clerkId: string) {
  const response = await fetch(
    `${API_URL}?clerkId=${clerkId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch quiz history");
  }

  return await response.json();
},
};