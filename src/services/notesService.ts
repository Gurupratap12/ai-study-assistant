import type { Note } from "../types/note";

export const notesService = {
  async getNotes(): Promise<Note[]> {
    return [];
  },

  async createNote(_note: Note): Promise<void> {},

  async updateNote(
    _id: string,
    _data: Partial<Note>,
  ): Promise<void> {},

  async deleteNote(_id: string): Promise<void> {},
};