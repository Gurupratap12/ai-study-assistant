import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const clearData = () => {
    localStorage.removeItem("ai-study-notes");
    localStorage.removeItem("ai-study-quiz-scores");
    localStorage.removeItem("ai-study-chats");

    alert("All data cleared!");
  };
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">Settings</h1>

        <div
          className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
        >
          <div className="flex items-center justify-between border-b pb-5">
            <div>
              <h2 className="font-semibold">Account Settings</h2>

              <p className="text-sm text-slate-500">
                Manage your account preferences
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>

                <p className="text-sm text-slate-500">
                  Choose your app appearance
                </p>
              </div>

              <button
                className="
                  rounded-xl
                  bg-slate-100
                  px-4
                  py-2
                  text-sm
                "
              >
                Light
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Clear Data</p>

                <p className="text-sm text-slate-500">
                  Remove saved local data
                </p>
              </div>

              <button
                onClick={clearData}
                className="
    rounded-xl
    bg-red-500
    px-4
    py-2
    text-white
  "
              >
                Clear
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="
    rounded-xl
    bg-slate-900
    px-4
    py-2
    text-white
  "
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
