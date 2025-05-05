"use client"

import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PolicyCard } from "@/components/policy-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import DashboardLayout from "@/components/@layouts/dashboardLayout"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Configuration for policy types (extensible)
const POLICY_TYPES = [
  { value: "motorcycle", label: "Motorcycle" },
  { value: "tuktuk", label: "Tuktuk" }
]

export default function PoliciesPage() {
  const [policies, setPolicies] = useState([
    { title: "Boda Boda Accident Cover", policyNo: "PV8821", dueDate: "15 Dec 2023", type: "motorcycle" },
    { title: "Tuktuk Theft Protection", policyNo: "PV5532", dueDate: "20 Dec 2023", type: "tuktuk" },
    { title: "Boda Boda Medical Cover", policyNo: "PV9292", dueDate: "12 Dec 2023", type: "motorcycle" }
  ])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "motorcycle",
    dueDate: "",
    covers: [] // For future extensibility
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const token = sessionStorage.getItem("token")
      const walletAddress = sessionStorage.getItem("walletAddress")

      if (!token || !walletAddress) {
        throw new Error("Please log in to create a policy")
      }

      // Validate inputs
      if (!formData.title || !formData.dueDate) {
        throw new Error("Title and due date are required")
      }

      // Validate dueDate format (DD MMM YYYY)
      const dateRegex = /^\d{2} [A-Za-z]{3} \d{4}$/
      if (!dateRegex.test(formData.dueDate)) {
        throw new Error("Due date must be in format DD MMM YYYY (e.g., 15 Dec 2023)")
      }

      // Validate type
      if (!POLICY_TYPES.map(t => t.value).includes(formData.type)) {
        throw new Error("Invalid policy type")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/policies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          type: formData.type,
          dueDate: formData.dueDate,
          walletAddress,
          covers: formData.covers
        })
      })

      const text = await response.text()
      console.log("Policy response status:", response.status)
      console.log("Policy raw response:", text)

      let data
      try {
        data = JSON.parse(text)
      } catch (err) {
        throw new Error(`Received non-JSON response: ${text.slice(0, 100)}...`)
      }

      if (!response.ok) {
        throw new Error(data.message || `Failed to create policy with status ${response.status}`)
      }

      // Add new policy to state
      setPolicies((prev) => [
        ...prev,
        {
          title: data.title,
          type: data.type,
          dueDate: data.dueDate,
          policyNo: data.policyNo,
          covers: data.covers
        }
      ])

      // Reset form and close dialog
      setFormData({ title: "", type: "motorcycle", dueDate: "", covers: [] })
      setOpen(false)
    } catch (err) {
      console.error("Create policy error:", err)
      setError(err.message || "An error occurred while creating the policy")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium text-white">Policy Cards</h1>
            <p className="text-xs text-gray-400">Manage your motorcycle and tuktuk insurance policies</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600">
                <Plus className="w-4 h-4 mr-2" />
                New Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New Policy</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Policy Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Boda Boda Accident Cover"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800/70 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-white">Policy Type</Label>
                  <Select value={formData.type} onValueChange={handleTypeChange}>
                    <SelectTrigger className="bg-gray-800/70 border-gray-700 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {POLICY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="text-white">Due Date</Label>
                  <Input
                    id="dueDate"
                    placeholder="e.g., 15 Dec 2023"
                    value={formData.dueDate}
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
                  {isLoading ? "Creating..." : "Create Policy"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="bg-gray-900/60 mb-6">
            <TabsTrigger value="all">All Policies</TabsTrigger>
            <TabsTrigger value="motorcycle">Motorcycle</TabsTrigger>
            <TabsTrigger value="tuktuk">Tuktuk</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {policies.map((policy) => (
              <PolicyCard
                key={policy.policyNo}
                title={policy.title}
                policyNo={policy.policyNo}
                dueDate={policy.dueDate}
                type={policy.type}
              />
            ))}
          </TabsContent>

          <TabsContent value="motorcycle" className="space-y-4">
            {policies
              .filter((policy) => policy.type === "motorcycle")
              .map((policy) => (
                <PolicyCard
                  key={policy.policyNo}
                  title={policy.title}
                  policyNo={policy.policyNo}
                  dueDate={policy.dueDate}
                  type={policy.type}
                />
              ))}
          </TabsContent>

          <TabsContent value="tuktuk" className="space-y-4">
            {policies
              .filter((policy) => policy.type === "tuktuk")
              .map((policy) => (
                <PolicyCard
                  key={policy.policyNo}
                  title={policy.title}
                  policyNo={policy.policyNo}
                  dueDate={policy.dueDate}
                  type={policy.type}
                />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}