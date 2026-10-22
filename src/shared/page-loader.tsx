import LunarCycle from "./lunar-cycle";

/** Full-screen loader for the first visit: the moon cycling in the middle of the page. */
function PageLoader({ message = "Preparing the house" }: { message?: string }) {
  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-50 grid place-items-center bg-background">
      <div className="flex flex-col items-center gap-10">
        <LunarCycle className="size-20" />
        <div className="space-y-3 text-center">
          <p className="pl-[0.62em] text-[11px] font-normal uppercase tracking-[0.62em] text-foreground">Hotel del Luna</p>
          <p className="pl-[0.32em] text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default PageLoader;
