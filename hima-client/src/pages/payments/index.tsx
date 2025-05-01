"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"
import { CreditCard, Calendar, ArrowUpRight, Plus, Wallet, DollarSign } from "lucide-react"
import DashboardLayout from "@/components/@layouts/dashboardLayout"

export default function PaymentsPage() {
  const isMobile = useMobile()

  return (
    <DashboardLayout>
        <div>
            <div className="mb-6">
                <h1 className="text-xl font-medium">Payments</h1>
                <p className="text-xs text-gray-400">Manage your payments and wallet</p>
            </div>

            <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-4 mb-6`}>
                <WalletCard
                title="cKES Wallet"
                balance="120.50"
                currency="cKES"
                color="bg-yellow-500/20"
                borderColor="border-yellow-500/30"
                icon={<Wallet className="w-5 h-5 text-yellow-500" />}
                />
                <WalletCard
                title="Earnings"
                balance="45.75"
                currency="cKES"
                color="bg-green-500/20"
                borderColor="border-green-500/30"
                icon={<DollarSign className="w-5 h-5 text-green-500" />}
                />
                <WalletCard
                title="Rewards"
                balance="12.25"
                currency="cKES"
                color="bg-purple-500/20"
                borderColor="border-purple-500/30"
                icon={<CreditCard className="w-5 h-5 text-purple-500" />}
                />
            </div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Quick Actions</h2>
            </div>

            <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-4"} gap-4 mb-6`}>
                <ActionCard icon={<Plus />} title="Add Funds" />
                <ActionCard icon={<ArrowUpRight />} title="Send Money" />
                <ActionCard icon={<CreditCard />} title="Pay Premium" />
                <ActionCard icon={<Calendar />} title="Schedule Payment" />
            </div>

            <Tabs defaultValue="history">
                <TabsList className="bg-gray-900/60 mb-6">
                <TabsTrigger value="history">Payment History</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
                <TabsTrigger value="methods">Payment Methods</TabsTrigger>
                </TabsList>

                <TabsContent value="history" className="space-y-4">
                <TransactionCard
                    title="Premium Payment"
                    description="Health Insurance"
                    amount="-10.00"
                    currency="cKES"
                    date="Apr 20, 2023"
                    status="completed"
                />
                <TransactionCard
                    title="Wallet Top-up"
                    description="MiniPay"
                    amount="+50.00"
                    currency="cKES"
                    date="Apr 15, 2023"
                    status="completed"
                />
                <TransactionCard
                    title="Premium Payment"
                    description="Vehicle Insurance"
                    amount="-8.00"
                    currency="cKES"
                    date="Apr 10, 2023"
                    status="completed"
                />
                <TransactionCard
                    title="Claim Payout"
                    description="Health Insurance"
                    amount="+25.00"
                    currency="cKES"
                    date="Apr 5, 2023"
                    status="completed"
                />
                <TransactionCard
                    title="Referral Bonus"
                    description="New User Signup"
                    amount="+5.00"
                    currency="cKES"
                    date="Apr 1, 2023"
                    status="completed"
                />
                </TabsContent>

                <TabsContent value="upcoming" className="space-y-4">
                <TransactionCard
                    title="Premium Payment"
                    description="Health Insurance"
                    amount="-10.00"
                    currency="cKES"
                    date="May 20, 2023"
                    status="upcoming"
                />
                <TransactionCard
                    title="Premium Payment"
                    description="Vehicle Insurance"
                    amount="-8.00"
                    currency="cKES"
                    date="May 10, 2023"
                    status="upcoming"
                />
                <TransactionCard
                    title="Premium Payment"
                    description="Wealth Insurance"
                    amount="-45.00"
                    currency="cKES"
                    date="Jun 5, 2023"
                    status="upcoming"
                />
                </TabsContent>

                <TabsContent value="methods" className="space-y-4">
                <PaymentMethodCard
                    title="MiniPay"
                    description="Connected"
                    icon={<CreditCard className="w-5 h-5 text-yellow-500" />}
                    isPrimary
                />
                <PaymentMethodCard
                    title="M-Pesa"
                    description="+254 712 345 678"
                    icon={<CreditCard className="w-5 h-5 text-purple-500" />}
                    isPrimary={false}
                />
                <Button className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                </Button>
                </TabsContent>
            </Tabs>
            </div>
    </DashboardLayout>
  )
}

interface WalletCardProps {
  title: string
  balance: string
  currency: string
  color: string
  borderColor: string
  icon: React.ReactNode
}

function WalletCard({ title, balance, currency, color, borderColor, icon }: WalletCardProps) {
  return (
    <Card className={`${color} backdrop-blur-sm border ${borderColor} rounded-xl p-4`}>
      <div className="flex items-center mb-4">
        <div className="bg-black/30 rounded-full p-2">{icon}</div>
        <h3 className="text-sm font-medium text-white ml-2">{title}</h3>
      </div>
      <div className="text-2xl font-bold text-white">
        {balance} <span className="text-sm">{currency}</span>
      </div>
      <Button variant="outline" size="sm" className="mt-4 bg-black/20 border-white/20 text-white">
        Manage
      </Button>
    </Card>
  )
}

interface ActionCardProps {
  icon: React.ReactNode
  title: string
}

function ActionCard({ icon, title }: ActionCardProps) {
  return (
    <Card className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:bg-gray-800/40 transition-colors cursor-pointer">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-black/30 rounded-full p-3 mb-2">{icon}</div>
        <h3 className="text-sm font-medium text-white">{title}</h3>
      </div>
    </Card>
  )
}

interface TransactionCardProps {
  title: string
  description: string
  amount: string
  currency: string
  date: string
  status: "completed" | "pending" | "failed" | "upcoming"
}

function TransactionCard({ title, description, amount, currency, date, status }: TransactionCardProps) {
  const isPositive = amount.startsWith("+")

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "pending":
        return "text-yellow-400"
      case "failed":
        return "text-red-400"
      case "upcoming":
        return "text-blue-400"
    }
  }

  return (
    <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-white">{title}</h3>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold ${isPositive ? "text-green-400" : "text-white"}`}>
            {amount} {currency}
          </div>
          <div className="flex items-center justify-end gap-1 text-xs">
            <span className="text-gray-400">{date}</span>
            <span className={`ml-2 capitalize ${getStatusColor()}`}>• {status}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

interface PaymentMethodCardProps {
  title: string
  description: string
  icon: React.ReactNode
  isPrimary: boolean
}

function PaymentMethodCard({ title, description, icon, isPrimary }: PaymentMethodCardProps) {
  return (
    <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-black/30 rounded-full p-2 mr-3">{icon}</div>
          <div>
            <h3 className="text-sm font-medium text-white">{title}</h3>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isPrimary && (
            <span className="text-xs bg-yellow-500/20 text-yellow-300 py-1 px-2 rounded-full">Primary</span>
          )}
          <Button variant="outline" size="sm">
            {isPrimary ? "Disconnect" : "Remove"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
