"use client"

import React, { useState, useEffect } from "react"
import { InsuranceCard } from "@/components/insurance-card"
import { PortfolioStats } from "@/components/portfolio-stats"
import { FamilyInsurance } from "@/components/family-insurance"
import { VehicleInsurance } from "@/components/vehicle-insurance"
import { PolicyCard } from "@/components/policy-card"
import { QuickActionButton } from "@/components/quick-action-button"
import { useMobile } from "@/hooks/use-mobile"
import DashboardLayout from "@/components/@layouts/dashboardLayout"
import { Button } from "@/components/ui/button"
import { ClipboardIcon } from "lucide-react"

export default function DashboardPage() {
  const isMobile = useMobile()
  const [user, setUser] = useState({
    fullName: "User",
    walletAddress: ""
  })
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const fullName = localStorage.getItem("fullName")
    const walletAddress = localStorage.getItem("walletAddress")

    if (!token) {
      setError("No token found. Please log in.")
      return
    }

    if (fullName && walletAddress) {
      setUser({ fullName, walletAddress })
    } else {
      // Fetch user data if not in sessionStorage
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.fullName && data.walletAddress) {
            sessionStorage.setItem("fullName", data.fullName)
            sessionStorage.setItem("walletAddress", data.walletAddress)
            setUser({ fullName: data.fullName, walletAddress: data.walletAddress })
          } else {
            throw new Error("Invalid user data")
          }
        })
        .catch(err => {
          console.error("Fetch user error:", err)
          setError("Failed to load user data")
        })
    }
  }, [])

  const truncateAddress = (address) => {
    if (!address || address.length < 10) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user.walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError("Failed to copy wallet address")
    }
  }

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-medium text-white">
            Hello, <span className="font-bold">{user.fullName}</span>
          </h1>
          {user.walletAddress && (
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-400 mr-2">
                Wallet:{" "}
                <a
                  href={`https://explorer.pharos.network/address/${user.walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline"
                >
                  {truncateAddress(user.walletAddress)}
                </a>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-white hover:bg-gray-700"
              >
                <ClipboardIcon className="h-4 w-4 mr-1" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Manage your HashGuard micron insurance for safe boda boda rides.
          </p>
          {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </div>

        <div className={`grid ${isMobile ? "grid-cols-1 gap-3" : "grid-cols-3 gap-4"} mb-6`}>
          <InsuranceCard
            type="Accident Insurance"
            count={2}
            amount="0.15"
            currency="pTKN"
            color="bg-blue-300"
            textColor="text-black"
          />

          <InsuranceCard
            type="Theft Insurance"
            count={1}
            amount="0.10"
            currency="pTKN"
            color="bg-red-300"
            textColor="text-black"
          />

          <InsuranceCard
            type="Medical Insurance"
            count={3}
            amount="0.20"
            currency="pTKN"
            color="bg-green-300"
            textColor="text-black"
          />
        </div>

        {isMobile ? (
          <div className="space-y-4">
            <PortfolioStats isMobile={true} />

            <div className="grid grid-cols-2 gap-3">
              <QuickActionButton type="buy" />
              <QuickActionButton type="claim" />
            </div>

            <VehicleInsurance />
            <FamilyInsurance />

            <div className="space-y-3">
              <PolicyCard title="HashGuard Accident Micro" policyNo="HG1234" dueDate="15 Jun 2025" />
              <PolicyCard title="HashGuard Theft Micro" policyNo="HG5678" dueDate="15 Jun 2025" type="theft" />
              <PolicyCard title="HashGuard Medical Micro" policyNo="HG9012" dueDate="15 Jun 2025" type="medical" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <PortfolioStats isMobile={false} />

              <div className="grid grid-cols-2 gap-4 mt-4">
                <VehicleInsurance />
                <FamilyInsurance />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <QuickActionButton type="buy" />
                <QuickActionButton type="claim" />
              </div>
            </div>

            <div className="space-y-4">
              <PolicyCard title="HashGuard Accident Micro" policyNo="HG1234" dueDate="15 Jun 2025" />
              <PolicyCard title="HashGuard Theft Micro" policyNo="HG5678" dueDate="15 Jun 2025" type="theft" />
              <PolicyCard title="HashGuard Medical Micro" policyNo="HG9012" dueDate="15 Jun 2025" type="medical" />
              <PolicyCard title="HashGuard Accident Micro" policyNo="HG3456" dueDate="15 Jun 2025" />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}