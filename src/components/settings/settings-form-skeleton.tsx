import { Skeleton } from "@/components/ui/skeleton";
import { SETTINGS_FIELDS } from "@/lib/constants";

function SettingsFormSkeleton() {
  return (
    <div className="max-w-4xl" aria-busy="true" aria-label="Loading settings">
      <div className="border border-border bg-card">
        <div className="divide-y divide-border">
          {SETTINGS_FIELDS.map(({ name }) => (
            <div key={name} className="grid gap-3 px-6 py-7 sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-start sm:gap-10 sm:px-10">
              <div className="space-y-2">
                <div className="pt-0.5 text-[10.5px]"><Skeleton className="h-lh w-40" /></div>
                <div className="text-sm"><Skeleton className="h-lh w-64 max-w-full" /></div>
              </div>
              <Skeleton className="h-12" />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-end gap-3 border-t border-border px-6 py-6 sm:px-10">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}

export default SettingsFormSkeleton;
