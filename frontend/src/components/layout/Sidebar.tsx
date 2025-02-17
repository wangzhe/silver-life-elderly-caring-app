import * as React from "react"
import type { FC } from "react"
import { Home, Bot, Settings, AlertTriangle, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
  count?: number
}

const navItems: NavItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "监控",
    href: "/"
  },
  {
    icon: <Bot className="h-5 w-5" />,
    label: "机器人",
    href: "/robot"
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "配置",
    href: "/config"
  },
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    label: "警告",
    href: "/alerts",
    count: 2
  }
]

interface SidebarProps {
  currentPath: string
  currentFloor: number
  totalFloors: number
  onNavigate: (path: string) => void
  onFloorChange: (floor: number) => void
}

export const Sidebar: FC<SidebarProps> = ({
  currentPath,
  currentFloor,
  totalFloors,
  onNavigate,
  onFloorChange
}) => {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold">智慧养老院</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => onNavigate(item.href)}
            className={cn(
              "w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              currentPath === item.href
                ? "bg-primary text-primary-foreground"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
            {item.count && (
              <span className="ml-auto bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>
      
      {currentPath === "/" && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex flex-col items-center space-y-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
              onClick={() => onFloorChange(Math.min(currentFloor + 1, totalFloors))}
              disabled={currentFloor === totalFloors}
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <span className="text-lg font-medium">{currentFloor}F</span>
            <button
              className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
              onClick={() => onFloorChange(Math.max(currentFloor - 1, 1))}
              disabled={currentFloor === 1}
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
