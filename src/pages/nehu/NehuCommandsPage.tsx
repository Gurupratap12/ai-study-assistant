import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Mic, Navigation, FileText, Bot, Square } from 'lucide-react';

const NehuCommandsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
              <Mic size={26} />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Nexa Voice Commands</h1>

              <p className="mt-1 text-slate-500 dark:text-slate-400">Discover what you can ask Nexa to do.</p>
            </div>
          </div>
        </div>

        {/* Intro */}
        <div
          className="
            rounded-3xl
            border border-blue-100
            bg-blue-50
            p-6
            dark:border-blue-900/50
            dark:bg-blue-950/30
          "
        >
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">🎙️ How to use Nexa</h2>

          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Start your command with <b>"Nexa"</b> and then tell the assistant what you want to do.
          </p>

          <div
            className="
              mt-4
              rounded-2xl
              border border-slate-200
              bg-white
              p-4
              font-medium
              text-slate-700
              shadow-sm
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-200
            "
          >
            "Nexa, open my notes"
          </div>
        </div>

        {/* Navigation Commands */}
        <CommandSection
          icon={<Navigation size={22} />}
          title="Navigation Commands"
          commands={[
            ['Nexa, go home', 'Opens the Dashboard/Home page.'],
            ['Nexa, home', 'Opens the Dashboard.'],
            ['Nexa, go back', 'Returns to the previous page.'],
            ['Nexa, back', 'Returns to the previous page.'],
            ['Nexa, open my notes', 'Opens the Notes section.'],
            ['Nexa, open quiz', 'Opens the Quiz section.'],
            ['Nexa, open AI Assistant', 'Opens the AI Assistant.'],
            ['Nexa, open study planner', 'Opens the Study Planner.'],
            ['Nexa, open progress', 'Opens the Progress section.'],
            ['Nexa, open profile', 'Opens your Profile.'],
            ['Nexa, open settings', 'Opens Settings.'],
          ]}
        />

        {/* Notes Commands */}
        <CommandSection
          icon={<FileText size={22} />}
          title="Notes Commands"
          commands={[
            ['Nexa, create a note', 'Opens the New Note window.'],
            ['Nexa, create note', 'Opens the New Note window.'],
            ['Nexa, new note', 'Opens the New Note window.'],
            ['Nexa, add a note', 'Opens the New Note window.'],
            ['Nexa, search my notes', 'Opens Notes and activates note search.'],
            ['Nexa, search my notes for Physics', 'Searches notes for the specified topic.'],
            ['Nexa, search notes for Mathematics', 'Filters notes according to the topic.'],
            ['Nexa, find my notes for DBMS', 'Searches for DBMS-related notes.'],
            ['Nexa, open my Physics notes', 'Finds and opens a matching Physics note.'],
            ['Nexa, open my DBMS notes', 'Finds and opens a matching DBMS note.'],
          ]}
        />

        {/* AI Assistant Commands */}
        <CommandSection
          icon={<Bot size={22} />}
          title="AI Assistant Commands"
          commands={[
            ['Nexa, ask AI explain Binary Search', 'Opens AI Assistant with the request.'],
            ['Nexa, ask AI about Photosynthesis', 'Opens AI Assistant with the topic.'],
            ['Nexa, ask Assistant about Recursion', 'Prepares the question in AI Assistant.'],
            ['Nexa, tell AI about DBMS', 'Opens AI Assistant with the query.'],
            ['Nexa, ask explain Linked List', 'Places the question in AI Assistant.'],
          ]}
        />

        {/* Voice Control */}
        <CommandSection
          icon={<Square size={22} />}
          title="Voice Control Commands"
          commands={[
            ['Nexa, stop listening', "Stops Nexa's voice recognition."],
            ['Nexa, stop Nexa', 'Stops Nexa from listening.'],
          ]}
        />
      </div>
    </DashboardLayout>
  );
};

interface CommandSectionProps {
  icon: React.ReactNode;
  title: string;
  commands: [string, string][];
}

const CommandSection = ({ icon, title, commands }: CommandSectionProps) => {
  return (
    <section>
      {/* Section Header */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-700
            dark:bg-slate-800
            dark:text-slate-200
          "
        >
          {icon}
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>

      {/* Commands */}
      <div className="grid gap-4 md:grid-cols-2">
        {commands.map(([command, description]) => (
          <div
            key={command}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-md

              dark:border-slate-700
              dark:bg-slate-900
              dark:shadow-black/20
              dark:hover:border-slate-600
              dark:hover:bg-slate-800
            "
          >
            <p className="font-semibold text-slate-900 dark:text-white">"{command}"</p>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NehuCommandsPage;
