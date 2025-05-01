"use client"

import { InsuranceCard } from "@/components/insurance-card"
import { PortfolioStats } from "@/components/portfolio-stats"
import { FamilyInsurance } from "@/components/family-insurance"
import { VehicleInsurance } from "@/components/vehicle-insurance"
import { PolicyCard } from "@/components/policy-card"
import { QuickActionButton } from "@/components/quick-action-button"
import { useMobile } from "@/hooks/use-mobile"
import DashboardLayout from "@/components/@layouts/dashboardLayout"

export default function DashboardPage() {
  const isMobile = useMobile()

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-medium">
            Hello, <span className="font-bold">Daniel</span>
          </h1>
          <p className="text-xs text-gray-400">Manage your micro-insurance for gig work protection.</p>
        </div>

        <div className={`grid ${isMobile ? "grid-cols-1 gap-3" : "grid-cols-3 gap-4"} mb-6`}>
          <InsuranceCard
            type="Health Insurance"
            count={1}
            amount="10"
            currency="cKES"
            color="bg-yellow-300"
            textColor="text-black"
          />

          <InsuranceCard
            type="Vehicle Insurance"
            count={4}
            amount="8"
            currency="cKES"
            color="bg-purple-400"
            textColor="text-black"
          />

          <InsuranceCard
            type="Wealth Insurance"
            count={8}
            amount="45"
            currency="cKES"
            color="bg-green-300"
            textColor="text-black"
          />
        </div>

        {isMobile ? (
          <div className="space-y-4">
            <PortfolioStats isMobile={true} />

            <div className="grid grid-cols-2 gap-3">
              <QuickActionButton type="join" />
              <QuickActionButton type="claim" />
            </div>

            <FamilyInsurance />
            <VehicleInsurance />

            <div className="space-y-3">
              <PolicyCard title="Haven Life Micro" policyNo="PV9292" dueDate="12 Dec 2023" />
              <PolicyCard title="Sauls Wealth Ins" policyNo="PV7292" dueDate="12 Dec 2023" type="wealth" />
              <PolicyCard title="Family Floater" policyNo="PV4432" dueDate="12 Dec 2023" type="health" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <PortfolioStats isMobile={false} />

              <div className="grid grid-cols-2 gap-4 mt-4">
                <FamilyInsurance />
                <VehicleInsurance />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <QuickActionButton type="join" />
                <QuickActionButton type="claim" />
              </div>
            </div>

            <div className="space-y-4">
              <PolicyCard title="Haven Life Micro" policyNo="PV9292" dueDate="12 Dec 2023" />
              <PolicyCard title="Sauls Wealth Ins" policyNo="PV7292" dueDate="12 Dec 2023" type="wealth" />
              <PolicyCard title="Family Floater" policyNo="PV4432" dueDate="12 Dec 2023" type="health" />
              <PolicyCard title="Sauls Wealth Ins" policyNo="PV7292" dueDate="12 Dec 2023" type="wealth" />
              <PolicyCard title="Haven Life Micro" policyNo="PV9292" dueDate="12 Dec 2023" />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
