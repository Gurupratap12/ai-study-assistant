import { useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const { signOut } = useClerk();
  const navigate = useNavigate();

  const clearData = () => {
    localStorage.removeItem("ai-study-notes");
    localStorage.removeItem("ai-study-quiz-scores");
    localStorage.removeItem("ai-study-chats");

    alert("All data cleared!");
  };

  const handleThemeChange = () => {
    const newDarkMode = !isDark;

    setIsDark(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800 dark:text-white">
          Settings
        </h1>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-slate-800">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Account Settings
              </h2>

              <p className="text-sm text-slate-500">
                Manage your account preferences
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {/* Theme */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Theme
                </p>

                <p className="text-sm text-slate-500">
                  Choose your app appearance
                </p>
              </div>

              <button
                onClick={handleThemeChange}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-800 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              >
                {isDark ? "Dark" : "Light"}
              </button>
            </div>

            {/* Clear Data */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Clear Data
                </p>

                <p className="text-sm text-slate-500">
                  Remove saved local data
                </p>
              </div>

              <button
                onClick={clearData}
                className="rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >
                Clear
              </button>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
