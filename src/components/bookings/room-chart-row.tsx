import CabinNumber from "@/components/cabins/cabin-number";
import RoomChartRowBackground from "@/components/bookings/room-chart-row-background";
import StayBar from "@/components/bookings/stay-bar";
import { ROOM_CHART_GRID } from "@/lib/constants";

function RoomChartRow({ cabin, bookings, start, today }: RoomChartRowProps) {
  return (
    <div className="grid h-16 border-b border-border last:border-b-0 hover:bg-muted/30" style={ROOM_CHART_GRID}>
      <div className="flex items-center px-4" style={{ gridColumn: 1, gridRow: 1 }}>
        <CabinNumber name={cabin.name} className="text-xl" />
      </div>
      <RoomChartRowBackground start={start} today={today} />
      {bookings.map((booking) => <StayBar key={booking.id} booking={booking} start={start} />)}
    </div>
  );
}

export default RoomChartRow;
