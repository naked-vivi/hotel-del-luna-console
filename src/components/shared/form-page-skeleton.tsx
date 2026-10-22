import { Skeleton } from "@/components/ui/skeleton";

function FormPageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading the form" className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="flex flex-col gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="border border-border bg-card">
            <div className="space-y-3 border-b border-border px-6 py-5 sm:px-8">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:px-8">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="hidden h-120 xl:block" />
    </div>
  );
}

export default FormPageSkeleton;
