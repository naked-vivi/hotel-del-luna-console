import { Skeleton } from "@/components/ui/skeleton";
import BookingDataBoxSkeleton from "@/components/bookings/booking-data-box-skeleton";
import PageHeader from "@/components/shared/page-header";
import BackButton from "@/components/shared/back-button";

function BookingDetailSkeleton({ bookingId }: BookingPageSkeletonProps) {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Reservation"
        title={`Booking #${bookingId}`}
        meta={<Skeleton className="h-6 w-28" />}
        actions={<BackButton />}
      />
      <BookingDataBoxSkeleton />
    </div>
  );
}

export default BookingDetailSkeleton;
