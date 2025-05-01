"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CreditCard, AlertCircle, Settings } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-2 px-4 z-50">
      <div className="flex justify-around items-center">
        <NavItem
          href="/dashboard"
          icon={<LayoutDashboard className="w-5 h-5" />}
          label="Home"
          isActive={isActive("/dashboard")}
        />
        <NavItem
          href="/policies"
          icon={<CreditCard className="w-5 h-5" />}
          label="Policies"
          isActive={isActive("/policies")}
        />
        <NavItem
          href="/claims"
          icon={<AlertCircle className="w-5 h-5" />}
          label="Claims"
          isActive={isActive("/claims")}
        />
        <NavItem
          href="/settings"
          icon={<Settings className="w-5 h-5" />}
          label="Settings"
          isActive={isActive("/settings")}
        />
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center ${isActive ? "text-yellow-400" : "text-gray-400"}`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  )
}
