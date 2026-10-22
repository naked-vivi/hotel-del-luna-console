type DurationGroup = {
  key: string;
  label: string;
  max: number;
  color: string;
};

type DurationChartProps = {
  confirmedStays: readonly { numNights: number | null }[];
  error?: Error | null;
};

type SalesChartProps = {
  bookings: {
    created_at: string;
    totalPrice: number | null;
    extrasPrice: number | null;
  }[];
  numDays: number;
  error?: Error | null;
};

type StatProps = {
  icon: ReactNode;
  title: string;
  value: string | number;
  caption?: string;
  isLoading?: boolean;
  isError?: boolean;
};

type StatErrors = {
  bookings?: boolean;
  stays?: boolean;
  cabins?: boolean;
};

type StatsProps = {
  isLoading?: boolean;
  errors?: StatErrors;
  bookings: { totalPrice: number | null }[];
  confirmedStays: readonly { numNights: number | null }[];
  numDays: number;
  cabinCount: number;
};

type OccupancyMoonProps = {
  fraction: number;
  showTitle: boolean;
};

type SalesTooltipRowProps = {
  value: unknown;
  name: unknown;
};

type WorldShape = {
  id: string;
  name: string;
  d: string;
};

type CountryCount = {
  code: string | null;
  numeric: string | null;
  name: string;
  flag: string | null;
  count: number;
  share: number;
};

type CountryStay = {
  guests: { nationality: string | null; countryFlag: string | null } | null;
};

type GuestCountriesProps = {
  stays: readonly CountryStay[];
  error?: Error | null;
};

type WorldMapProps = { countries: CountryCount[] };

type MapHover = {
  name: string;
  flag: string | null;
  count: number;
};

type MapPointer = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type MapTooltipProps = { hover: MapHover; pointer: MapPointer };

type CountryRowProps = { country: CountryCount };

type CabinRevenueBooking = {
  totalPrice: number | null;
  cabins: { name: string } | null;
};

type RevenueByCabinProps = {
  bookings: readonly CabinRevenueBooking[];
  cabins: readonly Pick<Cabin, "name">[];
  error?: Error | null;
};

type CabinRevenueBar = {
  name: string;
  label: string;
  revenue: number;
  share: number;
};

type CabinRevenueChartProps = {
  bars: CabinRevenueBar[];
  average: number;
};

type CabinTickProps = {
  x?: number | string;
  y?: number | string;
  payload?: { value?: string | number };
  activeName: string;
};

type CabinRevenueTooltipProps = {
  active?: boolean;
  payload?: readonly { payload?: CabinRevenueBar }[];
  average: number;
};

type RecentBooking = {
  created_at: string;
  totalPrice: number | null;
  extrasPrice: number | null;
  cabins: { name: string } | null;
};
