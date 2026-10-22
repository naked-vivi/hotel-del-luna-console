import HalfMoon from "@/components/shared/half-moon";
import HouseRule from "@/components/settings/house-rule";
import { BedIcon, CalendarIcon, DoorOutIcon, KeyIcon, UsersIcon } from "@/components/icons/icons";
import { CoffeeMachineIcon } from "@/components/icons/amenity-icons";
import { breakfastRule, guestLimitRule, lastSavedLabel, stayLengthRule, websiteBookingRule } from "@/lib/helpers";
import { cn } from "@/lib/utils";

function HouseRulesPreview({ values, isDirty, updatedAt }: HouseRulesPreviewProps) {
  return (
    <aside aria-labelledby="house-rules-title" className="border border-border bg-card xl:sticky xl:top-28">
      <div className="space-y-3 border-b border-border px-6 py-7 text-center">
        <HalfMoon className="mx-auto size-6 text-gold" />
        <p className="pl-[0.32em] text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">Hotel del Luna</p>
        <h2 id="house-rules-title" className="text-2xl font-extralight">House rules</h2>
        <p className="text-xs text-muted-foreground">What guests see when they book</p>
      </div>
      <dl className="divide-y divide-border px-6">
        <HouseRule icon={<BedIcon />} label="Stays">{stayLengthRule(values.minBookingLength, values.maxBookingLength)}</HouseRule>
        <HouseRule icon={<UsersIcon />} label="Guests">{guestLimitRule(values.maxGuestsPerBooking)}</HouseRule>
        <HouseRule icon={<KeyIcon />} label="Check-in">From {values.checkInTime}</HouseRule>
        <HouseRule icon={<DoorOutIcon />} label="Check-out">By {values.checkOutTime}</HouseRule>
        <HouseRule icon={<CoffeeMachineIcon />} label="Breakfast">{breakfastRule(values.breakfastPrice)}</HouseRule>
        <HouseRule icon={<CalendarIcon />} label="Online booking">{websiteBookingRule(values.acceptOnlineBookings, values.bookingWindowDays)}</HouseRule>
      </dl>
      <p role="status" className={cn("flex items-center gap-2 border-t border-border px-6 py-4 text-xs", isDirty ? "text-foreground" : "text-muted-foreground")}>
        {isDirty && <span aria-hidden="true" className="size-1.5 bg-gold" />}
        {isDirty ? "Showing changes you haven't saved yet" : lastSavedLabel(updatedAt)}
      </p>
    </aside>
  );
}

export default HouseRulesPreview;
