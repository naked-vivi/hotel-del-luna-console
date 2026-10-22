import { Skeleton } from "@/components/ui/skeleton";

/** Loading version of the reservation card. Same sections and line heights as BookingDataBox. */
function BookingDataBoxSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading booking" className="border border-border bg-card">
      <div className="grid gap-8 border-b border-border p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <p className="text-[10px]"><Skeleton className="h-lh w-16" /></p>
            <p className="text-5xl leading-none"><Skeleton className="h-lh w-36" /></p>
            <p className="text-[13px]"><Skeleton className="h-lh w-28" /></p>
          </div>
        ))}
      </div>
      <div className="space-y-5 p-6 sm:p-8">
        <p className="text-2xl"><Skeleton className="h-lh w-56" /></p>
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-2 bg-card p-5">
              <p className="text-[10px]"><Skeleton className="h-lh w-16" /></p>
              <p className="text-[15px]"><Skeleton className="h-lh w-32" /></p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6 border-t border-border p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div className="space-y-2">
          <p className="text-[10px]"><Skeleton className="h-lh w-12" /></p>
          <p className="text-5xl leading-none"><Skeleton className="h-lh w-44" /></p>
        </div>
        <Skeleton className="h-7 w-28" />
      </div>
      <div className="border-t border-border px-6 py-4 sm:px-8">
        <p className="text-xs"><Skeleton className="ml-auto h-lh w-56" /></p>
      </div>
    </section>
  );
}

export default BookingDataBoxSkeleton;
