import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorNote from "@/components/shared/error-note";
import CardEmptyState from "@/components/shared/card-empty-state";
import WorldMap from "@/components/dashboard/world-map";
import MapLegend from "@/components/dashboard/map-legend";
import CountryRow from "@/components/dashboard/country-row";
import EmptyGlobe from "@/components/dashboard/empty-globe";
import { guestCountries } from "@/lib/helpers";
import { COUNTRIES_CARD, COUNTRY_LIST_LIMIT } from "@/lib/constants";

function GuestCountries({ stays, error }: GuestCountriesProps) {
  const countries = guestCountries(stays);
  const shown = countries.slice(0, COUNTRY_LIST_LIMIT);
  const hidden = countries.length - shown.length;

  return (
    <Card className={`flex flex-col ${COUNTRIES_CARD}`}>
      <CardHeader className="border-b border-border">
        <CardTitle>Guest countries</CardTitle>
        <CardDescription>Where this period's guests travelled from.</CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-96 flex-col">
        {error ? (
          <ErrorNote title="The map is in the fog" message="Guest countries could not be loaded. Try again shortly." drawing={<EmptyGlobe clouded className="w-full max-w-72" />} />
        ) : countries.length === 0 ? (
          <CardEmptyState drawing={<EmptyGlobe className="w-full max-w-72" />} title="No travellers yet" message="No stays in this period." />
        ) : (
          <div className="grid gap-10 @min-[56rem]:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] @min-[56rem]:items-center">
            <div className="space-y-5">
              <WorldMap countries={countries} />
              <MapLegend />
            </div>
            <div className="min-w-0">
              <div className="grid grid-cols-[1.5rem_minmax(0,1fr)_3rem_3rem] gap-3 border-b border-border pb-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                <span />
                <span>Country</span>
                <span className="col-span-2 text-right">Stays</span>
              </div>
              <ul className="divide-y divide-border">
                {shown.map((country) => <CountryRow key={country.code ?? country.name} country={country} />)}
              </ul>
              {hidden > 0 && <p className="pt-3 text-xs text-muted-foreground">+{hidden} more on the map</p>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default GuestCountries;
