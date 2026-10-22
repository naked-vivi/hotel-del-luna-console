import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  unconfirmed: "bg-status-pending-bg text-status-pending",
  "checked-in": "bg-status-success-bg text-status-success",
  "checked-out": "bg-status-neutral-bg text-status-neutral",
};

/** Booking status as a small square tag, like a luggage label. */
function StatusTag({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-current/25 px-2.5 pt-1 pb-0.5 text-[10px] font-semibold whitespace-nowrap uppercase tracking-[0.22em]",
        styles[status] ?? "bg-muted text-muted-foreground",
        className,
      )}
    >
      {status ? status.replaceAll("-", " ") : "Unknown"}
    </span>
  );
}

export default StatusTag;
