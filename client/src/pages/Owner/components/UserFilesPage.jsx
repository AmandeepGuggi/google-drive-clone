'use client';

import { useState } from 'react'
import { ChevronLeft, File, Folder, Download, Trash2, Edit2, Copy, MoreVertical } from 'lucide-react'
import EditFileModal from './modals/EditFileModal'
import RenameFileModal from './modals/RenameFileModal'
import DeleteFileModal from './modals/DeleteFileModal'

const mockFileStructure = {
  '/': [
    { id: '1', name: 'Project Proposal.pdf', type: 'file', size: '2.4 MB', modified: '2024-01-15', icon: 'pdf' },
    { id: '2', name: 'Documents', type: 'folder', size: '12 files', modified: '2024-01-16', icon: 'folder' },
    { id: '3', name: 'Presentations.pptx', type: 'file', size: '8.7 MB', modified: '2024-01-10', icon: 'pptx' },
    { id: '4', name: 'Budget 2024.xlsx', type: 'file', size: '1.2 MB', modified: '2024-01-12', icon: 'xlsx' },
    { id: '5', name: 'Archive', type: 'folder', size: '45 files', modified: '2024-01-05', icon: 'folder' }
  ],
  '/Documents': [
    { id: '6', name: 'Meeting Notes.docx', type: 'file', size: '512 KB', modified: '2024-01-14', icon: 'docx' },
    { id: '7', name: 'Design Brief.pdf', type: 'file', size: '3.1 MB', modified: '2024-01-13', icon: 'pdf' },
    { id: '8', name: 'Financial Report.xlsx', type: 'file', size: '2.8 MB', modified: '2024-01-11', icon: 'xlsx' }
  ],
  '/Archive': [
    { id: '9', name: 'Old Projects', type: 'folder', size: '18 files', modified: '2023-12-20', icon: 'folder' },
    { id: '10', name: 'Backup.zip', type: 'file', size: '156 MB', modified: '2023-12-15', icon: 'zip' }
  ]
}

export default function UserFilesPage({ user, onBack }) {
  const [currentPath, setCurrentPath] = useState('/')
  const [files, setFiles] = useState(mockFileStructure)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [showMenu, setShowMenu] = useState(null)

  const currentFiles = files[currentPath] || []

  const handleEditFile = (file) => {
    setSelectedFile(file)
    setShowEditModal(true)
    setShowMenu(null)
  }

  const handleRenameFile = (file) => {
    setSelectedFile(file)
    setShowRenameModal(true)
    setShowMenu(null)
  }

  const handleDeleteFile = (file) => {
    setSelectedFile(file)
    setShowDeleteModal(true)
    setShowMenu(null)
  }

  const confirmRename = (newName) => {
    setFiles(prev => ({
      ...prev,
      [currentPath]: prev[currentPath].map(f =>
        f.id === selectedFile.id ? { ...f, name: newName } : f
      )
    }))
    setShowRenameModal(false)
  }

  const confirmDelete = () => {
    setFiles(prev => ({
      ...prev,
      [currentPath]: prev[currentPath].filter(f => f.id !== selectedFile.id)
    }))
    setShowDeleteModal(false)
  }

  const openFolder = (folderName) => {
    setCurrentPath(`${currentPath === '/' ? '' : currentPath}/${folderName}`)
  }

  const breadcrumbs = currentPath === '/' ? ['Root'] : ['Root', ...currentPath.split('/').filter(Boolean)]

  const getFileIcon = (item) => {
    if (item.type === 'folder') return <Folder className="w-5 h-5 text-amber-500" />
    
    const iconMap = {
      pdf: '📄',
      docx: '📝',
      xlsx: '📊',
      pptx: '🎯',
      zip: '📦',
      folder: '📁'
    }
    return <span className="text-lg">{iconMap[item.icon] || '📄'}</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--secondary)] hover:text-[color:var(--foreground)] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-[color:var(--foreground)]">
            Files: {user.name}
          </h2>
          <p className="text-sm text-[color:var(--muted-foreground)]">{user.email}</p>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-[color:var(--muted-foreground)] pb-4 border-b border-[color:var(--border)]">
        {breadcrumbs.map((crumb, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {idx > 0 && <span>/</span>}
            <button
              onClick={() => setCurrentPath(idx === 0 ? '/' : '/' + breadcrumbs.slice(1, idx + 1).join('/'))}
              className="hover:text-[color:var(--foreground)] transition-colors"
            >
              {crumb}
            </button>
          </div>
        ))}
      </div>

      {/* File List Card */}
      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Contents</h3>
          <span className="text-xs text-[color:var(--muted-foreground)]">
            {currentFiles.length} items
          </span>
        </div>

        {currentFiles.length === 0 ? (
          <div className="py-12 text-center">
            <Folder className="w-12 h-12 text-[color:var(--muted-foreground)] opacity-50 mx-auto mb-2" />
            <p className="text-[color:var(--muted-foreground)]">This folder is empty</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[color:var(--border)]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[color:var(--muted-foreground)]">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[color:var(--muted-foreground)]">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[color:var(--muted-foreground)]">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[color:var(--muted-foreground)]">Modified</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[color:var(--muted-foreground)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentFiles.map(item => (
                  <tr key={item.id} className="border-b border-[color:var(--border)] hover:bg-[color:var(--secondary)] transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(item)}
                        <button
                          onClick={() => item.type === 'folder' && openFolder(item.name)}
                          className={item.type === 'folder' ? 'hover:text-[color:var(--accent)] transition-colors' : ''}
                        >
                          <span className="font-medium text-[color:var(--foreground)]">{item.name}</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[color:var(--foreground)] capitalize">
                      {item.type}
                    </td>
                    <td className="px-4 py-4 text-sm text-[color:var(--muted-foreground)]">{item.size}</td>
                    <td className="px-4 py-4 text-sm text-[color:var(--muted-foreground)]">{item.modified}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2 relative">
                        <button
                          onClick={() => console.log('Download:', item.name)}
                          className="p-2 rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--accent)] hover:text-[color:var(--accent-foreground)] transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => setShowMenu(showMenu === item.id ? null : item.id)}
                          className="p-2 rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--secondary)] transition-colors"
                          title="More options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {showMenu === item.id && (
                          <div className="absolute right-0 top-full mt-1 z-10 bg-[color:var(--card)] border border-[color:var(--border)] rounded-md shadow-lg w-40">
                            <button
                              onClick={() => handleEditFile(item)}
                              className="w-full text-left px-4 py-2 text-sm text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] flex items-center gap-2 transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleRenameFile(item)}
                              className="w-full text-left px-4 py-2 text-sm text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] flex items-center gap-2 transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                              Rename
                            </button>
                            <button
                              onClick={() => handleDeleteFile(item)}
                              className="w-full text-left px-4 py-2 text-sm text-[color:var(--destructive)] hover:bg-[color:var(--destructive)]/10 flex items-center gap-2 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 text-xs text-[color:var(--muted-foreground)]">
          <p>Owner has full file management permissions. All file changes are logged.</p>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && selectedFile && (
        <EditFileModal
          file={selectedFile}
          onClose={() => setShowEditModal(false)}
          onConfirm={() => setShowEditModal(false)}
        />
      )}

      {showRenameModal && selectedFile && (
        <RenameFileModal
          file={selectedFile}
          onClose={() => setShowRenameModal(false)}
          onConfirm={confirmRename}
        />
      )}

      {showDeleteModal && selectedFile && (
        <DeleteFileModal
          file={selectedFile}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  )
}
