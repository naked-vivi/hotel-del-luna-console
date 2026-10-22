import { addDays } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/icons";
import RoomChartNavButton from "@/components/bookings/room-chart-nav-button";
import { windowPosition } from "@/lib/helpers";
import { ROOM_CHART_STEP } from "@/lib/constants";

function RoomChartNav({ start, today, onGoTo }: RoomChartNavProps) {
  const position = windowPosition(start, today);

  return (
    <div role="group" aria-label="Move through the weeks" className="inline-flex h-10 w-fit items-center border border-input bg-transparent">
      <RoomChartNavButton isActive={position === "earlier"} onClick={() => onGoTo(addDays(start, -ROOM_CHART_STEP))} label="Show an earlier week">
        <ChevronLeftIcon /> Earlier
      </RoomChartNavButton>
      <RoomChartNavButton isActive={position === "today"} onClick={() => onGoTo(today)}>
        Today
      </RoomChartNavButton>
      <RoomChartNavButton isActive={position === "later"} onClick={() => onGoTo(addDays(start, ROOM_CHART_STEP))} label="Show a later week">
        Later <ChevronRightIcon />
      </RoomChartNavButton>
    </div>
  );
}

export default RoomChartNav;
