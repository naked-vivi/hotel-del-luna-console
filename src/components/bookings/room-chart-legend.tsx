import StatusTag from "@/components/shared/status-tag";

function RoomChartLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border px-5 py-4 text-xs text-muted-foreground">
      <StatusTag status="unconfirmed" />
      <StatusTag status="checked-in" />
      <StatusTag status="checked-out" />
      <span className="flex items-center gap-2"><span className="size-3 bg-gold/20 ring-1 ring-gold/40" /> Today</span>
      <span>Hover a stay for details. Select it to open the booking.</span>
    </div>
  );
}

export default RoomChartLegend;
