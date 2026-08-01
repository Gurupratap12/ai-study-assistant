import type { QuizQuestion as Question } from "../../types/quiz";

interface QuizQuestionProps {
  question: Question;
  selectedAnswer?: string;
  onSelect: (answer: string) => void;
}

const QuizQuestion = ({
  question,
  selectedAnswer,
  onSelect,
}: QuizQuestionProps) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <h3 className="mb-5 text-lg font-semibold">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition hover:border-blue-500"
          >
            <input
              type="radio"
              name={question.id}
              checked={selectedAnswer === option}
              onChange={() => onSelect(option)}
            />

            <span>{option}</span>
          </label>
        ))}
      </div>

    </div>
  );
};

export default QuizQuestion;