import { toPercent } from "@/lib/helpers";

function CountryRow({ country }: CountryRowProps) {
  return (
    <li className="grid grid-cols-[1.5rem_minmax(0,1fr)_3rem_3rem] items-center gap-3 py-2.5 text-sm">
      <span className="flex h-4 w-6 items-center">
        {country.flag && <img src={country.flag} alt="" className="h-4 w-6 object-cover" />}
      </span>
      <span className="truncate">{country.name}</span>
      <span className="text-right text-[15px] tabular-nums">{country.count}</span>
      <span className="text-right text-xs text-muted-foreground tabular-nums">{toPercent(country.share)}%</span>
    </li>
  );
}

export default CountryRow;
