'use client';

import { useState } from 'react'
import { X, AlertCircle, Trash2 } from 'lucide-react'

export default function DeleteUserModal({ user, onClose, onConfirm }) {
  const [confirmed, setConfirmed] = useState(false)

  const handleDelete = () => {
    if (confirmed) {
      onConfirm()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-[color:var(--destructive)]" />
            <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Soft Delete User</h3>
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

        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-md flex gap-3">
          <AlertCircle className="w-5 h-5 text-[color:var(--warning)] flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-orange-900">This is a soft delete</p>
            <ul className="text-xs text-orange-800 mt-2 space-y-1 ml-4 list-disc">
              <li>User data is retained for 30 days</li>
              <li>User account can be restored during this period</li>
              <li>User will be notified of deletion</li>
              <li>All actions are permanently logged</li>
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-[color:var(--foreground)] block mb-2">
            Reason for deletion (optional)
          </label>
          <input
            type="text"
            placeholder="e.g., User requested deletion, Account inactive, etc."
            className="w-full px-3 py-2 rounded-md border border-[color:var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]"
          />
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="confirm"
            checked={confirmed}
            onChange={e => setConfirmed(e.target.checked)}
            className="w-4 h-4 rounded border-[color:var(--border)] cursor-pointer"
          />
          <label htmlFor="confirm" className="text-xs text-[color:var(--muted-foreground)] cursor-pointer">
            I confirm the soft deletion of this user account
          </label>
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
            disabled={!confirmed}
            className="flex-1 px-4 py-2 rounded-md bg-[color:var(--destructive)] text-[color:var(--destructive-foreground)] text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  )
}
