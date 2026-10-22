function HouseRule({ icon, label, children }: HouseRuleProps) {
  return (
    <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-4 gap-y-1 py-4">
      <span aria-hidden="true" className="row-span-2 pt-0.5 text-muted-foreground [&>svg]:size-5">{icon}</span>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{label}</dt>
      <dd className="text-[15px] font-light">{children}</dd>
    </div>
  );
}

export default HouseRule;
