import { useState } from "react";

interface QuizFormProps {
  onGenerate: (topic: string, difficulty: string, count: number) => void;
  loading: boolean;
}

const QuizForm = ({ onGenerate, loading }: QuizFormProps) => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState(5);

  const handleSubmit = () => {
    if (!topic.trim()) return;

    onGenerate(topic, difficulty, count);
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">AI Quiz Generator</h2>

      {/* Topic */}

      <div className="mb-5">
        <label className="mb-2 block font-medium">Topic</label>

        <input
          type="text"
          placeholder="React, Java, DBMS..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      {/* Difficulty */}

      <div className="mb-5">
        <label className="mb-2 block font-medium">Difficulty</label>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full rounded-xl border px-4 py-3"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {/* Questions */}

      <div className="mb-6">
        <label className="mb-2 block font-medium">Questions</label>

        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>
    </div>
  );
};

export default QuizForm;
