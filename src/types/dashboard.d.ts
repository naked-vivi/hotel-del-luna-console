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
