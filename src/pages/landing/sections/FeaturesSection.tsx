const features = [
  {
    icon: "📝",
    title: "AI Notes Summary",
    description:
      "Upload or paste your notes and get concise AI-generated summaries instantly.",
  },
  {
    icon: "💬",
    title: "Ask AI",
    description:
      "Ask any study-related question and receive clear, accurate explanations.",
  },
  {
    icon: "❓",
    title: "Quiz Generator",
    description:
      "Generate multiple-choice questions from any topic for quick revision.",
  },
  {
    icon: "📅",
    title: "Study Planner",
    description:
      "Create a personalized study schedule based on your subjects and available time.",
  },
  {
    icon: "📖",
    title: "Topic Explainer",
    description:
      "Understand difficult concepts with simple and beginner-friendly explanations.",
  },
  {
    icon: "🗂️",
    title: "Flashcard Generator",
    description:
      "Generate revision flashcards automatically for faster learning.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Features
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Everything You Need to Learn Smarter
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            AI-powered tools designed to help students understand concepts,
            revise faster, and stay productive throughout their learning
            journey.
          </p>
        </div>

        {/* Cards */}
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
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 text-5xl">{feature.icon}</div>

              <h3 className="text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
