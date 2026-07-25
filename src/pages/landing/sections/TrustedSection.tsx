const TrustedSection = () => {
  const features = [
    "🤖 Gemini AI",
    "📝 Smart Notes",
    "📅 Study Planner",
    "📊 Dashboard",
    "❓ AI Q&A",
  ];

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Built for Modern Students
        </p>

        <h2 className="mt-3 text-3xl font-bold text-slate-900">
          Everything You Need to Study Smarter
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {features.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 text-lg font-medium shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;