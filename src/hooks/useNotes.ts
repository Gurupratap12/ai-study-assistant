import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import type { Note } from "../types/note";
import { notesService } from "../services/notesService";

export const useNotes = () => {
  const { user } = useUser();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const data = await notesService.getNotes(user.id);

      setNotes(data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const createNote = async (note: Note) => {
    if (!user) return;

    await notesService.createNote(note, user.id);

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