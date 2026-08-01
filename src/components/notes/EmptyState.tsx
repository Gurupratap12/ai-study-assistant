import { FileText } from "lucide-react";

interface EmptyStateProps {
  onCreateNote: () => void;
}

const EmptyState = ({ onCreateNote }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
      <div className="rounded-full bg-slate-100 p-5">
        <FileText size={40} className="text-slate-500" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        No Notes Yet
      </h2>

      <p className="mt-2 max-w-md text-slate-500">
        Start creating your first study note. Organize your ideas and keep
        everything in one place.
      </p>

      <button
        onClick={onCreateNote}
        className="mt-8 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
      >
        Create Your First Note
      </button>
    </div>
  );
};

export default EmptyState;