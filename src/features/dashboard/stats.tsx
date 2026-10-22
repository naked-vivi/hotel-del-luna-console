import { formatCurrency } from "@/lib/utils";
import MoonPhase from "@/shared/moon-phase";
import { moonPhaseName } from "@/lib/moon-phase-name";
import Stat from "./stat";
import { DeskBell, Folio, LuggageTrolley } from "./stat-drawings";

type StatsProps = {
    isLoading?: boolean;
    /** Which sources failed to load. Figures that depend on them show N/A. */
    errors?: { bookings?: boolean; stays?: boolean; cabins?: boolean };
    bookings: { totalPrice: number | null }[];
    confirmedStays: readonly { numNights: number | null }[];
    numDays: number;
    cabinCount: number;
};

/** Four figures in one strip, divided by hairlines. Occupancy is drawn as the moon. */
function Stats({ isLoading = false, errors = {}, bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
    const occupancyError = Boolean(errors.stays || errors.cabins);
    const sales = bookings.reduce((total, booking) => total + (booking.totalPrice ?? 0), 0);

    const occupiedNights = confirmedStays.reduce((total, stay) => total + (stay.numNights ?? 0), 0);
    const availableNights = numDays * cabinCount;
    const occupancyRate = !isLoading && availableNights > 0 ? Math.min(1, occupiedNights / availableNights) : 0;

    return (
        <section
            aria-label="Key figures"
            aria-busy={isLoading}
            className="col-span-full grid grid-cols-1 gap-px border border-border bg-border @min-[36rem]:grid-cols-2 @min-[64rem]:grid-cols-4"
        >
            <Stat isLoading={isLoading} isError={errors.bookings} title="Bookings" value={bookings.length} caption={`In the last ${numDays} days`} icon={<DeskBell className="size-12" />} />
            <Stat isLoading={isLoading} isError={errors.bookings} title="Revenue" value={formatCurrency(sales)} caption="Rooms and extras" icon={<Folio className="size-12" />} />
            <Stat isLoading={isLoading} isError={errors.stays} title="Check-ins" value={confirmedStays.length} caption="Guests who arrived" icon={<LuggageTrolley className="size-12" />} />
            <Stat
                isLoading={isLoading}
                isError={occupancyError}
                title="Occupancy"
                value={`${Math.round(occupancyRate * 100)}%`}
                caption="Rooms filled, shown as the moon"
                icon={
                    <span title={isLoading || occupancyError ? undefined : moonPhaseName(occupancyRate)} className="flex">
                        <MoonPhase fraction={occupancyRate} className="size-12 text-gold" />
                    </span>
                }
            />
        </section>
    );
}

export default Stats;
