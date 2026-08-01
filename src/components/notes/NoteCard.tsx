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
      className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-slate-900">{note.title}</h3>

        {note.pinned && (
          <Pin size={18} className="fill-yellow-400 text-yellow-400" />
        )}
      </div>

      <p className="mt-3 line-clamp-4 text-sm text-slate-600">{note.content}</p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-slate-400">{note.createdAt}</span>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
