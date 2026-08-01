import { NavLink } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import {
  LayoutDashboard,
  NotebookPen,
  Bot,
  Brain,
  ChartColumn,
} from "lucide-react";
const sidebarItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Notes",
    path: "/notes",
    icon: NotebookPen,
  },
  {
    name: "AI Assistant",
    path: "/ai-assistant",
    icon: Bot,
  },
  {
    name: "AI Quiz",
    path: "/quiz",
    icon: Brain,
  },
  {
    name: "Progress",
    path: "/progress",
    icon: ChartColumn,
  },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { signOut } = useClerk();

  return (
    <aside
      className={`
    top-0
    h-screen
    w-72
    border-r
    border-white/40
    bg-white/60
    p-6
    backdrop-blur-xl

    fixed
    left-0
    z-50
    transition-transform
    duration-300

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

    md:sticky
    md:block
    md:translate-x-0
  `}
    >
      <button onClick={() => setSidebarOpen(false)} className="md:hidden">
        ✕
      </button>
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
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
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
        transition
        group-hover:scale-110
        "
              >
                <Icon size={20} />
              </span>

              {item.name}
            </NavLink>
          );
        })}
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
