import { Skeleton } from "@/components/ui/skeleton";
import { SETTINGS_SKELETON_SECTIONS } from "@/lib/constants";

function SettingsFormSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading settings" className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
      <div className="min-w-0 space-y-6">
        {SETTINGS_SKELETON_SECTIONS.map((rows, section) => (
          <div key={section} className="border border-border bg-card">
            <div className="space-y-3 border-b border-border px-6 py-5 sm:px-8">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </div>
            <div className="divide-y divide-border p-6 sm:px-8">
              {Array.from({ length: rows }, (_, row) => (
                <div key={row} className="grid gap-3 py-6 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_16rem] sm:gap-10">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-64 max-w-full" />
                  </div>
                  <Skeleton className="h-12" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4 border border-border bg-card p-6">
        <Skeleton className="mx-auto size-6" />
        <Skeleton className="mx-auto h-6 w-40" />
        {SETTINGS_SKELETON_SECTIONS.flatMap((rows, section) => Array.from({ length: rows }, (_, row) => <Skeleton key={`${section}-${row}`} className="h-10" />)).slice(0, 6)}
      </div>
    </div>
  );
}

export default SettingsFormSkeleton;
