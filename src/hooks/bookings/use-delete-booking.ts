import { toast } from "sonner";
import { deleteBooking as deleteBookingApi } from "@/services/api-bookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const { mutate: deleteBooking, isPending: isDeletingBooking, error: deleteErr } = useMutation({
        mutationFn: (bookingId: number) => deleteBookingApi(bookingId),
        onSuccess: (_, bookingId) => {
            toast.success(`Booking #${bookingId} deleted`);
            return queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: (err) => {
            toast.error("Couldn't delete the booking", { description: err.message });
        }
    });
    return { deleteBooking, isDeletingBooking, deleteErr };
}
