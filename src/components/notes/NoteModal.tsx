import { useEffect, useState } from 'react';
import type { Note } from '../../types/note';

interface NoteModalProps {
  isOpen: boolean;
  note?: Note | null;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
}

const NoteModal = ({ isOpen, note, onClose, onSave }: NoteModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 dark:bg-black/60">
      <div
        className="
          w-full
          max-w-2xl
          rounded-2xl
          bg-white
          p-6
          shadow-xl
          dark:border
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{note ? 'Edit Note' : 'Create Note'}</h2>

        <div className="mt-6 space-y-5">
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
              placeholder:text-slate-400
              focus:border-blue-500

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:placeholder:text-slate-500
            "
          />

          <textarea
            rows={10}
            placeholder="Start writing..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-slate-900
              outline-none
              placeholder:text-slate-400
              focus:border-blue-500

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:placeholder:text-slate-500
            "
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="
                rounded-xl
                border
                border-slate-300
                px-5
                py-2
                text-slate-700
                transition
                hover:bg-slate-100

                dark:border-slate-700
                dark:text-slate-300
                dark:hover:bg-slate-800
              "
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(title, content)}
              className="
                rounded-xl
                bg-slate-900
                px-5
                py-2
                text-white
                transition
                hover:bg-slate-800

                dark:bg-white
                dark:text-slate-900
                dark:hover:bg-slate-200
              "
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
