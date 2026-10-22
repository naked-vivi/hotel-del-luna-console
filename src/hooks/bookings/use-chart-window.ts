import { useSearchParams } from "react-router-dom";
import { isSameDay, isValid, parseISO, startOfDay } from "date-fns";
import { toISODate } from "@/lib/helpers";

export function useChartWindow() {
  const [searchParams, setSearchParams] = useSearchParams();
  const today = startOfDay(new Date());
  const param = searchParams.get("from");
  const parsed = param ? parseISO(param) : null;
  const start = parsed && isValid(parsed) ? startOfDay(parsed) : today;

  function goTo(date: Date) {
    const next = new URLSearchParams(searchParams);
    if (isSameDay(date, today)) next.delete("from");
    else next.set("from", toISODate(date));
    setSearchParams(next);
  }

  return { start, today, goTo, status: searchParams.get("status") };
}
