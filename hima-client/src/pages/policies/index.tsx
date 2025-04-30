"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PolicyCard } from "@/components/policy-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import DashboardLayout from "@/components/@layouts/dashboardLayout"

export default function PoliciesPage() {
  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium">Policy Cards</h1>
            <p className="text-xs text-gray-400">Manage all your insurance policies</p>
          </div>
          <Button className="bg-yellow-500 hover:bg-yellow-600">
            <Plus className="w-4 h-4 mr-2" />
            New Policy
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="bg-gray-900/60 mb-6">
            <TabsTrigger value="all">All Policies</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
            <TabsTrigger value="wealth">Wealth</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <PolicyCard title="Haven Life Micro" policyNo="PV9292" dueDate="12 Dec 2023" />
            <PolicyCard title="Sauls Wealth Ins" policyNo="PV7292" dueDate="12 Dec 2023" type="wealth" />
            <PolicyCard title="Family Floater" policyNo="PV4432" dueDate="12 Dec 2023" type="health" />
            <PolicyCard title="Boda Boda Cover" policyNo="PV8821" dueDate="15 Dec 2023" type="vehicle" />
            <PolicyCard title="Market Vendor" policyNo="PV5532" dueDate="20 Dec 2023" />
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            <PolicyCard title="Family Floater" policyNo="PV4432" dueDate="12 Dec 2023" type="health" />
          </TabsContent>

          <TabsContent value="vehicle" className="space-y-4">
            <PolicyCard title="Boda Boda Cover" policyNo="PV8821" dueDate="15 Dec 2023" type="vehicle" />
          </TabsContent>

          <TabsContent value="wealth" className="space-y-4">
            <PolicyCard title="Sauls Wealth Ins" policyNo="PV7292" dueDate="12 Dec 2023" type="wealth" />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
