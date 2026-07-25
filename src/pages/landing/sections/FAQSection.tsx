import { useState } from "react";

const faqs = [
  {
    question: "Is AI Study Assistant free to use?",
    answer:
      "Yes. You can use the core features for free. This project uses the Gemini API for AI-powered study assistance.",
  },
  {
    question: "Can I upload my own study notes?",
    answer:
      "Yes. You can upload or paste your own notes and use AI to summarize, explain topics, generate quizzes, and create flashcards.",
  },
  {
    question: "Is my study data secure?",
    answer:
      "Yes. Each user has their own account, and personal notes are accessible only after login.",
  },
  {
    question: "Which AI model powers this application?",
    answer:
      "This application uses Google's Gemini AI API to generate study content and answer questions.",
  },
  {
    question: "Can I use it on mobile devices?",
    answer:
      "Yes. The website is fully responsive and works on desktops, tablets, and smartphones.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Find answers to the most common questions about AI Study Assistant.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-slate-900">
                  {faq.question}
                </span>

                <span className="text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="border-t border-slate-200 px-6 py-5 text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
