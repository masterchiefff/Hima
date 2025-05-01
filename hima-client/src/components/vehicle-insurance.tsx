import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

export function VehicleInsurance() {
  return (
    <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-medium text-white">Vehicle Insurance</h3>
        <Avatar className="w-6 h-6 bg-yellow-300 text-black ml-auto">
          <span className="text-xs">1</span>
        </Avatar>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs mb-4">
        <div>
          <div className="text-gray-400">Policy No.:</div>
          <div className="text-white">PV4AD5V36090</div>
        </div>
        <div>
          <div className="text-gray-400">Car No.:</div>
          <div className="text-white">8888-EV</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="text-gray-400">Premium Due Date:</div>
          <div className="text-white">14 Feb 2023</div>
        </div>
        <div>
          <div className="text-gray-400">Dep. Value:</div>
          <div className="text-white">10%</div>
        </div>
      </div>
    </Card>
  )
}
