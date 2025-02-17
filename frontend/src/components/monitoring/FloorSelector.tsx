import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "../../components/ui/button"
import { FC } from "react"

interface FloorSelectorProps {
  currentFloor: number
  totalFloors: number
  onFloorChange: (floor: number) => void
}

export const FloorSelector: FC<FloorSelectorProps> = ({ currentFloor, totalFloors, onFloorChange }) => {
  return (
    <div className="fixed top-0 right-4 bg-white rounded-b-lg shadow-md flex flex-col items-center p-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFloorChange(Math.min(currentFloor + 1, totalFloors))}
        disabled={currentFloor === totalFloors}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      <span className="my-1 font-medium">{currentFloor}F</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFloorChange(Math.max(currentFloor - 1, 1))}
        disabled={currentFloor === 1}
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  )
}
