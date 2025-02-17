import { FC } from "react"
import type { ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"

interface Tab {
  id: string
  title: string
  content: ReactNode
}

interface PCLayoutProps {
  username: string
  unreadAlerts: number
  currentPath: string
  currentFloor: number
  totalFloors: number
  onNavigate: (path: string) => void
  onFloorChange: (floor: number) => void
  tabs: Tab[]
  activeTabId: string
  onTabChange: (tabId: string) => void
  onTabClose: (tabId: string) => void
}

export const PCLayout: FC<PCLayoutProps> = ({
  username,
  unreadAlerts,
  currentPath,
  currentFloor,
  totalFloors,
  onNavigate,
  onFloorChange,
  tabs,
  activeTabId,
  onTabChange,
  onTabClose
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        currentPath={currentPath}
        currentFloor={currentFloor}
        totalFloors={totalFloors}
        onNavigate={onNavigate}
        onFloorChange={onFloorChange}
      />
      
      <div className="ml-64">
        <TopBar
          username={username}
          unreadAlerts={unreadAlerts}
        />
        
        <main className="mt-16 p-6">
          {/* Tab Bar */}
          <div className="flex items-center space-x-1 mb-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  px-4 py-2 rounded-t-lg text-sm font-medium
                  ${activeTabId === tab.id
                    ? "bg-white text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"}
                `}
              >
                <div className="flex items-center space-x-2">
                  <span>{tab.title}</span>
                  {tab.id !== "home" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onTabClose(tab.id)
                      }}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={activeTabId === tab.id ? "block" : "hidden"}
              >
                {tab.content}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
