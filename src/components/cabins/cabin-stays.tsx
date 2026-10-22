import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorNote from "@/components/shared/error-note";
import StatusTag from "@/components/shared/status-tag";
import CabinStayRow from "@/components/cabins/cabin-stay-row";
import CabinStayCalendar from "@/components/cabins/cabin-stay-calendar";
import { useCabinStays } from "@/hooks/cabins/use-cabin-stays";

function CabinStays({ cabinId }: CabinIdProps) {
  const { stays, isPending, error } = useCabinStays(cabinId);
  const [activeStayId, setActiveStayId] = useState<number | null>(null);

  return (
    <section aria-labelledby="cabin-stays-title" className="border border-border bg-card">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border px-6 py-5">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Calendar</p>
          <h2 id="cabin-stays-title" className="text-xl font-extralight">Upcoming stays</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusTag status="unconfirmed" />
          <StatusTag status="checked-in" />
        </div>
      </header>

      {error ? (
        <div className="px-6 py-10"><ErrorNote message={error.message} /></div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[auto_minmax(0,1fr)]">
          <div className="flex justify-center border-b border-border p-2 xl:border-r xl:border-b-0">
            {isPending ? <Skeleton className="h-80 w-150 max-w-full" /> : <CabinStayCalendar stays={stays} activeStayId={activeStayId} />}
          </div>
          <div className="min-w-0">
            {isPending ? (
              <div aria-busy="true" className="divide-y divide-border">
                {[0, 1, 2].map((i) => <div key={i} className="px-5 py-4"><Skeleton className="h-10 w-full" /></div>)}
              </div>
            ) : stays.length === 0 ? (
              <p className="px-6 py-16 text-center text-sm text-muted-foreground">No one is booked into this cabin yet. Every night is free.</p>
            ) : (
              <ul className="custom-scrollbar max-h-96 divide-y divide-border overflow-y-auto">
                {stays.map((stay) => (
                  <CabinStayRow key={stay.id} stay={stay} isActive={stay.id === activeStayId} onActivate={setActiveStayId} />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default CabinStays;
