'use client';

import { useState } from 'react'
import { X } from 'lucide-react'

export default function EditFileModal({ file, onClose, onConfirm }) {
  const [content, setContent] = useState('File content would be editable here...')

  const handleConfirm = () => {
    console.log('[v0] File edited:', file.name, 'New content:', content)
    onConfirm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50">
      <div className="bg-[color:var(--card)] w-full md:w-2/3 lg:w-1/2 rounded-t-lg md:rounded-lg border border-[color:var(--border)] shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[color:var(--border)] p-6 sticky top-0 bg-[color:var(--card)]">
          <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Edit File</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--secondary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-[color:var(--foreground)] block mb-2">
              Filename
            </label>
            <p className="text-sm text-[color:var(--muted-foreground)] bg-[color:var(--secondary)] p-3 rounded-md">
              {file.name}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-[color:var(--foreground)] block mb-2">
              File Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-[color:var(--border)] rounded-md bg-[color:var(--secondary)] text-[color:var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] resize-none h-48"
              placeholder="Edit file content..."
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> This action will be logged as a file modification by Owner. The previous version will be retained in version history.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[color:var(--border)] p-6 flex gap-3 justify-end bg-[color:var(--secondary)]/50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-[color:var(--border)] text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-md bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:opacity-90 transition-opacity text-sm font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
