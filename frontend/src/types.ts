export interface VitalSign {
  type: "heart" | "temp" | "breath"
  value: number | string  // Allow string for temperature with decimal
  unit: string
  status: "normal" | "warning" | "critical"
}

export interface Bed {
  id: string
  patientName: string
  status: "sleeping" | "awake" | "away"
  lastToilet: Date
  vitalSigns: VitalSign[]
}

export interface Room {
  roomNumber: string
  beds: Bed[]
}

export interface RobotStatus {
  id: string
  name: string
  status: "idle" | "busy" | "charging" | "error"
  location: string
  currentTask?: string
  batteryLevel: number
}

export interface Alert {
  id: string
  type: "vital" | "robot"
  priority: "high" | "medium" | "low"
  message: string
  createdAt: Date
  status: "pending" | "processing" | "resolved"
  timeoutMinutes: number
}
