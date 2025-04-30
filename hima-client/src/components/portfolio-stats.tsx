import { Card } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"

interface PortfolioStatsProps {
  isMobile: boolean
}

export function PortfolioStats({ isMobile }: PortfolioStatsProps) {
  return (
    <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-white">Policy Portfolio Stats</h3>
        {!isMobile && <MoreHorizontal className="w-5 h-5 text-gray-400" />}
      </div>
      <div className="text-xs text-gray-400 mb-4">June 14 - July 14, 2022</div>

      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
        <span className="text-xs text-gray-300">Earning</span>

        <div className="w-2 h-2 rounded-full bg-yellow-300 ml-2"></div>
        <span className="text-xs text-gray-300">Investment</span>

        {!isMobile && (
          <>
            <div className="ml-auto px-3 py-1 bg-purple-400 rounded-full text-xs">30 cKES</div>
          </>
        )}
      </div>

      <div className="h-32 relative">
        {/* Chart visualization */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 300 100" className="w-full h-full">
            {/* Purple line */}
            <path
              d="M0,80 C20,70 40,30 60,20 C80,10 100,50 120,60 C140,70 160,40 180,30 C200,20 220,40 240,50 C260,60 280,40 300,50"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="2"
            />

            {/* Yellow line */}
            <path
              d="M0,60 C20,50 40,60 60,50 C80,40 100,60 120,70 C140,80 160,60 180,50 C200,40 220,60 240,70 C260,80 280,50 300,40"
              fill="none"
              stroke="#fcd34d"
              strokeWidth="2"
            />

            {/* Highlight points */}
            <circle cx="120" cy="60" r="4" fill="#a78bfa" />
            <circle cx="240" cy="70" r="4" fill="#fcd34d" />

            {isMobile ? (
              <>
                <text x="120" y="45" fontSize="8" fill="white" textAnchor="middle">
                  30 cKES
                </text>
                <text x="240" y="55" fontSize="8" fill="white" textAnchor="middle">
                  7 cKES
                </text>
              </>
            ) : (
              <>
                <text x="240" y="55" fontSize="8" fill="white" textAnchor="middle">
                  7 cKES
                </text>
              </>
            )}
          </svg>
        </div>

        {!isMobile && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            <div>Jan</div>
            <div>Feb</div>
            <div>Mar</div>
            <div>Apr</div>
            <div>May</div>
            <div>Jun</div>
          </div>
        )}
      </div>
    </Card>
  )
}
