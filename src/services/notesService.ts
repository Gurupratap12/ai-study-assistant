import type { Note } from "../types/note";

const NOTES_KEY = "ai-study-notes";

export const notesService = {
  async getNotes(): Promise<Note[]> {
    const notes = localStorage.getItem(NOTES_KEY);

    if (!notes) {
      return [];
    }

    return JSON.parse(notes);
  },

  async createNote(note: Note): Promise<void> {
    const notes = await this.getNotes();

    const updatedNotes = [note, ...notes];

    localStorage.setItem(
      NOTES_KEY,
      JSON.stringify(updatedNotes),
    );
  },

  async updateNote(
    id: string,
    data: Partial<Note>,
  ): Promise<void> {
    const notes = await this.getNotes();

    const updatedNotes = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            ...data,
            updatedAt: new Date().toISOString(),
          }
        : note,
    );

    localStorage.setItem(
      NOTES_KEY,
      JSON.stringify(updatedNotes),
    );
  },

  async deleteNote(id: string): Promise<void> {
    const notes = await this.getNotes();

    const updatedNotes = notes.filter(
      (note) => note.id !== id,
    );

    localStorage.setItem(
      NOTES_KEY,
      JSON.stringify(updatedNotes),
    );
  },
};