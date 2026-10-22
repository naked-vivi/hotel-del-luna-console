import { Skeleton } from "@/components/ui/skeleton";
import BookingDataBoxSkeleton from "@/components/bookings/booking-data-box-skeleton";
import PageHeader from "@/components/shared/page-header";
import BackButton from "@/components/shared/back-button";

function CheckinBookingSkeleton({ bookingId }: BookingPageSkeletonProps) {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Arrival"
        title={`Check in booking #${bookingId}`}
        description="Confirm the details with the guest, add breakfast if they would like it, then confirm payment."
        actions={<BackButton />}
      />
      <BookingDataBoxSkeleton />
      <div aria-hidden="true" className="divide-y divide-border border border-border bg-card">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-5">
            <Skeleton className="size-4" />
            <div className="text-[15px] leading-snug"><Skeleton className="h-lh w-80 max-w-full" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckinBookingSkeleton;
