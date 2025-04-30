"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { BottomNav } from "@/components/bottom-nav"
import { useMobile } from "@/hooks/use-mobile"
import { SwahiliPattern } from "@/components/swahili-pattern"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useMobile()

  return (
    <div className="min-h-screen bg-black text-white">
      <SwahiliPattern className="text-white" />

      {!isMobile && <Sidebar />} 

      <div className={`${isMobile ? "pb-20" : "ml-64"}`} style={{ width: isMobile ? "100%" : "calc(100% - 16rem)" }}>
        <main className="p-4 md:p-6 max-w-6xl mx-auto">{children}</main>
      </div>

      {isMobile && <BottomNav />}
    </div>
  )
}
