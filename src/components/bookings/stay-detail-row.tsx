function StayDetailRow({ label, value }: StayDetailRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-[9.5px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">{label}</dt>
      <dd className="text-[13px] tabular-nums">{value}</dd>
    </div>
  );
}

export default StayDetailRow;
