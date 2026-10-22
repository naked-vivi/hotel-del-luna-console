import { toast } from "sonner";
import { updateBooking } from "@/services/api-bookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
        mutationFn: ({ bookingId, breakfast }: CheckinArgs) =>
            updateBooking(bookingId, { ...breakfast, status: "checked-in", isPaid: true }),
        onSuccess: (updatedBooking) => {
            navigate(`/bookings/${updatedBooking.id}`, { replace: true });
            queryClient.invalidateQueries({ queryKey: ["booking"] });
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
            queryClient.invalidateQueries({ queryKey: ["today-activity"] });
            queryClient.invalidateQueries({ queryKey: ["stays"] });
            toast.success(`Booking #${updatedBooking.id} checked in`, { description: "Payment confirmed. Welcome them to the house." });
        },
        onError: (err: Error) => {
            toast.error("Couldn't check in", { description: err.message });
        },
    });
    return { checkIn, isCheckingIn };
}
