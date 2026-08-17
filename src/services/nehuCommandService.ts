const routes: Record<string, string> = {
  dashboard: "/dashboard",
  home: "/dashboard",

  notes: "/notes",
  "my notes": "/notes",

  quiz: "/quiz",
  "ai quiz": "/quiz",

  "ai assistant": "/ai-assistant",
  assistant: "/ai-assistant",

  "study planner": "/study-planner",
  planner: "/study-planner",

  progress: "/progress",
  profile: "/profile",
  settings: "/settings",
};

export const findNehuCommand = (command: string) => {
  const normalizedCommand = command.toLowerCase().trim();

  for (const [keyword, route] of Object.entries(routes)) {
    if (normalizedCommand.includes(keyword)) {
      return {
        type: "navigation",
        route,
      };
    }
  }

  return {
    type: "unknown",
    route: null,
  };
};