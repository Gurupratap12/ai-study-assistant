export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questions: QuizQuestion[];
}