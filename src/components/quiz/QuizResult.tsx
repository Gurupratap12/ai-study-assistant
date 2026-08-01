import type { QuizQuestion } from "../../types/quiz";

interface QuizResultProps {
  score: number;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  onRetake: () => void;
}

const QuizResult = ({
  score,
  questions,
  answers,
  onRetake,
}: QuizResultProps) => {
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 text-center shadow-lg">
        <h2 className="text-3xl font-bold">🎉 Quiz Completed</h2>

        <p className="mt-4 text-5xl font-bold text-zinc-600">
          {score} / {questions.length}
        </p>

        <p className="mt-2 text-lg text-slate-500">{percentage}% Score</p>

        <button
          onClick={onRetake}
          className="mt-6 rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white"
        >
          Generate New Quiz
        </button>
      </div>

      {questions.map((question) => {
        const correct = answers[question.id] === question.correctAnswer;

        return (
          <div key={question.id} className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-semibold">{question.question}</h3>

            <p className="mt-3">
              <strong>Your Answer:</strong>{" "}
              {answers[question.id] || "Not Answered"}
            </p>

            <p className="mt-2">
              <strong>Correct Answer:</strong> {question.correctAnswer}
            </p>

            <p
              className={`mt-2 font-semibold ${
                correct ? "text-green-600" : "text-red-600"
              }`}
            >
              {correct ? "✅ Correct" : "❌ Wrong"}
            </p>

            <p className="mt-4 text-slate-600">💡 {question.explanation}</p>
          </div>
        );
      })}
    </div>
  );
};

export default QuizResult;
