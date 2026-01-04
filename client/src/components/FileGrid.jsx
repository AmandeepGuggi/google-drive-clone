import { useRef } from "react";
import ContextMenu from "./ContextMenu";
import { FaFolder } from "react-icons/fa";
import { formatBytes, getFileIcon } from "../utility";

export default function FileGrid({
  directoryName,
progressMap,
  handleContextMenu,
  BASE_URL,
  handleRowClick,
  handleDeleteDirectory,
  activeContextMenu,
  openRenameModal,
  setActiveContextMenu,

  isUploading,
  uploadProgress,
  handleCancelUpload,
  handleDeleteFile,
  files,

  folders,
  onRename,
  handleRenameSubmit,
  menuState,
  setMenuState,
}) {
  const menuRef = useRef(null);

  const allItems = [...folders, ...files];
  const selectedItem = menuState
    ? allItems.find((x) => x.id === menuState.id)
    : null;

  return (
    <>
      <h1
        className="mb-6 px- py-1 text-lg font-medium 
               text-gray-700 inline-block"
      >
        {directoryName}{" "}
        <span className="text-sm text-gray-400 font-extralight">
          (0 files)
        </span>
      </h1>

      <div className="text-sm flex border-b pb-3 pl-2 border-gray-300 justify-between">
        <p className="flex gap-4">
          {" "}
          <input type="checkbox" className="visiblity-none " />{" "}
          <span>File name</span>
        </p>
        <p>Last modified</p>
        <p>File size</p>
        <p> </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
        {folders.map((f) => (
          <div
            onClick={() =>
              !(activeContextMenu || isUploading)
                ? handleRowClick("directory", f.id)
                : null
            }
            key={f.id}
            onContextMenu={(e) => {
              e.preventDefault();
              handleContextMenu(e, f.id);
              setMenuState({
                id: f.id,
                x: e.clientX,
                y: e.clientY,
                type: "folder",
              });
            }}
            className="relative px-2 py-3 flex border-gray-300  justify-between border-b cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />
              <FaFolder className="inline text-2xl text-blue-400" /> {f.name}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                setMenuState({
                  id: f.id,
                  x: rect.right + 4,
                  y: rect.top,
                  type: "folder",
                });
              }}
            >
              ⋮
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1  ">
        {files.map((file) => {
           const uploadProgress = progressMap[file.id] || 0;
          const isUploadingItem = file.id.startsWith("temp-");
          console.log(isUploadingItem);
          return (
            <div
              key={file.id}
              onClick={() =>
                !(activeContextMenu || isUploading)
                  ? handleRowClick("file", file.id)
                  : null
              }
              onContextMenu={(e) => {
                e.preventDefault();
                handleContextMenu(e, file.id);
                setMenuState({
                  id: file.id,
                  x: e.clientX,
                  y: e.clientY,
                  type: "file",
                });
              }}
              className="relative bg-white border-b border-gray-300 py-3 px-2 cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <input type="checkbox" name="" id="" />
                  <img
                    className="inline w-8"
                    src={getFileIcon(file.name)}
                    alt="file icon"
                  />
                  <p className="text-sm w-40 truncate">{file.name}</p>
                </div>

                <p> </p>
                <p className="text-gray-300 text-sm">
                  {formatBytes(file.size)}
                </p>
                <p> </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const rect = e.currentTarget.getBoundingClientRect();
                  setMenuState({
                    id: file.id,
                    x: rect.right + 4,
                    y: rect.top,
                    type: "file",
                  });
                }}
                className="absolute top-2 right-2 w-5 h-9"
              >
                ⋮
              </button>

              {isUploadingItem && (
                <div className="bg-neutral-500 rounded-md mt-1 mb-2 overflow-hidden relative mx-2">
                  <span className="absolute text-[12px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                    {Math.floor(uploadProgress)}%
                  </span>

                  <div
                    className={`
      h-4 rounded-md
      ${uploadProgress === 100 ? "bg-green-600" : "bg-blue-600"}
    `}
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SINGLE CONTEXT MENU BELOW */}
      {menuState && selectedItem && (
        <ContextMenu
          handleRowClick={handleRowClick}
          item={selectedItem}
          type={menuState.type}
          position={{ x: menuState.x, y: menuState.y }}
          menuRef={menuRef}
          BASE_URL={BASE_URL}
          handleDeleteDirectory={handleDeleteDirectory}
          handleDeleteFile={handleDeleteFile}
          handleCancelUpload={handleCancelUpload}
          isUploadingItem={selectedItem.id.startsWith("temp-")}
          handleRenameSubmit={handleRenameSubmit}
          openRenameModal={openRenameModal}
          onClose={() => {
            setMenuState(null);
            setActiveContextMenu(null);
          }}
        />
      )}
    </>
  );
}
