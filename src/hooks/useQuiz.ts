import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { quizService } from "../services/quizService";
import type { QuizQuestion } from "../types/quiz";

export const useQuiz = () => {
  const { user } = useUser();
  const [subject, setSubject] = useState("");
const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const generateQuiz = async (
    topic: string,
    difficulty: string,
    count: number,
  ) => {
      setSubject(topic);
      setDifficulty(difficulty);
    try {
      setLoading(true);
      setScore(null);
      setAnswers({});

      const quiz = await quizService.generateQuiz(
        topic,
        difficulty,
        count,
      );

      setQuestions(quiz);
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (
    questionId: string,
    answer: string,
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

 const submitQuiz = async () => {
  let correct = 0;

  questions.forEach((question) => {
    if (answers[question.id] === question.correctAnswer) {
      correct++;
    }
  });

  setScore(correct);

  const percentage = Math.round(
    (correct / questions.length) * 100
  );

  if (!user) return;

  try {
    await quizService.saveQuizResult({
      clerkId: user.id,
      subject,
      difficulty,
      totalQuestions: questions.length,
      correctAnswers: correct,
      score: correct,
      percentage,
    });
  } catch (error) {
    console.error("Failed to save quiz:", error);
  }
};
  return {
    questions,
    answers,
    loading,
    score,
    generateQuiz,
    selectAnswer,
    submitQuiz,
  };
};