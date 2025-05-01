"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import DashboardLayout from "@/components/@layouts/dashboardLayout"

export default function ClaimsPage() {
  return (
    <DashboardLayout>
        <div>
        <div className="flex items-center justify-between mb-6">
            <div>
            <h1 className="text-xl font-medium">Claims</h1>
            <p className="text-xs text-gray-400">Submit and track your insurance claims</p>
            </div>
            <Button className="bg-purple-500 hover:bg-purple-600">
            <AlertCircle className="w-4 h-4 mr-2" />
            New Claim
            </Button>
        </div>

        <Tabs defaultValue="active">
            <TabsList className="bg-gray-900/60 mb-6">
            <TabsTrigger value="active">Active Claims</TabsTrigger>
            <TabsTrigger value="history">Claim History</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
            <ClaimCard title="Boda Boda Accident" policyNo="PV8821" date="10 Dec 2023" amount="2,500" status="pending" />
            <ClaimCard title="Medical Expenses" policyNo="PV4432" date="05 Dec 2023" amount="1,200" status="processing" />
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
            <ClaimCard title="Vehicle Repair" policyNo="PV8821" date="15 Nov 2023" amount="3,000" status="approved" />
            <ClaimCard title="Hospital Stay" policyNo="PV4432" date="28 Oct 2023" amount="5,500" status="approved" />
            <ClaimCard title="Property Damage" policyNo="PV7292" date="10 Oct 2023" amount="1,800" status="rejected" />
            </TabsContent>
        </Tabs>
        </div>
    </DashboardLayout>
  )
}

interface ClaimCardProps {
  title: string
  policyNo: string
  date: string
  amount: string
  status: "pending" | "processing" | "approved" | "rejected"
}

function ClaimCard({ title, policyNo, date, amount, status }: ClaimCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300"
      case "processing":
        return "bg-blue-500/20 text-blue-300"
      case "approved":
        return "bg-green-500/20 text-green-300"
      case "rejected":
        return "bg-red-500/20 text-red-300"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 mr-2" />
      case "processing":
        return <Clock className="w-4 h-4 mr-2" />
      case "approved":
        return <CheckCircle className="w-4 h-4 mr-2" />
      case "rejected":
        return <AlertCircle className="w-4 h-4 mr-2" />
    }
  }

  return (
    <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <div className={`flex items-center text-xs py-1 px-3 rounded-full ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="capitalize">{status}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs mb-4">
        <div>
          <div className="text-gray-400">Policy No.:</div>
          <div className="text-white">{policyNo}</div>
        </div>
        <div>
          <div className="text-gray-400">Claim Date:</div>
          <div className="text-white">{date}</div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-400">Claim Amount:</div>
        <div className="text-lg font-bold text-white">{amount} cKES</div>
      </div>
    </Card>
  )
}
