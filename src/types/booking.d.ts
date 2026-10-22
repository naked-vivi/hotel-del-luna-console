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

type BookingDataBoxProps = { booking: BookingDetails };

type BookingRowProps = Omit<BookingActionsProps, "id" | "status"> & { booking: BookingDetails };

type StayDateProps = {
  label: string;
  date: string;
  note?: string;
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

type CheckoutButtonProps = { bookingId: number };

type CheckinArgs = {
  bookingId: number;
  breakfast?: {
    hasBreakfast: boolean;
    extrasPrice: number;
    totalPrice: number;
  };
};
