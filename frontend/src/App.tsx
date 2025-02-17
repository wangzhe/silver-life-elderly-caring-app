import { useState, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import { BottomNav } from './components/layout/BottomNav'
import { PCLayout } from './components/layout/PCLayout'
import { RoomGrid } from './components/monitoring/RoomGrid'
import type { Room, VitalSign } from './types'
import { RobotList } from './components/robot/RobotList'
import { AlertList } from './components/alerts/AlertList'

function App() {
  const [currentFloor, setCurrentFloor] = useState(1)
  const totalFloors = 3
  const [currentPath, setCurrentPath] = useState("/")
  const [isDesktop, setIsDesktop] = useState(false)

  // Initialize isDesktop after mount to avoid SSR mismatch
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const updateLayout = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches)
    }
    
    updateLayout(mediaQuery) // Initial check
    mediaQuery.addEventListener('change', updateLayout)
    return () => mediaQuery.removeEventListener('change', updateLayout)
  }, [])

  // Generate mock data
  const mockRooms = useMemo(() => {
    const rooms: Room[] = []
    const statuses = ["sleeping", "awake", "away"] as const
    const chineseNames = ["王", "李", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴", "孙", "马", "朱", "胡", "郭", "何", "高", "林", "徐", "梁"]
    const suffixes = ["老先生", "奶奶", "爷爷", "老太太", "大爷", "老师", "阿姨", "叔叔"]
    
    const getRandomName = () => {
      const firstName = chineseNames[Math.floor(Math.random() * chineseNames.length)]
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
      return firstName + suffix
    }

    // Generate rooms for each floor, area, and room number
    for (let floor = 1; floor <= 3; floor++) {
      for (let area = 1; area <= 3; area++) {
        for (let room = 1; room <= 8; room++) {
          const roomNumber = `${floor}${area}${room.toString().padStart(2, '0')}`
          const bedCount = Math.floor(Math.random() * 3) + 2 // 2-4 beds
          const beds: Room['beds'] = []
          
          // Generate beds for each room
          for (let bed = 1; bed <= bedCount; bed++) {
            const status = statuses[Math.floor(Math.random() * statuses.length)]
            const lastToilet = new Date(Date.now() - Math.floor(Math.random() * 180) * 60000) // 0-180 minutes ago
            
            // Generate vital signs with realistic values and status
            const heartRate = Math.floor(Math.random() * 30) + 60 // 60-90 bpm
            const temperature = (Math.floor(Math.random() * 20) / 10 + 36).toFixed(1) // 36.0-38.0 °C
            const breathRate = Math.floor(Math.random() * 10) + 12 // 12-22 /min
            
            const vitalSigns: VitalSign[] = [
              {
                type: "heart" as const,
                value: heartRate,
                unit: "bpm",
                status: heartRate > 85 ? "warning" as const : heartRate > 90 ? "critical" as const : "normal" as const
              },
              {
                type: "temp" as const,
                value: temperature,
                unit: "°C",
                status: parseFloat(temperature) > 37.5 ? "warning" as const : parseFloat(temperature) > 38 ? "critical" as const : "normal" as const
              },
              {
                type: "breath" as const,
                value: breathRate,
                unit: "/min",
                status: breathRate > 18 ? "warning" as const : breathRate > 20 ? "critical" as const : "normal" as const
              }
            ]
            
            beds.push({
              id: `${roomNumber}-${bed}`,
              patientName: getRandomName(),
              status,
              lastToilet,
              vitalSigns
            })
          }
          
          rooms.push({ roomNumber, beds })
        }
      }
    }
    
    console.log('Generated rooms:', rooms.length)
    return rooms
  }, [])

  // Initialize isDesktop after mount to avoid SSR mismatch
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const updateLayout = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches)
    }
    
    updateLayout(mediaQuery) // Initial check
    mediaQuery.addEventListener('change', updateLayout)
    return () => mediaQuery.removeEventListener('change', updateLayout)
  }, [])

  // Get rooms for current floor, sorted by area and room number
  const currentFloorRooms = useMemo(() => {
    return mockRooms
      .filter(room => parseInt(room.roomNumber[0]) === currentFloor)
      .sort((a, b) => {
        const areaA = parseInt(a.roomNumber[1])
        const areaB = parseInt(b.roomNumber[1])
        if (areaA !== areaB) return areaA - areaB
        return parseInt(a.roomNumber.slice(2)) - parseInt(b.roomNumber.slice(2))
      })
  }, [currentFloor, mockRooms])

  // Mock data for robots
  const mockRobots = useMemo(() => [
    {
      id: "robot1",
      name: "巡逻机器人 1号",
      status: "idle" as const,
      location: "1楼走廊",
      batteryLevel: 85
    },
    {
      id: "robot2",
      name: "巡逻机器人 2号",
      status: "busy" as const,
      location: "2楼 201室",
      currentTask: "巡查房间",
      batteryLevel: 72
    }
  ], [])

  // Mock data for alerts
  const mockAlerts = useMemo(() => [
    {
      id: "alert1",
      type: "vital" as const,
      priority: "high" as const,
      message: "201室李奶奶心率异常（95 bpm）",
      createdAt: new Date(),
      status: "pending" as const,
      timeoutMinutes: 3
    },
    {
      id: "alert2",
      type: "robot" as const,
      priority: "medium" as const,
      message: "2号机器人检测到可能的碰撞风险",
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
      status: "processing" as const,
      timeoutMinutes: 2
    }
  ], [])

  // Log room data verification
  useEffect(() => {
    console.log('\n=== Room Data Verification ===')
    console.log('Total rooms:', mockRooms.length)
    console.log('Expected total rooms:', 3 * 3 * 8, '(3 floors × 3 areas × 8 rooms)')
    
    for (let floor = 1; floor <= 3; floor++) {
      console.log(`\nFloor ${floor}:`)
      for (let area = 1; area <= 3; area++) {
        const areaRooms = mockRooms.filter(r => 
          parseInt(r.roomNumber[0]) === floor && 
          parseInt(r.roomNumber[1]) === area
        )
        console.log(`Area ${area}: ${areaRooms.length} rooms`)
        console.log('Room numbers:', areaRooms.map(r => r.roomNumber).join(', '))
        console.log('Beds per room:', areaRooms.map(r => `${r.roomNumber}(${r.beds.length})`).join(', '))
      }
    }
  }, [mockRooms])


  interface Tab {
    id: string
    title: string
    content: ReactNode
  }

  // Initialize tabs with home tab
  const [tabs, setTabs] = useState<Tab[]>([
    { 
      id: "home", 
      title: "首页", 
      content: (
        <div>
          <div className="mb-4 text-sm text-gray-500">
            当前楼层: {currentFloor}F | 总房间数: {currentFloorRooms.length}
          </div>
          <RoomGrid
            rooms={currentFloorRooms}
            onRoomClick={(roomNumber) => {
              console.log(`Room ${roomNumber} clicked`)
              console.log('Room data:', mockRooms.find(r => r.roomNumber === roomNumber))
            }}
          />
        </div>
      )
    }
  ])
  const [activeTabId, setActiveTabId] = useState("home")

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId)
  }

  const handleTabClose = (tabId: string) => {
    if (tabId === "home") return
    const newTabs = tabs.filter(tab => tab.id !== tabId)
    setTabs(newTabs)
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id)
    }
  }

  const handleNavigate = (path: string) => {
    setCurrentPath(path)
    let newTab
    switch (path) {
      case "/":
        newTab = {
          id: "monitoring",
          title: "监控",
          content: (
            <div>
              <div className="mb-4 text-sm text-gray-500">
                当前楼层: {currentFloor}F | 总房间数: {currentFloorRooms.length}
              </div>
              <RoomGrid
                rooms={currentFloorRooms}
                onRoomClick={(roomNumber) => {
                  console.log('Room clicked:', roomNumber)
                  const room = mockRooms.find(r => r.roomNumber === roomNumber)
                  console.log('Room data:', JSON.stringify(room, null, 2))
                }}
              />
            </div>
          )
        }
        break
      case "/robot":
        newTab = {
          id: "robot",
          title: "机器人",
          content: <RobotList robots={mockRobots} />
        }
        break
      case "/alerts":
        newTab = {
          id: "alerts",
          title: "警告",
          content: <AlertList alerts={mockAlerts} />
        }
        break
      default:
        return
    }
    
    if (!tabs.find(tab => tab.id === newTab.id)) {
      setTabs([...tabs, newTab])
    }
    setActiveTabId(newTab.id)
  }

  // Remove duplicate resize listener

  // Single useEffect for logging room data
  useEffect(() => {
    console.log('\n=== Room Data Verification ===')
    console.log('Total rooms:', mockRooms.length)
    console.log('Expected total rooms:', 3 * 3 * 8, '(3 floors × 3 areas × 8 rooms)')
    console.log('\nCurrent floor:', currentFloor)
    console.log('Current floor rooms:', currentFloorRooms.length)
    console.log('Expected rooms per floor:', 3 * 8, '(3 areas × 8 rooms)')
    
    console.log('\nRooms by floor:')
    for (let floor = 1; floor <= 3; floor++) {
      const floorRooms = mockRooms.filter(room => parseInt(room.roomNumber[0]) === floor)
      console.log(`\nFloor ${floor}:`, floorRooms.length, 'rooms')
      for (let area = 1; area <= 3; area++) {
        const areaRooms = floorRooms.filter(room => parseInt(room.roomNumber[1]) === area)
        console.log(`Area ${area}:`, areaRooms.length, 'rooms')
        console.log('Room numbers:', areaRooms.map(r => r.roomNumber).join(', '))
        console.log('Beds per room:', areaRooms.map(r => `${r.roomNumber}(${r.beds.length})`).join(', '))
      }
    }
  }, [currentFloor, currentFloorRooms])

  return isDesktop ? (
    <PCLayout
      username="高级护工"
      unreadAlerts={2}
      currentPath={currentPath}
      currentFloor={currentFloor}
      totalFloors={totalFloors}
      onNavigate={handleNavigate}
      onFloorChange={setCurrentFloor}
      tabs={tabs}
      activeTabId={activeTabId}
      onTabChange={handleTabChange}
      onTabClose={handleTabClose}
    />
  ) : (
    <div className="pb-16 min-h-screen bg-gray-50">
      <main className="p-4">
        {currentPath === "/" && (
          <div>
            <div className="mb-4 text-sm text-gray-500">
              当前楼层: {currentFloor}F | 总房间数: {currentFloorRooms.length}
            </div>
            <RoomGrid
              rooms={currentFloorRooms}
              onRoomClick={(roomNumber) => {
                console.log(`Room ${roomNumber} clicked`)
                console.log('Room data:', mockRooms.find(r => r.roomNumber === roomNumber))
              }}
            />
          </div>
        )}
        {currentPath === "/robot" && <RobotList robots={mockRobots} />}
        {currentPath === "/alerts" && <AlertList alerts={mockAlerts} />}
      </main>
      <BottomNav currentPath={currentPath} onNavigate={setCurrentPath} />
    </div>
  )
}

export default App
