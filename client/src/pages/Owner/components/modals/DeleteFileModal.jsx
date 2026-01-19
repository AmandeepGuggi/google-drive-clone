'use client';

import { useState } from 'react'
import { X, AlertTriangle } from 'lucide-react'

export default function DeleteFileModal({ file, onClose, onConfirm }) {
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    if (!confirmed) return
    console.log('[v0] File deleted:', file.name)
    onConfirm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-(--card) w-full max-w-md rounded-lg border border-[color:var(--border)] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[color:var(--border)] p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-[color:var(--destructive)]" />
            <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Delete File</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--secondary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-md">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> This action cannot be undone. The file will be permanently deleted from {file.type === 'folder' ? 'the entire folder hierarchy' : 'storage'}.
            </p>
          </div>

          <div>
            <p className="text-sm text-[color:var(--foreground)] mb-2">
              File to delete:
            </p>
            <div className="bg-[color:var(--secondary)] p-3 rounded-md border border-[color:var(--border)]">
              <p className="font-medium text-[color:var(--foreground)]">{file.name}</p>
              <p className="text-xs text-[color:var(--muted-foreground)] mt-1">
                Type: <span className="capitalize">{file.type}</span> • Size: {file.size}
              </p>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-[color:var(--border)] text-[color:var(--destructive)] focus:ring-2 focus:ring-[color:var(--destructive)]"
            />
            <span className="text-sm text-[color:var(--foreground)]">
              I understand this will permanently delete this {file.type}
            </span>
          </label>

          <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
            <p className="text-xs text-blue-800">
              <strong>Audit Log:</strong> This deletion will be recorded with Owner name and timestamp.
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
            disabled={!confirmed}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-opacity ${
              confirmed
                ? 'bg-[color:var(--destructive)] text-[color:var(--destructive-foreground)] hover:opacity-90 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Delete File
          </button>
        </div>
      </div>
    </div>
  )
}
