import LunarCycle from "@/components/shared/lunar-cycle";

function SearchLoading() {
  return (
    <div role="status" className="flex flex-col items-center gap-5 px-6 py-12">
      <LunarCycle className="size-12" />
      <p className="pl-[0.32em] text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">Searching the house</p>
    </div>
  );
}

export default SearchLoading;
