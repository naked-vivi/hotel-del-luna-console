import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type StatProps = {
  icon: ReactNode;
  title: string;
  value: string | number;
  caption?: string;
  /** While loading, only the value is replaced by a skeleton of the same height. */
  isLoading?: boolean;
  /** When the data failed to load, the value reads N/A. */
  isError?: boolean;
};

function Stat({ icon, title, value, caption, isLoading = false, isError = false }: StatProps) {
  return (
    <div className="flex min-w-0 flex-col gap-6 bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="pt-0.5 text-[10.5px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">{title}</p>
        <span aria-hidden="true" className="-my-3 flex size-12 shrink-0 items-center justify-center">
          {icon}
        </span>
      </div>
      <div className="space-y-2">
        {isLoading ? (
          <Skeleton className="h-11 w-32 max-w-full" />
        ) : isError ? (
          <p className="text-[2.75rem] leading-none font-extralight text-muted-foreground" title="Could not be loaded">N/A</p>
        ) : (
          <p className="truncate text-[2.75rem] leading-none font-extralight tabular-nums" title={String(value)}>{value}</p>
        )}
        {caption && <p className="text-[13px] text-muted-foreground">{caption}</p>}
      </div>
    </div>
  );
}

export default Stat;
