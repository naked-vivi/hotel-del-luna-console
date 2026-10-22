import RequiredMark from "@/components/shared/required-mark";

function FormSection({ eyebrow, title, required = false, description, children }: FormSectionProps) {
  return (
    <section className="border border-border bg-card">
      <header className="space-y-2 border-b border-border px-6 py-5 sm:px-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
        <h2 className="text-xl font-extralight">{title}{required && <RequiredMark />}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </header>
      <div className="p-6 sm:px-8">{children}</div>
    </section>
  );
}

export default FormSection;
