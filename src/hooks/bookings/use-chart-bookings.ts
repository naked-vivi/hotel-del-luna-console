import { useQuery } from "@tanstack/react-query";
import { getBookingsInRange } from "@/services/api-bookings";
import { toISODate } from "@/lib/helpers";

export function useChartBookings(start: Date, end: Date, status: string | null) {
  const { data: bookings = [], isPending, error } = useQuery({
    queryKey: ["bookings", "chart", toISODate(start), status ?? "all"],
    queryFn: () => getBookingsInRange({ from: toISODate(start), to: toISODate(end), status }),
  });

  return { bookings, isPending, error };
}
