import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "@/services/api-bookings";
import { isRecordId } from "@/lib/helpers";

export default function useBooking() {
  const { bookingId = "" } = useParams();
  const id = Number(bookingId);
  const isValidId = isRecordId(id);

  const { data: booking, isPending, error } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(id),
    enabled: isValidId,
    retry: false,
  });

  return { booking: booking ?? null, bookingId, isPending: isValidId && isPending, error };
}
