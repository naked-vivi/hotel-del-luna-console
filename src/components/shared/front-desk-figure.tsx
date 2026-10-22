import { Skeleton } from "@/components/ui/skeleton";

function FrontDeskFigure({ value, label, isLoading }: FrontDeskFigureProps) {
  return (
    <span className="flex items-baseline gap-2">
      {isLoading ? (
        <span className="text-2xl leading-none"><Skeleton className="inline-block h-lh w-5 align-bottom" /></span>
      ) : (
        <span className="text-2xl leading-none font-extralight tabular-nums text-foreground">{value}</span>
      )}
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">{label}</span>
    </span>
  );
}

export default FrontDeskFigure;
