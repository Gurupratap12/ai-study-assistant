const steps = [
  {
    step: "01",
    icon: "📤",
    title: "Upload Your Notes",
    description:
      "Paste your notes or upload study material to get started with AI-powered learning.",
  },
  {
    step: "02",
    icon: "🤖",
    title: "Gemini AI Processes",
    description:
      "Gemini analyzes your content and understands the topic to generate useful study resources.",
  },
  {
    step: "03",
    icon: "🎯",
    title: "Learn Smarter",
    description:
      "Receive summaries, quizzes, flashcards, explanations, and personalized study plans instantly.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            How It Works
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Learn in Just Three Simple Steps
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Start studying with AI in just a few clicks. No complicated setup,
            just upload your notes and let Gemini help you learn faster.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <span className="absolute right-6 top-6 text-5xl font-extrabold text-slate-200">
                {step.step}
              </span>

              <div className="mb-6 text-5xl">{step.icon}</div>

              <h3 className="text-2xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
