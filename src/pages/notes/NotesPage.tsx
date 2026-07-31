import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import NotesHeader from "../../components/notes/NotesHeader";
import SearchBar from "../../components/notes/SearchBar";

const NotesPage = () => {
  const [search, setSearch] = useState("");

  const handleCreateNote = () => {
    console.log("Create Note");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <NotesHeader onCreateNote={handleCreateNote} />

        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </div>
    </DashboardLayout>
  );
};

export default NotesPage;