function CabinFact({ label, children }: CabinFactProps) {
  return (
    <div className="min-w-0 space-y-2 bg-card px-6 py-5">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">{label}</dt>
      <dd className="text-[15px] text-foreground">{children}</dd>
    </div>
  );
}

export default CabinFact;
