type BookingsFilter = {
  field: string;
  value: string;
};

type BookingsSort = {
  field: string;
  direction: string;
};

type GetBookingsArgs = {
  filter: BookingsFilter | null;
  sortBy: BookingsSort | null;
  page: number;
  bookingId: number | null;
};

type BookingsInRangeArgs = {
  from: string;
  to: string;
  status: string | null;
};

type BookingGuest = {
  fullName: string;
  email: string;
  nationality?: string | null;
  countryFlag?: string | null;
  nationalID?: string | null;
};

type BookingDetails = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number | null;
  totalPrice: number;
  hasBreakfast: boolean;
  observations?: string | null;
  isPaid: boolean;
  status: string;
  cabinId?: number;
  guestId?: number;
  source?: "front-desk" | "website";
  guests: BookingGuest | null;
  cabins: { name: string } | null;
  cabinName?: string;
  guestName?: string;
  guestEmail?: string;
};

type ChartBooking = {
  id: number;
  startDate: string;
  endDate: string;
  numNights: number;
  status: string;
  cabinId: number;
  numGuests: number;
  totalPrice: number;
  isPaid: boolean;
  guests: { fullName: string; email: string } | null;
};

type BookingUpdate = Partial<Pick<BookingDetails, "status" | "isPaid" | "hasBreakfast" | "extrasPrice" | "totalPrice">>;

type GuestStay = {
  id: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  status: string;
  cabins?: { name: string } | null;
};

type GuestSummary = {
  id: number;
  fullName: string;
  email: string;
  nationality: string | null;
  countryFlag: string | null;
  nationalID: string | null;
  userId: string | null;
  created_at: string;
  bookings: GuestStay[];
};

type GuestStats = {
  stays: number;
  totalSpent: number;
  lastStay: string | null;
  isReturning: boolean;
};

type GuestRowProps = {
  guest: GuestSummary;
  isExpanded: boolean;
  onToggle: (id: number) => void;
};

type GuestHistoryProps = { guest: GuestSummary };

type GuestStayRowProps = { stay: GuestStay };

type GuestTableSkeletonProps = { rows?: number };

type SourceTagProps = { source?: string | null };

type GuestOption = {
  id: number;
  fullName: string;
  email: string;
  nationality: string | null;
  countryFlag: string | null;
};

type BookedRange = {
  start_date: string;
  end_date: string;
};

type BookingRules = {
  minNights: number;
  maxNights: number;
  maxGuests: number;
  booked: BookedRange[];
};

type BookingFormValues = import("zod").infer<ReturnType<typeof import("@/lib/schemas").createBookingSchema>>;

type BookingRow = {
  cabinId: number;
  guestId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string | null;
};

type BookingPrice = {
  nights: number;
  nightlyRate: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
};

type SaveBookingArgs = {
  values: BookingFormValues;
  id?: number;
  cabin: Cabin;
  breakfastPrice: number;
};

type GuestMode = "existing" | "new";

type BookingFormProps = { booking?: BookingDetails };

type GuestComboboxProps = {
  guests: GuestOption[];
  value?: number;
  onChange: (id: number) => void;
  invalid?: boolean;
  isLoading?: boolean;
  describedBy?: string;
};

type StayDatesPickerProps = {
  startDate: string;
  endDate: string;
  booked: BookedRange[];
  minNights: number;
  maxNights: number;
  allowPast: boolean;
  invalid?: boolean;
  describedBy?: string;
  onChange: (startDate: string, endDate: string) => void;
};

type GuestPickerProps = { control: import("react-hook-form").Control<BookingFormValues> };

type BookingPriceSummaryProps = {
  price: BookingPrice;
  cabin?: Cabin;
  numGuests: number;
  hasBreakfast: boolean;
  breakfastPrice: number;
};

type BookedNightsProps = { ranges: BookedRange[]; isLoading: boolean };

type BookingDataBoxProps = { booking: BookingDetails };

type BookingRowProps = Omit<BookingActionsProps, "id" | "status"> & { booking: BookingDetails };

type StayDateProps = {
  label: string;
  date: string;
  note?: string;
  time?: string;
};

type BookingActionsProps = {
  id: number;
  status: string;
  busy: boolean;
  onCheckout: (id: number) => void;
  onDelete: (id: number) => void;
};

type BookingTableSkeletonProps = { rows?: number };

type BookingView = "list" | "chart";

type BookingTableOperationsProps = { view?: BookingView };

type WindowPosition = "earlier" | "today" | "later";

type ChartWindowProps = {
  start: Date;
  today: Date;
};

type RoomChartNavProps = {
  start: Date;
  today: Date;
  onGoTo: (date: Date) => void;
};

type RoomChartNavButtonProps = {
  isActive: boolean;
  onClick: () => void;
  label?: string;
  children: ReactNode;
};

type RoomChartRowProps = ChartWindowProps & {
  cabin: Cabin;
  bookings: ChartBooking[];
};

type StayBarProps = {
  booking: ChartBooking;
  start: Date;
};

type StayDetailsProps = {
  booking: ChartBooking;
  from: Date;
  to: Date;
};

type StayDetailRowProps = {
  label: string;
  value: string;
};

type TodayActivityItem = {
  id: number;
  status: string;
  numNights: number;
  guests: {
    fullName: string;
    nationality: string | null;
    countryFlag: string | null;
  } | null;
};

type TodayItemProps = { activity: TodayActivityItem };

type TodayActivityProps = { isLoading?: boolean };

type CheckinCheckboxProps = {
  id: string;
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: ReactNode;
};

type BookingPageSkeletonProps = { bookingId?: string };

type BookingUnavailableProps = { bookingId: string; error: Error | null };

type CheckedOutNoticeProps = { bookingId: number };

type CheckoutButtonProps = { bookingId: number };

type CheckinArgs = {
  bookingId: number;
  breakfast?: {
    hasBreakfast: boolean;
    extrasPrice: number;
    totalPrice: number;
  };
};
