function ProfileFact({ label, children }: LabelledProps) {
  return (
    <div className="min-w-0 space-y-2 bg-card px-6 py-5">
      <dt className="text-[10px] font-semibold tracking-[0.26em] text-muted-foreground uppercase">{label}</dt>
      <dd className="truncate text-[15px] text-foreground">{children}</dd>
    </div>
  );
}

export default ProfileFact;
