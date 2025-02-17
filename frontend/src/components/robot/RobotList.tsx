import { FC } from "react"
import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Bot, Video, Play } from "lucide-react"
import { Button } from "../../components/ui/button"

export interface RobotStatus {
  id: string
  name: string
  status: "idle" | "busy" | "charging" | "error"
  location: string
  currentTask?: string
  batteryLevel: number
}

const statusColors = {
  idle: "bg-green-100 text-green-800",
  busy: "bg-blue-100 text-blue-800",
  charging: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800"
}

export const RobotList: FC<{ robots: RobotStatus[] }> = ({ robots }) => {
  return (
    <div className="space-y-4 p-4">
      {robots.map((robot) => (
        <Card key={robot.id} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <span className="font-medium">{robot.name}</span>
            </div>
            <Badge className={statusColors[robot.status]}>
              {robot.status.toUpperCase()}
            </Badge>
          </div>
          
          <div className="text-sm text-gray-500 mb-2">
            <div>位置: {robot.location}</div>
            {robot.currentTask && <div>任务: {robot.currentTask}</div>}
            <div>电量: {robot.batteryLevel}%</div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = `${import.meta.env.VITE_ROBOT_CONTROL_URL}/${robot.id}`}
            >
              <Play className="h-4 w-4 mr-1" />
              控制
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = `${import.meta.env.VITE_ROBOT_VIDEO_URL}/${robot.id}`}
            >
              <Video className="h-4 w-4 mr-1" />
              视频
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
