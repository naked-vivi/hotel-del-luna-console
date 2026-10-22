import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { saveBooking } from "@/services/api-bookings";

export function useSaveBooking(bookingId?: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: save, isPending: isSaving } = useMutation({
    mutationFn: (args: Omit<SaveBookingArgs, "id">) => saveBooking({ ...args, id: bookingId }),
    onSuccess: ({ id }) => {
      toast.success(bookingId ? `Booking #${id} updated` : `Booking #${id} created`, {
        description: bookingId ? "The new details are saved." : "It's waiting for check-in.",
      });
      ["bookings", "booking", "today-activity", "stays", "guests", "availability", "cabin-stays"].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] }),
      );
      navigate(`/bookings/${id}`, { replace: true });
    },
    onError: (error: Error) => {
      toast.error(bookingId ? "Couldn't update the booking" : "Couldn't create the booking", { description: error.message });
    },
  });

  return { save, isSaving };
}
