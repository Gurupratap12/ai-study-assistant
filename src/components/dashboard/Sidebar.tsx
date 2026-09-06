import { NavLink } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { LayoutDashboard, NotebookPen, Bot, Brain, ChartColumn } from 'lucide-react';

const sidebarItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Notes',
    path: '/notes',
    icon: NotebookPen,
  },
  {
    name: 'AI Assistant',
    path: '/ai-assistant',
    icon: Bot,
  },
  {
    name: 'AI Quiz',
    path: '/quiz',
    icon: Brain,
  },
  {
    name: 'Progress',
    path: '/progress',
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
        border-slate-200
        bg-white
        p-6

        fixed
        left-0
        z-50
        transition-transform
        duration-300

        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}

        md:sticky
        md:block
        md:translate-x-0

        dark:border-slate-800
        dark:bg-slate-900
      `}
    >
      <button
        onClick={() => setSidebarOpen(false)}
        className="
          mb-4
          text-slate-600
          dark:text-slate-300
          md:hidden
        "
      >
        ✕
      </button>

      {/* Logo */}

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          AI Study
          <span className="text-blue-600">Assistant</span>
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Learn smarter with AI</p>
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

                ${isActive ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-slate-100 hover:shadow-md dark:text-slate-300 dark:hover:bg-slate-800'}
                `
              }
            >
              <span className="transition group-hover:scale-110">
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
            window.location.href = '/';
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
          dark:bg-red-950
          dark:text-red-400
          dark:hover:bg-red-900
        "
      >
        🚪 Logout
      </button>
    </aside>
  );
};

export default Sidebar;
