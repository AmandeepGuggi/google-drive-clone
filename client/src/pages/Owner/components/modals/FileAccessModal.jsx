'use client';

import { useState } from 'react'
import { X, FileText, Folder } from 'lucide-react'

const mockFiles = [
  { id: 1, name: 'Project_Proposal_2024.pdf', type: 'file', size: '2.4 MB' },
  { id: 2, name: 'Design_Assets', type: 'folder', size: '156 MB' },
  { id: 3, name: 'Quarterly_Report_Q4.xlsx', type: 'file', size: '1.8 MB' },
  { id: 4, name: 'Archive', type: 'folder', size: '512 MB' }
]

export default function FileAccessModal({ user, onClose }) {
  const [expandedFolder, setExpandedFolder] = useState(null)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[color:var(--primary)]" />
            <h3 className="text-lg font-semibold text-[color:var(--foreground)]">User Files</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[color:var(--secondary)] rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-[color:var(--secondary)] rounded-md">
          <p className="text-sm text-[color:var(--foreground)]">
            <span className="font-medium">User:</span> {user.name}
          </p>
          <p className="text-xs text-[color:var(--muted-foreground)] mt-1">{user.email}</p>
        </div>

        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-800">
          All file access is monitored and logged for compliance.
        </div>

        <div className="mb-4 max-h-96 overflow-y-auto border border-[color:var(--border)] rounded-md">
          <div className="divide-y divide-[color:var(--border)]">
            {mockFiles.map(file => (
              <div key={file.id} className="p-3 hover:bg-[color:var(--secondary)] transition-colors">
                <div className="flex items-center gap-3">
                  {file.type === 'folder' ? (
                    <Folder className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-[color:var(--muted-foreground)] flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[color:var(--foreground)]">{file.name}</p>
                    <p className="text-xs text-[color:var(--muted-foreground)]">{file.size}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-[color:var(--secondary)] text-[color:var(--muted-foreground)]">
                    {file.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-md bg-[color:var(--primary)] text-[color:var(--primary-foreground)] text-sm font-medium hover:opacity-90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
