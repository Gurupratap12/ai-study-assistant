import type { Note } from "../types/note";

const API_URL = "https://ai-study-assistant-dttq.onrender.com/api/notes";

export const notesService = {
 async getNotes(clerkId: string): Promise<Note[]> {
  const response = await fetch(`${API_URL}?clerkId=${clerkId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await response.json();
},

  async createNote(note: Note, clerkId: string): Promise<void> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...note,
      clerkId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }
},

  async updateNote(
    id: string,
    data: Partial<Note>,
  ): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update note");
    }
  },

  async deleteNote(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
  },
};