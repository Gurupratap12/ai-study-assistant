import { FileText } from 'lucide-react';

interface EmptyStateProps {
  onCreateNote: () => void;
}

const EmptyState = ({ onCreateNote }: EmptyStateProps) => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-slate-300
        bg-white
        py-20
        text-center

        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <div className="rounded-full bg-slate-100 p-5 dark:bg-slate-800">
        <FileText size={40} className="text-slate-500 dark:text-slate-400" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">No Notes Yet</h2>

      <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">Start creating your first study note. Organize your ideas and keep everything in one place.</p>

      <button
        onClick={onCreateNote}
        className="
          mt-8
          rounded-xl
          bg-slate-900
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-slate-800

          dark:bg-white
          dark:text-slate-900
          dark:hover:bg-slate-200
        "
      >
        Create Your First Note
      </button>
    </div>
  );
};

export default EmptyState;
