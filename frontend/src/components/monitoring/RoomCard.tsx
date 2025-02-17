import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Clock, Heart, Thermometer, Wind } from "lucide-react"
import { FC } from "react"

import type { Bed } from "../../types"

interface RoomCardProps {
  roomNumber: string
  beds: Bed[]
  onClick: () => void
}

const statusColors = {
  normal: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  critical: "bg-red-100 text-red-800 border-red-200"
}

const bedStatusIcons = {
  sleeping: "💤",
  awake: "👀",
  away: "🚶"
}

export const RoomCard: FC<RoomCardProps> = ({ roomNumber, beds, onClick }) => {
  return (
    <Card 
      className="p-4 m-2 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="text-base font-bold">
            {roomNumber.slice(-2)}号房
            <Badge variant="outline" className="ml-2 text-xs px-1.5 py-0.5">{beds.length}床</Badge>
          </h3>
        </div>
      </div>
      
      <div className="space-y-1">
        {beds.map((bed) => (
          <div key={bed.id} className="border-t pt-1">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">{bed.patientName}</span>
              <span className="text-sm">{bedStatusIcons[bed.status]}</span>
            </div>
            
            <div className="flex gap-1 mt-0.5">
              {bed.vitalSigns.map((sign, index) => {
                const Icon = sign.type === "heart" ? Heart : 
                           sign.type === "temp" ? Thermometer : Wind
                
                return (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className={`text-xs px-1.5 py-0.5 ${statusColors[sign.status]}`}
                  >
                    <Icon className="h-2.5 w-2.5 mr-0.5" />
                    {sign.value}{sign.unit}
                  </Badge>
                )
              })}
            </div>
            
            <div className="flex items-center text-xs text-gray-500 mt-0.5">
              <Clock className="h-2.5 w-2.5 mr-0.5" />
              <span>上厕所: {formatTimeAgo(bed.lastToilet)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function formatTimeAgo(date: Date): string {
  const minutes = Math.floor((new Date().getTime() - date.getTime()) / 1000 / 60)
  return `${minutes}分钟前`
}
