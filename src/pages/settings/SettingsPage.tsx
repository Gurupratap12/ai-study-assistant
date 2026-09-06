import { useState } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  // Nehu enabled by default
  const [nehuEnabled, setNehuEnabled] = useState(localStorage.getItem('nehu-enabled') !== 'false');

  const { signOut } = useClerk();
  const navigate = useNavigate();

  // Clear saved data
  const clearData = () => {
    localStorage.removeItem('ai-study-notes');
    localStorage.removeItem('ai-study-quiz-scores');
    localStorage.removeItem('ai-study-chats');

    alert('All data cleared!');
  };

  // Theme change
  const handleThemeChange = () => {
    const newDarkMode = !isDark;

    setIsDark(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Nehu enable / disable
  const handleNehuChange = () => {
    const newValue = !nehuEnabled;

    setNehuEnabled(newValue);

    localStorage.setItem('nehu-enabled', String(newValue));

    // Tell DashboardLayout about the change immediately
    window.dispatchEvent(new Event('nehu-setting-changed'));
  };

  // Logout
  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Settings</h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your account and application preferences.</p>
        </div>

        {/* Settings Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Account Settings Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-slate-800">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">Account Settings</h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">Manage your application preferences</p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {/* Theme */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Theme</p>

                <p className="text-sm text-slate-500 dark:text-slate-400">Choose your app appearance</p>
              </div>

              <button
                onClick={handleThemeChange}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              >
                {isDark ? 'Dark' : 'Light'}
              </button>
            </div>

            {/* Nehu Voice Assistant */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Nehu Voice Assistant</p>

                <p className="text-sm text-slate-500 dark:text-slate-400">Enable or disable Nehu voice commands</p>
              </div>

              <button
                type="button"
                onClick={handleNehuChange}
                aria-label={nehuEnabled ? 'Disable Nehu Voice Assistant' : 'Enable Nehu Voice Assistant'}
                className={`relative h-7 w-14 rounded-full transition-colors duration-300 ${nehuEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
              >
                <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${nehuEnabled ? 'left-8' : 'left-1'}`} />
              </button>
            </div>

            {/* Nehu Status */}
            <div className={`rounded-2xl p-4 ${nehuEnabled ? 'bg-blue-50 dark:bg-blue-950/40' : 'bg-slate-100 dark:bg-slate-800'}`}>
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${nehuEnabled ? 'animate-pulse bg-green-500' : 'bg-slate-400'}`} />

                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Nehu is {nehuEnabled ? 'enabled' : 'disabled'}</p>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {nehuEnabled ? 'Voice commands are available across the dashboard.' : 'Nehu will not appear or listen for voice commands.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Clear Data */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Clear Data</p>

                <p className="text-sm text-slate-500 dark:text-slate-400">Remove saved local study data</p>
              </div>

              <button onClick={clearData} className="rounded-xl bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600">
                Clear
              </button>
            </div>

            {/* Logout */}
            <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
              <button
                onClick={handleLogout}
                className="rounded-xl bg-slate-900 px-5 py-2.5 font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
