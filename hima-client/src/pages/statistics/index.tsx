"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"
import { BarChart, LineChart, PieChart } from "@/components/chart"
import DashboardLayout from "@/components/@layouts/dashboardLayout"

export default function StatisticsPage() {
  const isMobile = useMobile()

  return (
    <DashboardLayout>
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-medium">Statistics</h1>
                <p className="text-xs text-gray-400">Track your insurance performance and analytics</p>
            </div>

            <Tabs defaultValue="overview">
                <TabsList className="bg-gray-900/60 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="claims">Claims</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-white mb-4">Policy Distribution</h3>
                    <div className="h-64">
                    <PieChart />
                    </div>
                </Card>

                <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-6`}>
                    <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-white mb-4">Premium Payments</h3>
                    <div className="h-64">
                        <BarChart />
                    </div>
                    </Card>

                    <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-white mb-4">Coverage Growth</h3>
                    <div className="h-64">
                        <LineChart />
                    </div>
                    </Card>
                </div>

                <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-white mb-4">Monthly Premium Breakdown</h3>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                    <StatCard title="Health" value="10 cKES" change="+5%" positive />
                    <StatCard title="Vehicle" value="8 cKES" change="-2%" positive={false} />
                    <StatCard title="Wealth" value="45 cKES" change="+12%" positive />
                    </div>
                </Card>
                </TabsContent>

                <TabsContent value="claims" className="space-y-6">
                <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-white mb-4">Claims History</h3>
                    <div className="h-64">
                    <LineChart />
                    </div>
                </Card>

                <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-6`}>
                    <StatCard title="Total Claims" value="12" change="+2" positive={false} />
                    <StatCard title="Approved" value="10" change="+2" positive />
                    <StatCard title="Pending" value="2" change="0" positive />
                </div>

                <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-white mb-4">Claims by Category</h3>
                    <div className="h-64">
                    <PieChart />
                    </div>
                </Card>
                </TabsContent>

                <TabsContent value="payments" className="space-y-6">
                <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-white mb-4">Payment History</h3>
                    <div className="h-64">
                    <BarChart />
                    </div>
                </Card>

                <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-6`}>
                    <StatCard title="Total Paid" value="63 cKES" change="+15 cKES" positive />
                    <StatCard title="This Month" value="12 cKES" change="+2 cKES" positive />
                    <StatCard title="Due Soon" value="8 cKES" change="" positive />
                </div>

                <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-white mb-4">Payment Methods</h3>
                    <div className="h-64">
                    <PieChart />
                    </div>
                </Card>
                </TabsContent>
            </Tabs>
        </div>
    </DashboardLayout>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  positive: boolean
}

function StatCard({ title, value, change, positive }: StatCardProps) {
  return (
    <Card className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
      <h4 className="text-xs text-gray-400 mb-1">{title}</h4>
      <div className="text-xl font-bold text-white">{value}</div>
      {change && (
        <div className={`text-xs mt-1 ${positive ? "text-green-400" : "text-red-400"}`}>
          {positive ? "↑" : "↓"} {change}
        </div>
      )}
    </Card>
  )
}
