import { useState } from "react";
import { quizService } from "../services/quizService";
import type { QuizQuestion } from "../types/quiz";

export const useQuiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const generateQuiz = async (
    topic: string,
    difficulty: string,
    count: number,
  ) => {
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

 const submitQuiz = () => {
  let correct = 0;

  questions.forEach((question) => {
    if (answers[question.id] === question.correctAnswer) {
      correct++;
    }
  });

  setScore(correct);

  const quizScores = JSON.parse(
    localStorage.getItem("ai-study-quiz-scores") || "[]"
  );

  const percentage = Math.round(
  (correct / questions.length) * 100
);

quizScores.push(percentage);
  localStorage.setItem(
    "ai-study-quiz-scores",
    JSON.stringify(quizScores)
  );
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