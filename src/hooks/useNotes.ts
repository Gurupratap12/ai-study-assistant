import { useEffect, useState } from "react";
import type { Note } from "../types/note";
import { notesService } from "../services/notesService";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotes = async () => {
      const data = await notesService.getNotes();

      setNotes(data);
      setLoading(false);
    };

    loadNotes();
  }, []);

  return {
    notes,
    loading,
  };
};