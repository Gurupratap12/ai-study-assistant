import { ai } from "../lib/gemini";

export const aiService = {
  async sendMessage(message: string): Promise<string> {
    try {
      const response = await ai.models.generateContent({
       model: "gemini-flash-latest",
        contents: message,
      });

      return response.text || "No response received.";
    } catch (error) {
      console.error("Gemini Error:", error);

      return "Sorry, something went wrong. Please try again.";
    }
  },
};