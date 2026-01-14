"use client"

import { User, Lock, Bell, Shield, HardDrive, Palette } from "lucide-react"

export default function Sidebar({ activeTab, onTabChange }) {
  const menuItems = [
    { id: "accounts", label: "Accounts", icon: Lock , description: "Security and authentication"},
    { id: "profile", label: "Profile", icon: User, description: "Personal details" },
    { id: "notification", label: "Notifications", icon: Bell, description: "Email and push alerts" },
    { id: "privacy", label: "Privacy", icon: Shield, description: "Data visibility" },
    { id: "storage", label: "Storage", icon: HardDrive , description: "Storage settings"},
    { id: "appearance", label: "Appearance", icon: Palette, description: "Theme and display" },
  ]

  return (
    <div className="w-64 border-r border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Settings</h1>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex  gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive ? "bg-kala text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5 mt-1.5" />
              <div className="flex flex-col items-baseline" >
                <span>{item.label}</span>
                <span className="text-[12px] font-extralight text-start" > {item.description} </span>
              </div>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
