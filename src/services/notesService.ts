import type { Note } from "../types/note";

export const notesService = {
  async getNotes(): Promise<Note[]> {
    return [];
  },

  async createNote(note: Note): Promise<void> {},

  async updateNote(
    id: string,
    data: Partial<Note>,
  ): Promise<void> {},

  async deleteNote(id: string): Promise<void> {},
};