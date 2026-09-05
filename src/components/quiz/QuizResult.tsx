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
      {/* Result Summary */}
      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          text-center
          shadow-lg

          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          🎉 Quiz Completed
        </h2>

        <p className="mt-4 text-5xl font-bold text-zinc-600 dark:text-zinc-300">
          {score} / {questions.length}
        </p>

        <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
          {percentage}% Score
        </p>

        <button
          onClick={onRetake}
          className="
            mt-6
            rounded-xl
            bg-blue-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-600
          "
        >
          Generate New Quiz
        </button>
      </div>

      {/* Questions */}
      {questions.map((question) => {
        const correct = answers[question.id] === question.correctAnswer;

        return (
          <div
            key={question.id}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow

              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {question.question}
            </h3>

            <p className="mt-3 text-slate-700 dark:text-slate-300">
              <strong>Your Answer:</strong>{" "}
              {answers[question.id] || "Not Answered"}
            </p>

            <p className="mt-2 text-slate-700 dark:text-slate-300">
              <strong>Correct Answer:</strong> {question.correctAnswer}
            </p>

            <p
              className={`mt-2 font-semibold ${
                correct
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {correct ? "✅ Correct" : "❌ Wrong"}
            </p>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              💡 {question.explanation}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default QuizResult;
