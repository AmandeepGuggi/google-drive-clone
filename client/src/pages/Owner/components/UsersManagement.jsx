'use client';

import { useState } from 'react'
import { Trash2, FileText, Shield, Edit2, ChevronDown } from 'lucide-react'
import RoleAssignmentModal from './modals/RoleAssignmentModal'
import DeleteUserModal from './modals/DeleteUserModal'
import FileAccessModal from './modals/FileAccessModal' // Import FileAccessModal

const mockUsers = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@cloudvault.com',
    role: 'Editor',
    storage: '45 GB / 1 TB',
    lastActive: '2 hours ago',
    avatar: 'AJ'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@cloudvault.com',
    role: 'Viewer',
    storage: '12 GB / 100 GB',
    lastActive: '1 day ago',
    avatar: 'BS'
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol@cloudvault.com',
    role: 'Admin',
    storage: '234 GB / 1 TB',
    lastActive: 'Just now',
    avatar: 'CW'
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@cloudvault.com',
    role: 'Editor',
    storage: '89 GB / 500 GB',
    lastActive: '3 hours ago',
    avatar: 'DB'
  }
]

const roleColors = {
  Owner: 'bg-purple-100 text-purple-800',
  Admin: 'bg-blue-100 text-blue-800',
  Editor: 'bg-green-100 text-green-800',
  Viewer: 'bg-gray-100 text-gray-800'
}

export default function UsersManagement({ onSelectUser }) {
  const [users, setUsers] = useState(mockUsers)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showFileModal, setShowFileModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleRoleChange = (userId) => {
    setSelectedUser(users.find(u => u.id === userId))
    setShowRoleModal(true)
  }

  const handleFileAccess = (userId) => {
    const user = users.find(u => u.id === userId)
    setSelectedUser(user)
    setShowFileModal(true)
    // Call parent callback to navigate to files page
    onSelectUser(user)
  }

  const handleDelete = (userId) => {
    setSelectedUser(users.find(u => u.id === userId))
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id))
    setShowDeleteModal(false)
  }

  return (
    <>
      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[color:var(--foreground)]">User Accounts</h2>
          <span className="text-xs text-[color:var(--muted-foreground)]">
            {users.length} active users
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[color:var(--border)]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[color:var(--muted-foreground)]">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[color:var(--muted-foreground)]">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[color:var(--muted-foreground)]">Storage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[color:var(--muted-foreground)]">Last Active</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[color:var(--muted-foreground)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-[color:var(--border)] hover:bg-[color:var(--secondary)] transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[color:var(--primary)] text-[color:var(--primary-foreground)] flex items-center justify-center text-xs font-bold">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[color:var(--foreground)]">{user.name}</p>
                        <p className="text-xs text-[color:var(--muted-foreground)]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-[color:var(--foreground)]">{user.storage}</td>
                  <td className="px-4 py-4 text-sm text-[color:var(--muted-foreground)]">{user.lastActive}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleRoleChange(user.id)}
                        className="p-2 rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--accent)] hover:text-[color:var(--accent-foreground)] transition-colors"
                        title="Change role"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleFileAccess(user.id)}
                        className="p-2 rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--accent)] hover:text-[color:var(--accent-foreground)] transition-colors"
                        title="Access files"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--destructive)] hover:text-[color:var(--destructive-foreground)] transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-[color:var(--muted-foreground)]">
          <p>All user actions are audited and logged</p>
        </div>
      </div>

      {/* Modals */}
      {showRoleModal && selectedUser && (
        <RoleAssignmentModal
          user={selectedUser}
          onClose={() => setShowRoleModal(false)}
          onConfirm={() => setShowRoleModal(false)}
        />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  )
}
