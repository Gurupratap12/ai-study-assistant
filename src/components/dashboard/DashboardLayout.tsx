import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Search, Bell, Settings, Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useUser();

  const userName = user?.firstName || user?.fullName || "Student";

  const userInitial =
    user?.firstName?.charAt(0).toUpperCase() ||
    user?.fullName?.charAt(0).toUpperCase() ||
    "U";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Welcome Section */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-slate-200
          p-8
          text-slate-900
          shadow-2xl
          dark:border-slate-800
          dark:bg-slate-900
          dark:text-white
        "
      >
        <div className="relative z-10">
          <p className="text-slate-600 dark:text-slate-300">
            AI Study Assistant
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Welcome back, {userName}👋
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-slate-600 dark:text-slate-300">
            Continue learning smarter with AI. Generate notes, create quizzes
            and track your study progress from one place.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              className="
                rounded-2xl
                bg-white
                px-6
                py-3
                font-semibold
                text-slate-700
                transition
                hover:scale-105
                dark:bg-slate-800
                dark:text-white
                dark:hover:bg-slate-700
              "
            >
              Start Learning
            </button>

            <button
              className="
                rounded-2xl
                border
                border-slate-300
                bg-slate-100
                px-6
                py-3
                text-slate-700
                backdrop-blur
                transition
                hover:bg-slate-200
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:hover:bg-slate-700
              "
            >
              Ask AI
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main */}
        <main className="flex-1">
          {/* Top Navbar */}
          <header
            className="
              sticky
              top-0
              z-40
              border-b
              border-slate-200
              bg-white/90
              backdrop-blur-xl
              dark:border-slate-800
              dark:bg-slate-900/90
            "
          >
            <div className="flex h-20 items-center justify-between px-8">
              {/* Left */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="
                    rounded-xl
                    p-2
                    transition
                    hover:bg-slate-100
                    dark:hover:bg-slate-800
                    md:hidden
                  "
                >
                  <Menu size={22} />
                </button>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Dashboard
                  </h1>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Welcome back 👋
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden lg:block">
                  <Search
                    size={18}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    placeholder="Search..."
                    className="
                      w-72
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      py-3
                      pl-11
                      pr-4
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-blue-500
                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-white
                      dark:placeholder:text-slate-500
                    "
                  />
                </div>

                {/* Notification */}
                <button
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-3
                    text-slate-700
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-md
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                    dark:hover:bg-slate-700
                  "
                >
                  <Bell size={18} />
                </button>

                {/* Settings */}
                <NavLink
                  to="/settings"
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-3
                    text-slate-700
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-md
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                    dark:hover:bg-slate-700
                  "
                >
                  <Settings size={18} />
                </NavLink>

                {/* Profile */}
                <NavLink
                  to="/profile"
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-2
                    text-slate-900
                    transition
                    hover:shadow-md
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                    dark:hover:bg-slate-700
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-100
                      font-bold
                      text-blue-600
                      dark:bg-blue-900
                      dark:text-blue-300
                    "
                  >
                    {userInitial}
                  </div>

                  <div className="hidden text-left xl:block">
                    <p className="text-sm font-semibold">{userName}</p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Student
                    </p>
                  </div>
                </NavLink>
              </div>
            </div>
          </header>

          {/* Page */}
          <section className="p-8">{children}</section>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
