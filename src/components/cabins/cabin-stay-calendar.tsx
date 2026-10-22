import { Calendar } from "@/components/ui/calendar";
import { stayCalendarModifiers } from "@/lib/helpers";
import { STAY_CALENDAR_CLASS_NAMES } from "@/lib/constants";

function CabinStayCalendar({ stays, activeStayId }: CabinStayCalendarProps) {
  return (
    <Calendar
      numberOfMonths={2}
      classNames={{ months: "flex flex-col gap-8 min-[66rem]:flex-row", day_button: "flex size-10 items-center justify-center pt-0.5 tabular-nums cursor-default" }}
      modifiers={stayCalendarModifiers(stays, activeStayId)}
      modifiersClassNames={STAY_CALENDAR_CLASS_NAMES}
    />
  );
}

export default CabinStayCalendar;
