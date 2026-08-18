import { useNavigate } from "react-router-dom";
import { findNehuCommand } from "../services/nehuCommandService";
import { speechService } from "../services/speechService";

export const useNehuCommand = (
  stopListening?: () => void,
) => {
  const navigate = useNavigate();

  const executeNehuCommand = (command: string) => {
    const normalizedCommand = command.toLowerCase().trim();

    // Go back
    if (
      normalizedCommand.includes("go back") ||
      normalizedCommand === "back"
    ) {
      speechService.speak("Going back.");
      navigate(-1);

      return true;
    }

    // Go home
    if (
      normalizedCommand.includes("go home") ||
      normalizedCommand === "home"
    ) {
      speechService.speak("Going home.");
      navigate("/dashboard");

      return true;
    }

    // Stop listening
    if (
      normalizedCommand.includes("stop listening") ||
      normalizedCommand.includes("stop nehu")
    ) {
      speechService.speak("Okay, stopping Nehu.");

      stopListening?.();

      return true;
    }

    // Existing navigation commands
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