import { useNavigate } from "react-router-dom";
import { findNehuCommand } from "../services/nehuCommandService";
import { speechService } from "../services/speechService";

export const useNehuCommand = (
  stopListening?: () => void,
) => {
  const navigate = useNavigate();

  const executeNehuCommand = (command: string) => {
    const normalizedCommand = command.toLowerCase().trim();

    // --------------------------------
    // Ask AI
    // --------------------------------
    const askAIMatch = normalizedCommand.match(
      /(?:ask ai|ask assistant|tell ai|ask)(?: about| to explain| explain)? (.+)/,
    );

    if (askAIMatch) {
      const question = askAIMatch[1].trim();

      speechService.speak("Opening AI Assistant.");

      navigate("/ai-assistant", {
        state: {
          action: "ask-ai",
          message: question,
        },
      });

      return true;
    }

    // --------------------------------
    // Search notes with a search term
    // --------------------------------
    const searchNotesMatch = normalizedCommand.match(
      /(?:search|find)(?: my)? notes (?:for|about) (.+)/,
    );

    if (searchNotesMatch) {
      const searchTerm = searchNotesMatch[1].trim();

      speechService.speak(
        `Searching your notes for ${searchTerm}.`,
      );

      navigate("/notes", {
        state: {
          action: "search-notes-term",
          searchTerm,
        },
      });

      return true;
    }

    // --------------------------------
    // Open a specific note
    // --------------------------------
    const openNoteMatch = normalizedCommand.match(
      /open (?:my )?(.+?) notes?$/,
    );

    if (openNoteMatch) {
      const searchTerm = openNoteMatch[1].trim();

      speechService.speak(
        `Opening your ${searchTerm} note.`,
      );

      navigate("/notes", {
        state: {
          action: "open-note",
          searchTerm,
        },
      });

      return true;
    }

    // --------------------------------
    // Search notes
    // --------------------------------
    if (
      normalizedCommand.includes("search my notes") ||
      normalizedCommand.includes("search notes") ||
      normalizedCommand.includes("find my notes") ||
      normalizedCommand.includes("find notes")
    ) {
      speechService.speak("Opening your notes search.");

      navigate("/notes", {
        state: {
          action: "search-notes",
        },
      });

      return true;
    }

    // --------------------------------
    // Create note
    // --------------------------------
    if (
      normalizedCommand.includes("create a note") ||
      normalizedCommand.includes("create note") ||
      normalizedCommand.includes("new note") ||
      normalizedCommand.includes("add a note")
    ) {
      speechService.speak("Opening a new note.");

      navigate("/notes", {
        state: {
          action: "create-note",
        },
      });

      return true;
    }

    // --------------------------------
    // Go back
    // --------------------------------
    if (
      normalizedCommand.includes("go back") ||
      normalizedCommand === "back"
    ) {
      speechService.speak("Going back.");
      navigate(-1);

      return true;
    }

    // --------------------------------
    // Go home
    // --------------------------------
    if (
      normalizedCommand.includes("go home") ||
      normalizedCommand === "home"
    ) {
      speechService.speak("Going home.");
      navigate("/dashboard");

      return true;
    }

    // --------------------------------
    // Stop listening
    // --------------------------------
    if (
      normalizedCommand.includes("stop listening") ||
      normalizedCommand.includes("stop nehu")
    ) {
      speechService.speak("Okay, stopping Nehu.");

      stopListening?.();

      return true;
    }

    // --------------------------------
    // Existing navigation commands
    // --------------------------------
    const result = findNehuCommand(normalizedCommand);

    if (result.type === "navigation" && result.route) {
      navigate(result.route);

      const responses: Record<string, string> = {
        "/dashboard": "Opening your dashboard.",
        "/notes": "Opening your notes.",
        "/quiz": "Opening your quiz.",
        "/ai-assistant": "Opening AI Assistant.",
        "/study-planner": "Opening your study planner.",
        "/progress": "Opening your progress.",
        "/profile": "Opening your profile.",
        "/settings": "Opening your settings.",
      };

      speechService.speak(
        responses[result.route] || "Opening that page.",
      );

      return true;
    }

    speechService.speak(
      "Sorry, I didn't understand that command.",
    );

    return false;
  };

  return {
    executeNehuCommand,
  };
};