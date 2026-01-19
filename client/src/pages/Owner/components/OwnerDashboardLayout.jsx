import { Shield, Settings, LogOut } from 'lucide-react'

export default function OwnerDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-(--background)">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--background)]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-full px-6 py-4 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--accent)]">
              <Shield className="w-6 h-6 text-[color:var(--primary-foreground)]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[color:var(--foreground)]">CloudVault</h1>
              <p className="text-xs text-[color:var(--muted-foreground)]">Owner Dashboard</p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--secondary)] hover:text-[color:var(--foreground)] transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--secondary)] hover:text-[color:var(--foreground)] transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[color:var(--border)] bg-[color:var(--secondary)]/50 mt-12">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-xs text-[color:var(--muted-foreground)]">
          <p>All Owner actions are logged and audited. Use this panel responsibly.</p>
        </div>
      </footer>
    </div>
  )
}
