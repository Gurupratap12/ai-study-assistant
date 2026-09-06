import type { QuizQuestion as Question } from '../../types/quiz';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer?: string;
  onSelect: (answer: string) => void;
}

const QuizQuestion = ({ question, selectedAnswer, onSelect }: QuizQuestionProps) => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-lg
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">{question.question}</h3>

      <div className="space-y-3">
        {question.options.map((option) => (
          <label
            key={option}
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-xl
              border
              border-slate-200
              bg-white
              p-4
              text-slate-700
              transition
              hover:border-blue-500
              hover:bg-slate-50
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-200
              dark:hover:border-blue-500
              dark:hover:bg-slate-700
            "
          >
            <input type="radio" name={question.id} checked={selectedAnswer === option} onChange={() => onSelect(option)} className="accent-blue-600" />

            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
