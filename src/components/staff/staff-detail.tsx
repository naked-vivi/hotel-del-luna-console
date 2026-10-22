function StaffDetail({ label, children }: LabelledProps) {
  return (
    <div className="min-w-0 space-y-2 bg-card p-4">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">{label}</dt>
      <dd className="wrap-break-word text-[15px] text-foreground">{children}</dd>
    </div>
  );
}

export default StaffDetail;
