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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50">
      <div
        className="
  relative
  overflow-hidden
  rounded-3xl
  bg-linear-to-r
  from-stone-00
  via-gray-200
  to-zinc-200
  p-8
  text-black
  shadow-2xl
  "
      >
        <div className="relative z-10">
          <p className="text-black">AI Study Assistant</p>

          <h2 className="mt-2 text-4xl font-bold">
            Welcome back, {userName}👋
          </h2>

          <p className="mt-4 max-w-xl text-black leading-7">
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
        text-stone-700
        transition
        hover:scale-105
        "
            >
              Start Learning
            </button>

            <button
              className="
        rounded-2xl
        border
        border-white/30
        bg-white/10
        px-6
        py-3
        backdrop-blur
        transition
        hover:bg-white/20
        "
            >
              Ask AI
            </button>
          </div>
        </div>

        <div
          className="
    absolute
    -right-10
    -top-10
    h-52
    w-52
    rounded-full
    bg-white/10
    blur-2xl
    "
        />

        <div
          className="
    absolute
    bottom-0
    right-32
    h-32
    w-32
    rounded-full
    bg-cyan-300/20
    blur-2xl
    "
        />
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
            border-white/40
            bg-white/60
            backdrop-blur-xl
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
  md:hidden
  "
                >
                  <Menu size={22} />
                </button>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Dashboard
                  </h1>

                  <p className="text-sm text-slate-500">Welcome back 👋</p>
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-4">
                {/* Search */}

                <div className="relative hidden lg:block">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    placeholder="Search..."
                    className="
                    w-72
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white/80
                    py-3
                    pl-11
                    pr-4
                    outline-none
                    transition
                    focus:border-blue-500
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
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-md
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
    transition
    hover:-translate-y-0.5
    hover:shadow-md
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
    transition
    hover:shadow-md
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
      bg-linear-to-r
      from-sky-300
      via-slate-500
      to-emerald-300
      font-bold
      text-white
    "
                  >
                    {userInitial}
                  </div>

                  <div className="hidden text-left xl:block">
                    <p className="text-sm font-semibold">{userName}</p>

                    <p className="text-xs text-slate-500">Student</p>
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
