'use client';

import { useState } from 'react'
import { X, AlertCircle, Trash2 } from 'lucide-react'

export default function PermanentDeleteModal({ user, onClose, onConfirm }) {
  const [typedConfirmation, setTypedConfirmation] = useState('')
  const requiredText = 'DELETE'

  const isConfirmed = typedConfirmation === requiredText

  const handleDelete = () => {
    if (isConfirmed) {
      onConfirm()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Permanent Delete</h3>
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

        <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-md flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-900">WARNING: IRREVERSIBLE ACTION</p>
            <ul className="text-xs text-red-800 mt-2 space-y-1 ml-4 list-disc">
              <li>All user data will be permanently deleted</li>
              <li>This action cannot be undone</li>
              <li>All files and associated data will be removed</li>
              <li>A permanent audit record will be maintained</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-[color:var(--foreground)] block mb-2">
            Type "{requiredText}" to confirm permanent deletion
          </label>
          <input
            type="text"
            value={typedConfirmation}
            onChange={e => setTypedConfirmation(e.target.value)}
            placeholder={`Type "${requiredText}" here`}
            className="w-full px-3 py-2 rounded-md border border-[color:var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <p className="text-xs text-[color:var(--muted-foreground)] mt-2">
            {isConfirmed ? (
              <span className="text-green-600">Confirmed. You can proceed with deletion.</span>
            ) : (
              <span>You must type the exact text to confirm.</span>
            )}
          </p>
        </div>

        <div className="mb-4 p-3 bg-[color:var(--secondary)] rounded-md text-xs text-[color:var(--muted-foreground)]">
          <p>This action will be permanently recorded in the audit log with timestamp and Owner identity.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-md border border-[color:var(--border)] text-sm font-medium text-[color:var(--foreground)] hover:bg-[color:var(--secondary)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={!isConfirmed}
            className="flex-1 px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Permanently Delete
          </button>
        </div>
      </div>
    </div>
  )
}
