import { AlertCircle, Shield, Trash2, Users, Lock } from 'lucide-react'

const activities = [
  {
    id: 1,
    action: 'Role Changed',
    user: 'Bob Smith → Admin',
    timestamp: '5 minutes ago',
    severity: 'critical'
  },
  {
    id: 2,
    action: 'User Deleted',
    user: 'John Doe (soft delete)',
    timestamp: '1 hour ago',
    severity: 'warning'
  },
  {
    id: 3,
    action: 'File Access Granted',
    user: 'Alice Johnson - 12 files',
    timestamp: '3 hours ago',
    severity: 'info'
  },
  {
    id: 4,
    action: 'Compliance Audit',
    user: 'Manual data review completed',
    timestamp: '1 day ago',
    severity: 'info'
  },
  {
    id: 5,
    action: 'Permanent Delete',
    user: 'Old Account (Emma Davis)',
    timestamp: '2 days ago',
    severity: 'critical'
  }
]

const severityStyles = {
  critical: 'border-l-4 border-[color:var(--destructive)] bg-red-50',
  warning: 'border-l-4 border-[color:var(--warning)] bg-orange-50',
  info: 'border-l-4 border-[color:var(--info)] bg-blue-50'
}

const severityIcons = {
  critical: AlertCircle,
  warning: AlertCircle,
  info: Shield
}

export default function ActivitySummary() {
  return (
    <div className="card">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[color:var(--foreground)]">Activity Log</h2>
        <p className="text-xs text-[color:var(--muted-foreground)] mt-1">Recent Owner actions</p>
      </div>

      <div className="space-y-3">
        {activities.map(activity => {
          const IconComponent = severityIcons[activity.severity]
          return (
            <div
              key={activity.id}
              className={`p-3 rounded-md ${severityStyles[activity.severity]}`}
            >
              <div className="flex items-start gap-3">
                <IconComponent className="w-4 h-4 flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[color:var(--foreground)]">{activity.action}</p>
                  <p className="text-xs text-[color:var(--muted-foreground)] truncate">{activity.user}</p>
                  <p className="text-xs text-[color:var(--muted-foreground)] mt-1">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 text-xs text-[color:var(--muted-foreground)] p-3 bg-[color:var(--secondary)] rounded-md">
        <p>All actions are permanently logged. Ensure accountability for all changes.</p>
      </div>
    </div>
  )
}
