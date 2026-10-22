import { Skeleton } from "@/components/ui/skeleton";

function CabinDetailsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading the cabin" className="flex flex-col gap-8">
      <div className="space-y-4 border-b border-border pb-8">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-12 w-56" />
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Skeleton className="aspect-4/3 w-full" />
        <Skeleton className="h-full min-h-96" />
      </div>
      <Skeleton className="h-48" />
    </div>
  );
}

export default CabinDetailsSkeleton;
