"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ClipboardIcon } from "lucide-react"

export function RegisterForm() {
  const router = useRouter()
  const { status } = useSession()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    referral: ""
  })

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.phoneNumber || !formData.email) {
      setError("Please fill in all required fields")
      return
    }
    if (!/^\+2547\d{8}$/.test(formData.phoneNumber)) {
      setError("Phone number must be in the format +2547XXXXXXXX")
      return
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address")
      return
    }
    setError("")
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setWalletAddress("")
    setCopied(false)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          fullName: formData.fullName,
          password: formData.password
        })
      })

      const text = await response.text()
      console.log("Signup response status:", response.status)
      console.log("Signup raw response:", text)

      let data
      try {
        data = JSON.parse(text)
      } catch (err) {
        throw new Error(`Received non-JSON response: ${text.slice(0, 100)}...`)
      }

      if (!response.ok) {
        throw new Error(data.message || `Signup failed with status ${response.status}`)
      }

      sessionStorage.setItem("token", data.token)
      sessionStorage.setItem("walletAddress", data.walletAddress)
      setWalletAddress(data.walletAddress)
      setTimeout(() => router.push("/dashboard"), 2000)
    } catch (err) {
      console.error("Signup error:", err)
      setError(err.message || "An error occurred during signup")
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
          Join HashGuard: Insurance for Boda Boda Riders
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
                Account created! Wallet:{" "}
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

        {step === 1 ? (
          <form onSubmit={handleNext} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="bg-gray-800/70 border-gray-700 text-white"
              />
            </div>

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
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-gray-800/70 border-gray-700 text-white"
              />
            </div>

            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
              Next
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-400">Already have an account?</span>{" "}
              <Link href="/login" className="text-yellow-400 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white block">Create Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="bg-gray-800/70 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white block">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="bg-gray-800/70 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="referral" className="text-white block">Referral Code (Optional)</Label>
              <Input
                id="referral"
                placeholder="Enter referral code"
                value={formData.referral}
                onChange={handleInputChange}
                className="bg-gray-800/70 border-gray-700 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-2 border-gray-700 text-white hover:bg-gray-700"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
          </form>
        )}
      </div>
    </Card>
  )
}