'use client';

import { useState } from 'react'
import { X } from 'lucide-react'

export default function RenameFileModal({ file, onClose, onConfirm }) {
  const [newName, setNewName] = useState(file.name)
  const [error, setError] = useState('')

  const handleConfirm = () => {
    if (!newName.trim()) {
      setError('Filename cannot be empty')
      return
    }
    if (newName === file.name) {
      setError('New name must be different from current name')
      return
    }
    console.log('[v0] File renamed:', file.name, 'to:', newName)
    onConfirm(newName)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[color:var(--card)] w-full max-w-md rounded-lg border border-[color:var(--border)] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[color:var(--border)] p-6">
          <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Rename File</h3>
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
              Current Name
            </label>
            <p className="text-sm text-[color:var(--muted-foreground)] bg-[color:var(--secondary)] p-3 rounded-md">
              {file.name}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-[color:var(--foreground)] block mb-2">
              New Name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value)
                setError('')
              }}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
              className="w-full px-3 py-2 border border-[color:var(--border)] rounded-md bg-[color:var(--secondary)] text-[color:var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
              placeholder="Enter new filename..."
            />
            {error && <p className="text-xs text-[color:var(--destructive)] mt-1">{error}</p>}
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-md">
            <p className="text-xs text-amber-800">
              <strong>Alert:</strong> Renaming will be logged as Owner activity. File links may need to be updated.
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
            Rename File
          </button>
        </div>
      </div>
    </div>
  )
}
