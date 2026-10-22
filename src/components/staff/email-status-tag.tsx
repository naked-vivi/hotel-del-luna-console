import { cn } from "@/lib/utils";
import { TAG_CLASS } from "@/lib/constants";

function EmailStatusTag({ confirmed }: EmailStatusTagProps) {
  return (
    <span className={cn(TAG_CLASS, confirmed ? "bg-status-success-bg text-status-success" : "bg-status-warning-bg text-status-warning")}>
      {confirmed ? "Confirmed" : "Pending"}
    </span>
  );
}

export default EmailStatusTag;
