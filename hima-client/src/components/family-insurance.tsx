import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

export function FamilyInsurance() {
  return (
    <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
      <h3 className="text-sm font-medium text-white mb-4">Family Insurance - $1 M</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="w-16 text-gray-400">Father</div>
          <div className="w-20 text-gray-300">41 Years</div>
          <div className="w-20 text-gray-300">Individual</div>
          <div className="w-16 text-gray-300">$25k</div>
          <div className="w-16 text-gray-300">$250</div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="w-16 text-gray-400">Mother</div>
          <div className="w-20 text-gray-300">39 Years</div>
          <div className="w-20 text-gray-300">Individual</div>
          <div className="w-16 text-gray-300">$25k</div>
          <div className="w-16 text-gray-300">$225</div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex -space-x-2">
          <Avatar className="w-6 h-6 border-2 border-black">
            <img src="/placeholder.svg?height=24&width=24" alt="Family member" />
          </Avatar>
          <Avatar className="w-6 h-6 border-2 border-black">
            <img src="/placeholder.svg?height=24&width=24" alt="Family member" />
          </Avatar>
          <Avatar className="w-6 h-6 border-2 border-black">
            <img src="/placeholder.svg?height=24&width=24" alt="Family member" />
          </Avatar>
          <Avatar className="w-6 h-6 border-2 border-black">
            <img src="/placeholder.svg?height=24&width=24" alt="Family member" />
          </Avatar>
          <Avatar className="w-6 h-6 border-2 border-black bg-yellow-300 text-black">
            <span className="text-xs">+</span>
          </Avatar>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 text-xs">
        <div className="text-gray-400">Family floater total cover</div>
        <div className="text-white">$1 cKES</div>
      </div>

      <button className="mt-4 bg-yellow-300 text-black text-xs py-1 px-4 rounded-full ml-auto block">Top Up</button>
    </Card>
  )
}
