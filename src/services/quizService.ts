import { ai } from "../lib/gemini";
import type { QuizQuestion } from "../types/quiz";
const API_URL = "https://ai-study-assistant-dttq.onrender.com/api/quizzes";
export const quizService = {
  async generateQuiz(
    topic: string,
    difficulty: string,
    count: number,
  ): Promise<QuizQuestion[]> {
    try {
      const prompt = `
Create a ${difficulty} quiz on "${topic}".

Generate exactly ${count} multiple-choice questions.

Return ONLY valid JSON.

Format:

{
  "questions": [
    {
      "id": "1",
      "question": "",
      "options": ["", "", "", ""],
      "correctAnswer": "",
      "explanation": ""
    }
  ]
}

Do not add markdown.
Do not wrap in \`\`\`.
Return JSON only.
`;

      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
      });

      const text = response.text ?? "";

      const data = JSON.parse(text);

      return data.questions;
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