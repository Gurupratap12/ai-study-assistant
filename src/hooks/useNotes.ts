import { useEffect, useState } from "react";
import type { Note } from "../types/note";
import { notesService } from "../services/notesService";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const data = await notesService.getNotes();

      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async (note: Note) => {
    await notesService.createNote(note);

    await fetchNotes();
  };

  const updateNote = async (
    id: string,
    data: Partial<Note>,
  ) => {
    await notesService.updateNote(id, data);

    await fetchNotes();
  };

  const deleteNote = async (id: string) => {
    await notesService.deleteNote(id);

    await fetchNotes();
  };

  return {
    notes,
    loading,
    createNote,
    updateNote,
    deleteNote,
  };
};