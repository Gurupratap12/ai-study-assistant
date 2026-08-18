import { useNavigate } from "react-router-dom";
import { findNehuCommand } from "../services/nehuCommandService";
import { speechService } from "../services/speechService";

export const useNehuCommand = () => {
  const navigate = useNavigate();

  const executeNehuCommand = (command: string) => {
    const result = findNehuCommand(command);

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