import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

import NotesHeader from "../../components/notes/NotesHeader";
import SearchBar from "../../components/notes/SearchBar";
import EmptyState from "../../components/notes/EmptyState";
import NoteCard from "../../components/notes/NoteCard";
import NoteModal from "../../components/notes/NoteModal";
import { useUser } from "@clerk/clerk-react";
import { useNotes } from "../../hooks/useNotes";
import type { Note } from "../../types/note";

const NotesPage = () => {
  const { user } = useUser();
  const location = useLocation();

  const { notes, createNote, updateNote, deleteNote } = useNotes();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = async (title: string, content: string) => {
    if (selectedNote) {
      if (!selectedNote.id) return;

      await updateNote(selectedNote.id, {
        title,
        content,
      });
    } else {
      const newNote = {
        clerkId: user?.id,
        id: "",
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

  useEffect(() => {
    const action = location.state?.action;
    const searchTerm = location.state?.searchTerm;

    if (action === "create-note") {
      handleCreate();
    }

    if (action === "search-notes") {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }

    if (action === "search-notes-term" && searchTerm) {
      setSearch(searchTerm);

      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }

    if (action === "open-note" && searchTerm) {
      const normalizedSearch = searchTerm.toLowerCase().trim();

      const matchingNote = notes.find((note) =>
        note.title.toLowerCase().includes(normalizedSearch),
      );

      if (matchingNote) {
        setSelectedNote(matchingNote);
        setIsModalOpen(true);
      }
    }

    if (action) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state, notes]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <NotesHeader onCreateNote={handleCreate} />

        <SearchBar ref={searchInputRef} value={search} onChange={setSearch} />

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
