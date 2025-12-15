import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import FileGrid from "./components/FileGrid";
import CreateFolderModal from "./components/CreateFolderModal";
import { folders } from "./data/dummyData";

export default function App() {
  const [showProfile, setShowProfile] = useState(false);
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8fafd] overflow-hidden">
      <Sidebar
        onNewClick={() => setShowNewMenu(!showNewMenu)}
        showNewMenu={showNewMenu}
        onCreateFolder={() => {
          setShowNewMenu(false);       // close dropdown
          setShowCreateFolder(true);   // open modal
        }}
        onMenuClose={() => setShowNewMenu(false)}

      />
      {/* <Header /> */}
      <div className="flex-1 flex flex-col">
        <Topbar
          onProfileClick={() => setShowProfile(!showProfile)}
         showProfile={showProfile}
          onProfileClose={() => setShowProfile(false)}
        />

        <main className="p-4 h-full bg-white mb-2 mr-4 ml-4 rounded-2xl overflow-y-auto">
          <FileGrid />
        </main>
      </div>
      {showCreateFolder && (
        <CreateFolderModal
        existingNames={folders.map(f => f.name)}
          onClose={() => setShowCreateFolder(false)}
          onCreate={(name) => {
            console.log("Create folder:", name);
          }}
        />
      )}
    </div>
  );
}
