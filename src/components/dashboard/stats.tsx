import { formatCurrency } from "@/lib/utils";
import { occupancyRate, sumBy, toPercent } from "@/lib/helpers";
import Stat from "@/components/dashboard/stat";
import DeskBell from "@/components/dashboard/desk-bell";
import Folio from "@/components/dashboard/folio";
import LuggageTrolley from "@/components/dashboard/luggage-trolley";
import OccupancyMoon from "@/components/dashboard/occupancy-moon";

function Stats({ isLoading = false, errors = {}, bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
    const occupancyError = Boolean(errors.stays || errors.cabins);
    const sales = sumBy(bookings, (booking) => booking.totalPrice);
    const occupiedNights = sumBy(confirmedStays, (stay) => stay.numNights);
    const occupancy = isLoading ? 0 : occupancyRate(occupiedNights, numDays, cabinCount);

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
                value={`${toPercent(occupancy)}%`}
                caption="Rooms filled, shown as the moon"
                icon={<OccupancyMoon fraction={occupancy} showTitle={!isLoading && !occupancyError} />}
            />
        </section>
    );
}

export default Stats;
