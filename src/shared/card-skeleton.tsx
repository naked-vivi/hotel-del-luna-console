import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Loading placeholder for a whole card: one solid block. Pass the same size classes as the real card. */
function CardSkeleton({ className, label = "Loading" }: { className?: string; label?: string }) {
  return <Skeleton role="status" aria-busy="true" aria-label={label} className={cn(className)} />;
}

export default CardSkeleton;
