import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="bg-linear-to-b from-blue-50 via-white to-white"
    >
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-12 px-6 py-20 lg:flex-row">
        {/* Left Content */}
        <div className="max-w-2xl">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            📚 AI Powered Learning Platform
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
            Study Smarter with
            <span className="text-blue-600"> AI Study Assistant</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Upload your study notes, get instant AI summaries, ask questions,
            generate quizzes, and boost your learning with the power of Gemini
            AI.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
            >
              Get Started
            </Link>

            <a
              href="#features"
              className="rounded-xl border border-slate-300 px-7 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 hover:shadow-xl"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-10 flex items-center gap-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">100+</h3>
              <p className="text-slate-500">Study Notes</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">24/7</h3>
              <p className="text-slate-500">AI Support</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">AI</h3>
              <p className="text-slate-500">Powered</p>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div
          className="
rounded-3xl
border
border-slate-200
bg-white
shadow-sm
transition-all
duration-300
hover:-translate-y-2
hover:shadow-xl
"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="text-4xl">📄</div>

            <div>
              <h3 className="font-bold text-slate-900">
                Operating System Notes
              </h3>
              <p className="text-sm text-slate-500">Uploaded Successfully</p>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 p-4">
            <p className="font-semibold text-blue-700">🤖 AI Summary</p>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Process management, CPU scheduling, memory allocation and deadlock
              concepts summarized into easy-to-understand notes.
            </p>
          </div>

          <div className="mt-6 rounded-xl bg-green-100 p-4">
            <p className="font-semibold text-green-700">✅ AI Ready</p>

            <p className="mt-2 text-sm text-slate-600">
              Ask questions, generate quizzes and revise faster.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
