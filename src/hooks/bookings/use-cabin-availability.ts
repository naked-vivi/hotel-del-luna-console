import { useQuery } from "@tanstack/react-query";
import { getCabinAvailability } from "@/services/api-bookings";

export function useCabinAvailability(cabinId: number | undefined, excludeBookingId?: number) {
  const { data: booked = [], isFetching } = useQuery({
    queryKey: ["availability", cabinId, excludeBookingId ?? null],
    queryFn: () => getCabinAvailability(cabinId, excludeBookingId),
    enabled: Boolean(cabinId),
  });

  return { booked, isLoading: Boolean(cabinId) && isFetching };
}
