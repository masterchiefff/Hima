import { Button } from "@/components/ui/button"
import { Shield, AlertCircle } from "lucide-react"

interface QuickActionButtonProps {
  type: "join" | "claim"
}

export function QuickActionButton({ type }: QuickActionButtonProps) {
  return (
    <Button
      className={`rounded-xl py-6 w-full flex items-center justify-center gap-3 ${
        type === "join" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-purple-500 hover:bg-purple-600"
      }`}
    >
      {type === "join" ? (
        <>
          <Shield className="w-5 h-5" />
          <span>Join in 3 Taps</span>
        </>
      ) : (
        <>
          <AlertCircle className="w-5 h-5" />
          <span>Claim in 2 Taps</span>
        </>
      )}
    </Button>
  )
}
