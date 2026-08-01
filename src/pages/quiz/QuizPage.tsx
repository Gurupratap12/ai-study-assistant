import DashboardLayout from "../../components/dashboard/DashboardLayout";
import QuizForm from "../../components/quiz/QuizForm";
import QuizQuestion from "../../components/quiz/QuizQuestion";
import QuizResult from "../../components/quiz/QuizResult";
import { useQuiz } from "../../hooks/useQuiz";

const QuizPage = () => {
  const {
    questions,
    answers,
    loading,
    score,
    generateQuiz,
    selectAnswer,
    submitQuiz,
  } = useQuiz();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">AI Quiz</h1>

          <p className="mt-2 text-slate-500">
            Generate quizzes with AI and test your knowledge.
          </p>
        </div>

        {questions.length === 0 && (
          <QuizForm onGenerate={generateQuiz} loading={loading} />
        )}

        {questions.length > 0 && score === null && (
          <>
            <div className="space-y-6">
              {questions.map((question) => (
                <QuizQuestion
                  key={question.id}
                  question={question}
                  selectedAnswer={answers[question.id]}
                  onSelect={(answer) => selectAnswer(question.id, answer)}
                />
              ))}
            </div>

            <button
              onClick={submitQuiz}
              className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white"
            >
              Submit Quiz
            </button>
          </>
        )}

        {score !== null && (
          <QuizResult
            score={score}
            questions={questions}
            answers={answers}
            onRetake={() => window.location.reload()}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default QuizPage;
