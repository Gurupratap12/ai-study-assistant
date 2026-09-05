import type { Note } from "../../types/note";
import { Pencil, Trash2, Pin } from "lucide-react";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
  return (
    <div
      onClick={() => onEdit(note)}
      className="
        cursor-pointer
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        text-slate-900
        shadow-sm
        transition
        hover:shadow-md

        dark:border-slate-700
        dark:bg-slate-900
        dark:text-white
        dark:hover:bg-slate-800
      "
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {note.title}
        </h3>

        {note.pinned && (
          <Pin size={18} className="fill-yellow-400 text-yellow-400" />
        )}
      </div>

      <p className="mt-3 line-clamp-4 text-sm text-slate-600 dark:text-slate-300">
        {note.content}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {note.createdAt}
        </span>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="
              rounded-lg
              p-2
              text-slate-600
              transition
              hover:bg-slate-100

              dark:text-slate-300
              dark:hover:bg-slate-700
            "
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="
              rounded-lg
              p-2
              text-red-500
              transition
              hover:bg-red-50

              dark:hover:bg-red-950/40
            "
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
