import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/empty-state";
import ErrorNote from "@/components/shared/error-note";
import ErrorPanel from "@/components/shared/error-panel";
import EmptyRegister from "@/components/bookings/empty-register";
import { isRecordId } from "@/lib/helpers";

function BookingUnavailable({ bookingId, error }: BookingUnavailableProps) {
  if (error) {
    return (
      <ErrorPanel>
        <ErrorNote title="The register is out of reach" message={error.message} drawing={<EmptyRegister clouded className="w-full max-w-64" />} />
      </ErrorPanel>
    );
  }

  return (
    <EmptyState
      drawing={<EmptyRegister className="w-full max-w-56" />}
      title={isRecordId(Number(bookingId)) ? `No booking #${bookingId}` : "That isn't a booking number"}
      action={<Button render={<Link to="/bookings" />} nativeButton={false}>All bookings</Button>}
    >
      It may have been deleted, or the link is wrong. Search the register to find the stay.
    </EmptyState>
  );
}

export default BookingUnavailable;
