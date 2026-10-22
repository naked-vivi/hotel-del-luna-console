import { formatCurrency } from "@/lib/utils";
import { pluralize } from "@/lib/helpers";

function BookingPriceSummary({ price, cabin, numGuests, hasBreakfast, breakfastPrice }: BookingPriceSummaryProps) {
  return (
    <section aria-label="Price summary" className="border border-border bg-card">
      <div className="space-y-2 border-b border-border p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Price summary</p>
        <p className="text-xl font-extralight">{cabin ? `Cabin N° ${cabin.name}` : "Choose a cabin"}</p>
      </div>
      <dl className="space-y-3 border-b border-border p-6 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted-foreground">
            {price.nights > 0 ? `${pluralize(price.nights, "night")} × ${formatCurrency(price.nightlyRate)}` : "Nights"}
          </dt>
          <dd className="tabular-nums">{formatCurrency(price.cabinPrice)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted-foreground">
            {hasBreakfast ? `Breakfast · ${pluralize(Number(numGuests) || 0, "guest")} × ${formatCurrency(breakfastPrice)}` : "Breakfast"}
          </dt>
          <dd className="tabular-nums">{hasBreakfast ? formatCurrency(price.extrasPrice) : "Not added"}</dd>
        </div>
      </dl>
      <div className="flex items-baseline justify-between gap-4 p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">Total</p>
        <p className="text-4xl leading-none font-extralight tabular-nums">{formatCurrency(price.totalPrice)}</p>
      </div>
    </section>
  );
}

export default BookingPriceSummary;
