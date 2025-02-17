import { FC } from "react"
import { Bell, User, Clock } from "lucide-react"
import { Badge } from "../../components/ui/badge"

interface TopBarProps {
  username: string
  unreadAlerts: number
}

export const TopBar: FC<TopBarProps> = ({ username, unreadAlerts }) => {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Clock className="h-5 w-5 text-gray-500" />
        <span className="text-sm text-gray-600">
          {new Date().toLocaleTimeString()}
        </span>
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="relative">
          <Bell className="h-5 w-5 text-gray-500" />
          {unreadAlerts > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center bg-red-500 text-white text-xs rounded-full"
            >
              {unreadAlerts}
            </Badge>
          )}
        </button>
        
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium">{username}</span>
        </div>
      </div>
    </div>
  )
}
