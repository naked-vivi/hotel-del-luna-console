import HalfMoon from "@/components/shared/half-moon";
import { cn } from "@/lib/utils";

function CabinPhotoPlaceholder({ className }: CabinPhotoPlaceholderProps) {
  return (
    <div className={cn("flex size-full flex-col items-center justify-center gap-3 bg-muted text-muted-foreground", className)}>
      <HalfMoon className="size-8 text-gold opacity-60" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">No photo yet</span>
    </div>
  );
}

export default CabinPhotoPlaceholder;
