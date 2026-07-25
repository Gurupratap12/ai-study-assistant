const AIPreviewSection = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            AI Preview
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Experience AI Before You Sign Up
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Here's a preview of how AI Study Assistant helps you summarize
            notes, generate quizzes, and understand difficult concepts.
          </p>
        </div>

        {/* Preview */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Upload Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900">
              📄 Upload Notes
            </h3>

            <div className="mt-8 rounded-xl border-2 border-dashed border-blue-300 p-10 text-center">
              <div className="text-6xl">📄</div>

              <h4 className="mt-4 text-xl font-semibold">
                Operating_System_Notes.pdf
              </h4>

              <p className="mt-2 text-slate-500">Size: 2.4 MB</p>

              <div className="mt-6 inline-block rounded-full bg-green-100 px-5 py-2 text-green-700 font-semibold">
                ✅ Uploaded Successfully
              </div>
            </div>
          </div>

          {/* AI Result */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900">
                🤖 AI Summary
              </h3>

              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                Gemini AI
              </span>
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 p-6">
              <p className="leading-8 text-slate-600">
                Operating System manages computer hardware and software
                resources. It provides memory management, process scheduling,
                file management, security, and device communication to ensure
                efficient system performance.
              </p>
            </div>

            {/* AI Actions */}

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                📝 Generate Quiz
              </button>

              <button className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800">
                📚 Flashcards
              </button>

              <button className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100">
                📖 Explain Topic
              </button>

              <button className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100">
                📅 Study Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPreviewSection;
