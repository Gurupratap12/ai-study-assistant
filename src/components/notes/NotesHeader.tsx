import { Plus } from "lucide-react";

interface NotesHeaderProps {
  onCreateNote: () => void;
}

const NotesHeader = ({ onCreateNote }: NotesHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Notes</h1>

        <p className="mt-1 text-slate-500">
          Create, organize and manage your study notes.
        </p>
      </div>

      <button
        onClick={onCreateNote}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:-translate-y-0.5"
      >
        <Plus size={18} />
        New Note
      </button>
    </div>
  );
};

export default NotesHeader;