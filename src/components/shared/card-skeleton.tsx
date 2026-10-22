import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function CardSkeleton({ className, label = "Loading" }: CardSkeletonProps) {
  return <Skeleton role="status" aria-busy="true" aria-label={label} className={cn(className)} />;
}

export default CardSkeleton;
