"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CreditCard, DollarSign, Wallet, BarChart2, AlertCircle, Settings, LogOut } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="w-64 h-screen bg-black text-white p-6 border-r border-gray-800 fixed left-0 top-0 z-10">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          <span className="text-black text-sm font-bold">H</span>
        </div>
        <span className="font-semibold text-lg">ima</span>
      </div>

      <nav className="space-y-6">
        <SidebarItem href="/dashboard" icon={<LayoutDashboard />} label="Dashboard" active={isActive("/dashboard")} />
        <SidebarItem href="/policies" icon={<CreditCard />} label="Policy Cards" active={isActive("/policies")} />
        <SidebarItem href="/claims" icon={<AlertCircle />} label="Claims" active={isActive("/claims")} />
        {/* <SidebarItem icon={<DollarSign />} label="Earnings" href="/earnings" active={isActive("/earnings")} /> */}
        <SidebarItem icon={<Wallet />} label="Payments" href="/payments" active={isActive("/payments")} />
        <SidebarItem icon={<BarChart2 />} label="Statistics" href="/statistics" active={isActive("/statistics")} />
      </nav>

      <div className="mt-10 bg-purple-400 rounded-xl p-4">
        <div className="text-xs text-center mb-2">Protect your boda boda business with just 3 taps!</div>
        <div className="flex justify-center mb-2">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#d8b4fe" strokeWidth="2" />
              <path d="M30,50 Q50,30 70,50 Q50,70 30,50" fill="#d8b4fe" />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
        <div className="text-xs text-center mb-4">Fast on-chain protection using Celo's cKES stablecoin.</div>
        <button className="w-full bg-purple-800 text-white py-2 rounded-lg text-sm">Buy Now</button>
      </div>

      <div className="mt-10 space-y-6">
        <SidebarItem href="/settings" icon={<Settings />} label="Settings" active={isActive("/settings")} />
        <SidebarItem href="/login" icon={<LogOut />} label="Log out" active={false} />
      </div>
    </div>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active: boolean
}

function SidebarItem({ icon, label, href, active }: SidebarItemProps) {
  return (
    <Link href={href} className={`flex items-center gap-3 ${active ? "text-white" : "text-gray-500"}`}>
      <div className={`${active ? "text-yellow-300" : "text-gray-500"}`}>{icon}</div>
      <span>{label}</span>
      {active && <div className="w-1 h-6 bg-yellow-300 ml-auto rounded-full"></div>}
    </Link>
  )
}

function UserPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  )
}
