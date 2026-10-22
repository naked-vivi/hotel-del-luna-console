import { LockIcon } from "@/components/icons/icons";
import { cn } from "@/lib/utils";
import { ACCESS_LOCK_LABELS, TAG_CLASS } from "@/lib/constants";

function AccessTag({ reason, className }: AccessTagProps) {
  return (
    <span className={cn(TAG_CLASS, "gap-1.5 bg-muted text-muted-foreground", className)}>
      <LockIcon aria-hidden="true" className="-mt-0.5 size-3 stroke-2" />
      {ACCESS_LOCK_LABELS[reason]}
    </span>
  );
}

export default AccessTag;
