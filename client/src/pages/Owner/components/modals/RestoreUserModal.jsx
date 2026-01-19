'use client';

import { useState } from 'react'
import { X, RotateCcw, CheckCircle } from 'lucide-react'

export default function RestoreUserModal({ user, onClose, onConfirm }) {
  const [confirmed, setConfirmed] = useState(false)

  const handleRestore = () => {
    if (confirmed) {
      onConfirm()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-[color:var(--foreground)]">Restore User</h3>
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

        <div className="mb-4 p-3 bg-green-50 border border-green-300 rounded-md flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-900">Restore User Account</p>
            <ul className="text-xs text-green-800 mt-2 space-y-1 ml-4 list-disc">
              <li>User account will be reactivated</li>
              <li>All files will be recovered</li>
              <li>User will be notified of restoration</li>
              <li>Action will be audited and logged</li>
            </ul>
          </div>
        </div>

        <div className="mb-4 text-sm">
          <p className="text-[color:var(--foreground)] font-medium mb-2">Restore Details</p>
          <div className="space-y-2 text-xs text-[color:var(--muted-foreground)] p-2 bg-[color:var(--secondary)] rounded">
            <div className="flex justify-between">
              <span>Deleted Date:</span>
              <span className="font-medium">{user.deletedDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Deleted By:</span>
              <span className="font-medium">{user.deletedBy}</span>
            </div>
            <div className="flex justify-between">
              <span>Reason:</span>
              <span className="font-medium text-right">{user.reason}</span>
            </div>
          </div>
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
            I confirm the restoration of this user account
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
            onClick={handleRestore}
            disabled={!confirmed}
            className="flex-1 px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Restore User
          </button>
        </div>
      </div>
    </div>
  )
}
