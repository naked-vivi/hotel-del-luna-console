import { toast } from "sonner";
import { updateBooking } from "@/services/api-bookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCheckout() {

    const queryClient = useQueryClient();

    const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
        mutationFn: (bookingId: number) =>
            updateBooking(bookingId, { status: "checked-out" }),

        onSuccess: (updatedBooking) => {

            queryClient.invalidateQueries({ queryKey: ["booking"] });
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["today-activity"] });
            queryClient.invalidateQueries({ queryKey: ["stays"] });
            toast.success(`Booking #${updatedBooking.id} checked out`, { description: "The room is free for the next guest." });
        },
        onError: (err: Error) => {
            toast.error("Couldn't check out", { description: err.message });
        },
    });
    return { checkOut, isCheckingOut };
}
