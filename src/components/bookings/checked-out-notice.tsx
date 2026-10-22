import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/empty-state";
import EmptyRegister from "@/components/bookings/empty-register";

function CheckedOutNotice({ bookingId }: CheckedOutNoticeProps) {
  return (
    <EmptyState
      drawing={<EmptyRegister className="w-full max-w-56" />}
      title="This stay is checked out"
      action={<Button variant="outline" render={<Link to={`/bookings/${bookingId}`} />} nativeButton={false}>View booking</Button>}
    >
      Finished stays are kept as they were, so they can't be edited.
    </EmptyState>
  );
}

export default CheckedOutNotice;
