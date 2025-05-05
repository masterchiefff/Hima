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

const BalanceCard = ({ balance, walletAddress, onCopy, copied }) => {
  const truncateAddress = (address) => {
    if (!address || address.length < 10) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="bg-yellow-300 text-black p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Wallet Balance</h3>
      <p className="text-2xl font-bold mt-1">
        {balance !== null ? `${parseFloat(balance).toFixed(4)} ETH` : "Loading..."}
      </p>
      {walletAddress && (
        <div className="flex items-center mt-2">
          <p className="text-sm truncate">
            Wallet: <span className="font-medium">{truncateAddress(walletAddress)}</span>
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCopy}
            className="ml-2 text-black hover:bg-yellow-400"
          >
            <ClipboardIcon className="h-4 w-4" />
            {copied ? " Copied!" : ""}
          </Button>
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const isMobile = useMobile()
  const [user, setUser] = useState({
    fullName: "User",
    walletAddress: "",
    balance: null,
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
      setUser(prev => ({ ...prev, fullName, walletAddress }))
    } else {
      // Fetch user data if not in localStorage
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then(async res => {
          if (!res.ok) {
            throw new Error(`User fetch failed: ${res.status} ${await res.text()}`)
          }
          return res.json()
        })
        .then(data => {
          if (data.fullName && data.walletAddress) {
            localStorage.setItem("fullName", data.fullName)
            localStorage.setItem("walletAddress", data.walletAddress)
            setUser(prev => ({ ...prev, fullName: data.fullName, walletAddress: data.walletAddress }))
          } else {
            throw new Error("Invalid user data")
          }
        })
        .catch(err => {
          console.error("Fetch user error:", err.message)
          setError("Failed to load user data")
        })
    }

    // Fetch balance
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/balance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(async res => {
        if (!res.ok) {
          throw new Error(`Balance fetch failed: ${res.status} ${await res.text()}`)
        }
        return res.json()
      })
      .then(data => {
        console.log("Balance response:", data)
        if (data.message) {
          setError(data.message)
        } else if (typeof data.balance === "string" || typeof data.balance === "number") {
          setUser(prev => ({ ...prev, balance: data.balance }))
        } else {
          throw new Error("Balance missing or invalid in response")
        }
      })
      .catch(err => {
        console.error("Fetch balance error:", err.message)
        setError(err.message.includes("Failed to fetch balance") ? err.message : "Failed to load balance")
      })
  }, [])

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
          <p className="text-xs text-gray-400 mt-1">
            Manage your HashGuard micron insurance for safe boda boda rides.
          </p>
          {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
        </div>

        <div className={`grid ${isMobile ? "grid-cols-2 gap-3" : "grid-cols-4 gap-4"} mb-6`}>
          <BalanceCard
            balance={user.balance}
            walletAddress={user.walletAddress}
            onCopy={handleCopy}
            copied={copied}
          />
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