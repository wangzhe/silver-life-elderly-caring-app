import { FC } from "react"
import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Clock, AlertTriangle, CheckCircle, Forward } from "lucide-react"

export interface Alert {
  id: string
  type: "vital" | "robot"
  priority: "high" | "medium" | "low"
  message: string
  createdAt: Date
  status: "pending" | "processing" | "resolved"
  timeoutMinutes: number
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-blue-100 text-blue-800"
}

const statusSteps = {
  pending: 1,
  processing: 2,
  resolved: 3
}

export const AlertList: FC<{ alerts: Alert[] }> = ({ alerts }) => {
  return (
    <div className="space-y-4 p-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge className={priorityColors[alert.priority]}>
              {alert.priority.toUpperCase()}
            </Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{alert.timeoutMinutes}分钟</span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <p>{alert.message}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-2 w-2 rounded-full ${
                    step <= statusSteps[alert.status]
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {new Date(alert.createdAt).toLocaleTimeString()}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => console.log(`Confirm alert ${alert.id}`)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              确认
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => console.log(`Forward alert ${alert.id}`)}
            >
              <Forward className="h-4 w-4 mr-1" />
              转发
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
