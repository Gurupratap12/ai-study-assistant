import { NavLink } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const sidebarItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "📊",
  },
  {
    name: "Notes",
    path: "/notes",
    icon: "📚",
  },
  {
    name: "AI Assistant",
    path: "/ai-assistant",
    icon: "🤖",
  },
  {
    name: "Quiz",
    path: "/quiz",
    icon: "📝",
  },
  {
    name: "Progress",
    path: "/progress",
    icon: "📈",
  },
];

const Sidebar = () => {
  const { signOut } = useClerk();

  return (
    <aside
      className="
      sticky
      top-0
      hidden
      h-screen
      w-72
      border-r
      border-white/40
      bg-white/60
      p-6
      backdrop-blur-xl
      md:block
      "
    >
      {/* Logo */}

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-slate-900">
          AI Study
          <span className="text-blue-600">Assistant</span>
        </h1>

        <p className="mt-2 text-sm text-slate-500">Learn smarter with AI</p>
      </div>

      {/* Menu */}

      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
              group
              flex
              items-center
              gap-4
              rounded-2xl
              px-4
              py-3
              text-sm
              font-medium
              transition-all
              duration-300
              ${
                isActive
                  ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "text-slate-600 hover:bg-white hover:shadow-md"
              }
              `
            }
          >
            <span
              className="
              text-xl
              transition
              group-hover:scale-110
              "
            >
              {item.icon}
            </span>

            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}

      <button
        onClick={() =>
          signOut(() => {
            window.location.href = "/";
          })
        }
        className="
  absolute
  bottom-8
  left-6
  right-6
  rounded-2xl
  bg-red-50
  py-3
  font-medium
  text-red-600
  transition
  hover:bg-red-100
  "
      >
        🚪 Logout
      </button>
    </aside>
  );
};

export default Sidebar;
