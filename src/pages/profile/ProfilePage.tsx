//import { User } from "lucide-react";

const notes = JSON.parse(localStorage.getItem("ai-study-notes") || "[]");

const chats = JSON.parse(localStorage.getItem("ai-chat") || "[]");

const quizScores = JSON.parse(
  localStorage.getItem("ai-study-quiz-scores") || "[]",
);
const ProfilePage = () => {
  const userName = "Manu";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">Profile</h1>

        <div
          className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
        >
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div
              className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-3xl
                bg-linear-to-r
                from-sky-300
                via-slate-500
                to-emerald-300
                text-4xl
                font-bold
                text-white
              "
            >
              {userInitial}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{userName}</h2>

              <p className="text-slate-500">Student</p>
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Account Type</p>

              <p className="mt-1 font-semibold">Student</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Status</p>

              <p className="mt-1 font-semibold text-green-600">Active</p>
            </div>
          </div>
          <div
            className="
  mt-6
  grid
  gap-4
  md:grid-cols-3
"
          >
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Notes</p>
              <p className="mt-1 text-2xl font-bold">{notes.length}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">AI Chats</p>
              <p className="mt-1 text-2xl font-bold">{chats.length}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Quiz Attempts</p>
              <p className="mt-1 text-2xl font-bold">{quizScores.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
