const reasons = [
  {
    icon: "🤖",
    title: "Powered by Gemini AI",
    description:
      "Get intelligent summaries, quizzes, flashcards, and explanations using Gemini AI.",
  },
  {
    icon: "🔒",
    title: "Secure Personal Workspace",
    description:
      "Every user's notes and study data remain private and accessible only to them.",
  },
  {
    icon: "⚡",
    title: "Fast & Responsive",
    description:
      "Built with React, TypeScript, and Tailwind CSS for a smooth experience.",
  },
  {
    icon: "📱",
    title: "Responsive Design",
    description: "Works seamlessly across desktop, tablet, and mobile devices.",
  },
  {
    icon: "📚",
    title: "All-in-One Study Platform",
    description:
      "Manage notes, generate quizzes, plan studies, and revise from one place.",
  },
  {
    icon: "🎯",
    title: "Designed for Students",
    description:
      "A clean and simple interface focused on improving learning productivity.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Built to Make Learning Easier
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            AI Study Assistant combines modern technology with a simple
            interface to help students study smarter and stay organized.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-5xl">{reason.icon}</div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {reason.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
