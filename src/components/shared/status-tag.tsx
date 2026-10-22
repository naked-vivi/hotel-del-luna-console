import { cn } from "@/lib/utils";
import { STATUS_FALLBACK_STYLE, STATUS_STYLES, TAG_CLASS } from "@/lib/constants";

function StatusTag({ status, className }: StatusTagProps) {
  return (
    <span className={cn(TAG_CLASS, STATUS_STYLES[status] ?? STATUS_FALLBACK_STYLE, className)}>
      {status ? status.replaceAll("-", " ") : "Unknown"}
    </span>
  );
}

export default StatusTag;
