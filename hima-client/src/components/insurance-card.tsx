import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"

interface InsuranceCardProps {
  type: string
  count: number
  amount: string
  color: string
  textColor: string
  currency?: string
}

export function InsuranceCard({ type, count, amount, color, textColor, currency = "cKES" }: InsuranceCardProps) {
  return (
    <Card className={`${color} ${textColor} rounded-xl p-4 relative overflow-hidden`}>
      <div className="flex flex-col">
        <div className="text-sm font-medium mb-2">
          {type} ({count})
        </div>
        <div className="text-xs opacity-70 mb-1">Coverage</div>
        <div className="text-xl font-bold">
          ${amount} {currency}
        </div>
      </div>
      <button className="absolute bottom-4 right-4 bg-black rounded-full w-8 h-8 flex items-center justify-center">
        <ArrowRight className="w-4 h-4 text-white" />
      </button>
    </Card>
  )
}
