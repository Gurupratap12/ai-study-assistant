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
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        AI Quiz Generator
      </h2>

      {/* Topic */}
      <div className="mb-5">
        <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
          Topic
        </label>

        <input
          type="text"
          placeholder="React, Java, DBMS..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-slate-900
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-blue-500
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
            dark:placeholder:text-slate-500
            dark:focus:border-blue-500
          "
        />
      </div>

      {/* Difficulty */}
      <div className="mb-5">
        <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
          Difficulty
        </label>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-slate-900
            outline-none
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
          "
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {/* Questions */}
      <div className="mb-6">
        <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
          Questions
        </label>

        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-slate-900
            outline-none
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
          "
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          w-full
          rounded-xl
          bg-blue-600
          py-3
          font-semibold
          text-white
          transition
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>
    </div>
  );
};

export default QuizForm;
