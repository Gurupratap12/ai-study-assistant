import { useNavigate } from "react-router-dom";
import { findNehuCommand } from "../services/nehuCommandService";

export const useNehuCommand = () => {
  const navigate = useNavigate();

  const executeNehuCommand = (command: string) => {
    const result = findNehuCommand(command);

    if (result.type === "navigation" && result.route) {
      navigate(result.route);
      return true;
    }

    return false;
  };

  return {
    executeNehuCommand,
  };
};