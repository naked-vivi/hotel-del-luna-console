import { useQuery } from "@tanstack/react-query";
import { getGuests } from "@/services/api-guests";

export function useGuestOptions() {
  const { data: guests = [], isPending, error } = useQuery({
    queryKey: ["guests", "options"],
    queryFn: getGuests,
  });

  return { guests, isPending, error };
}
