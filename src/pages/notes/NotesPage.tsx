import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

import NotesHeader from "../../components/notes/NotesHeader";
import SearchBar from "../../components/notes/SearchBar";
import EmptyState from "../../components/notes/EmptyState";
import NoteCard from "../../components/notes/NoteCard";
import NoteModal from "../../components/notes/NoteModal";

import { useNotes } from "../../hooks/useNotes";
import type { Note } from "../../types/note";

const NotesPage = () => {
const { notes, createNote, updateNote, deleteNote } = useNotes();
const [search, setSearch] = useState("");
const filteredNotes = notes.filter((note) =>
note.title.toLowerCase().includes(search.toLowerCase())
);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedNote, setSelectedNote] = useState<Note | null>(null);

const handleSave = async (title: string, content: string) => {
    if (selectedNote) {
        await updateNote(selectedNote.id, {
            title,
            content,
        });
    } else {
        const newNote: Note = {
        id: crypto.randomUUID(),
        title,
        content,
        category: "General",
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await createNote(newNote);
    }

    setSelectedNote(null);
    setIsModalOpen(false);
  };

  const handleEdit = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <NotesHeader onCreateNote={handleCreate} />

        <SearchBar value={search} onChange={setSearch} />
        {notes.length === 0 ? (
          <EmptyState onCreateNote={handleCreate} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={deleteNote}
              />
            ))}
          </div>
        )}
      </div>

      <NoteModal
        isOpen={isModalOpen}
        note={selectedNote}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNote(null);
        }}
        onSave={handleSave}
      />
    </DashboardLayout>
  );
};

export default NotesPage;
