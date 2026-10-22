import { Skeleton } from "@/components/ui/skeleton";

function ProfileCardSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading your profile" className="border border-border bg-card">
      <div className="flex items-center gap-6 p-6 sm:p-8">
        <Skeleton className="size-24 shrink-0 rounded-full" />
        <div className="space-y-3"><Skeleton className="h-10 w-64" /><Skeleton className="h-4 w-48" /></div>
      </div>
      <div className="grid grid-cols-1 gap-px border-t border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => <div key={i} className="bg-card px-6 py-5"><Skeleton className="h-11 w-full" /></div>)}
      </div>
    </section>
  );
}

export default ProfileCardSkeleton;
