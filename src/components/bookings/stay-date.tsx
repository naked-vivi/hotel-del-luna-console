import { format } from "date-fns";

function StayDate({ label, date, note }: StayDateProps) {
  const d = new Date(date);
  return (
    <div className="min-w-0 space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">{label}</p>
      <p className="flex items-baseline gap-3">
        <span className="text-5xl leading-none font-extralight tabular-nums">{format(d, "dd")}</span>
        <span className="text-sm uppercase tracking-[0.18em] text-foreground">{format(d, "MMM yyyy")}</span>
      </p>
      <p className="text-[13px] text-muted-foreground">
        {format(d, "EEEE")}
        {note ? ` · ${note}` : ""}
      </p>
    </div>
  );
}

export default StayDate;
