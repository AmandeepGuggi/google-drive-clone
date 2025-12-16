import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import FileGrid from "./components/FileGrid";
import { folders, files } from "./data/dummyData";
import NameModal from "./components/NameModal";

export default function App() {
  const [showProfile, setShowProfile] = useState(false);
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [contextMenu, setContextMenu] = useState(null);

  return (
    <div className="flex h-screen bg-[#f8fafd] overflow-hidden">
      <Sidebar
        onNewClick={() => setShowNewMenu(!showNewMenu)}
        showNewMenu={showNewMenu}
        onCreateFolder={() => {
          setShowNewMenu(false);      
          setShowCreateFolder(true);   
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
          <FileGrid
          menuState={contextMenu}
          setMenuState={setContextMenu}
          handleRenameSubmit={() => {
          setContextMenu(null);       
          setShowRenameModal(true);  
        }} />
        </main>
      </div>
      {showCreateFolder && (
         <NameModal
          initialName="New folder"
          existingNames={folders.map(f => f.name)}
          onSubmit={(name) => {
            console.log("Folder Item:", name);
          }}
          onClose={(()=> setShowCreateFolder(false))}
          title="Create new folder"
          actionLabel = "Create"
           />
      )}
      {
        showRenameModal && (
          <NameModal
          initialName="profile"
          existingNames={files.map(f => f.name)}
          onSubmit={(name) => {
            console.log("renamed Item:", name);
          }}
          onClose={(()=> setShowRenameModal(false))}
          title="Rename Modal"
          actionLabel = "Rename"
           />
        )
      }
    </div>
  );
}
