"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ClipboardIcon } from "lucide-react"

console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`)

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: ""
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.isValid) {
            router.push("/dashboard")
          }
        })
        .catch(() => {
          // Clear all user data on verification failure
          localStorage.removeItem("token")
          localStorage.removeItem("walletAddress")
          localStorage.removeItem("userData")
        })
    }
  }, [router])

  const handleInputChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setWalletAddress("")
    setCopied(false)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
          password: formData.password
        })
      })

      const text = await response.text()
      console.log("Login response status:", response.status)
      console.log("Login raw response:", text)

      let data
      try {
        data = JSON.parse(text)
      } catch (err) {
        throw new Error(`Received non-JSON response: ${text.slice(0, 100)}...`)
      }

      if (!response.ok) {
        throw new Error(data.message || `Login failed with status ${response.status}`)
      }

      // Store token and wallet address separately for backward compatibility
      localStorage.setItem("token", data.token)
      localStorage.setItem("walletAddress", data.walletAddress) 
      
      // Store full user data object
      const userData = {
        token: data.token,
        walletAddress: data.walletAddress,
        phoneNumber: data.phoneNumber || formData.phoneNumber,
        userId: data.userId || data.id,
        name: data.name || data.username || "",
        email: data.email || "",
        lastLogin: new Date().toISOString(),
        // Add any other user fields you want to store
      }
      
      // Save the complete user data as JSON string
      localStorage.setItem("userData", JSON.stringify(userData))
      
      // Update wallet address for display
      setWalletAddress(data.walletAddress)
      
      // Redirect to dashboard after short delay
      setTimeout(() => router.push("/dashboard"), 2000)
    } catch (err) {
      console.error("Login error:", err)
      if (err instanceof Error) {
        setError(err.message || "An error occurred during login")
      } else {
        setError("An error occurred during login")
      }
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError("Failed to copy wallet address")
    }
  }

  return (
    <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-800 max-w-md mx-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-center mb-4 text-white">
          Sign In to HashGuard
        </h2>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {walletAddress && (
          <Alert className="mb-4 bg-green-900/50 border-green-700">
            <AlertDescription className="flex items-center justify-between">
              <span>
                Logged in! Wallet:{" "}
                <a
                  href={`https://explorer.pharos.network/address/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline"
                >
                  {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
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
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-white">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="+254 7XX XXX XXX"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="bg-gray-800/70 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="bg-gray-800/70 border-gray-700 text-white"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-400">Don't have an account?</span>{" "}
            <Link href="/register" className="text-yellow-400 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </Card>
  )
}