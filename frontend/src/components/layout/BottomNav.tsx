import { Home, Bot, Settings, AlertTriangle } from "lucide-react"
import { cn } from "../../lib/utils"
import React from "react"

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
}

const navItems: NavItem[] = [
  {
    icon: <Home className="h-6 w-6" />,
    label: "监控",
    href: "/"
  },
  {
    icon: <Bot className="h-6 w-6" />,
    label: "机器人",
    href: "/robot"
  },
  {
    icon: <Settings className="h-6 w-6" />,
    label: "配置",
    href: "/config"
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    label: "警告",
    href: "/alerts"
  }
]

export function BottomNav({ currentPath, onNavigate }: { currentPath: string; onNavigate?: (path: string) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <a
            key={item.href}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onNavigate?.(item.href)
            }}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              currentPath === item.href ? "text-primary" : "text-gray-500"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
