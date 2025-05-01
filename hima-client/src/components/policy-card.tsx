import { Card } from "@/components/ui/card"

interface PolicyCardProps {
  title: string
  policyNo: string
  dueDate: string
  type?: "health" | "wealth" | "vehicle"
}

export function PolicyCard({ title, policyNo, dueDate, type }: PolicyCardProps) {
  const getBgColor = () => {
    if (type === "health") return "bg-yellow-300/10"
    if (type === "wealth") return "bg-green-300/10"
    if (type === "vehicle") return "bg-purple-300/10"
    return "bg-gray-800/40"
  }

  const getBorderColor = () => {
    if (type === "health") return "border-yellow-300/30"
    if (type === "wealth") return "border-green-300/30"
    if (type === "vehicle") return "border-purple-300/30"
    return "border-gray-700"
  }

  const getButtonBg = () => {
    if (type === "health") return "bg-yellow-300/20 text-yellow-300"
    if (type === "wealth") return "bg-green-300/20 text-green-300"
    if (type === "vehicle") return "bg-purple-300/20 text-purple-300"
    return "bg-gray-700 text-white"
  }

  return (
    <Card className={`${getBgColor()} backdrop-blur-sm border ${getBorderColor()} rounded-xl p-4`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <button className={`text-xs py-1 px-3 rounded-full ${getButtonBg()}`}>Life Ins. Policy</button>
      </div>

      <div className="text-xs text-gray-400 mb-4">Policy No.: {policyNo}</div>

      <div className="text-xs text-gray-400">
        Premium Due Date: <span className="text-white">{dueDate}</span>
      </div>
    </Card>
  )
}
