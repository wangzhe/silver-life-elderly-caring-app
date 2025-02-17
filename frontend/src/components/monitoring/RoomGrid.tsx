import { FC } from "react"
import { RoomCard } from "./RoomCard"
import type { Room } from "../../types"
import { areas } from "../../constants"

interface RoomGridProps {
  rooms: Room[]
  onRoomClick: (roomNumber: string) => void
}

export const RoomGrid: FC<RoomGridProps> = ({ rooms, onRoomClick }) => {
  return (
    <div className="space-y-8 p-4">
      {/* Group rooms by area */}
      {[1, 2, 3].map(areaNum => {
        const areaRooms = rooms.filter(room => parseInt(room.roomNumber[1]) === areaNum);
        console.log(`Area ${areaNum} rooms:`, areaRooms.map(r => r.roomNumber).join(', '));
        
        return (
          <div key={areaNum}>
            <div className="mb-4 text-lg font-medium text-gray-600 border-b pb-2">
              {areas[areaNum - 1]}区 ({areaRooms.length}间房)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {areaRooms.map((room) => (
                <RoomCard
                  key={room.roomNumber}
                  roomNumber={room.roomNumber}
                  beds={room.beds}
                  onClick={() => onRoomClick(room.roomNumber)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  )
}
