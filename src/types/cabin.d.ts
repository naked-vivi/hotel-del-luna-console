type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
  images: string[] | null;
  amenities: string[] | null;
  bedType: string | null;
  size: number | null;
};

type CabinRow = Omit<Cabin, "id">;

type CabinPhoto = {
  id: string;
  url: string;
  file?: File;
};

type CabinFormValues = import("zod").infer<typeof import("@/lib/schemas").cabinSchema>;

type RejectedPhoto = {
  name: string;
  reason: string;
};

type AmenityOption = {
  value: string;
  label: string;
  icon: IconComponent;
};

type CabinStay = {
  id: number;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  status: string;
  guests: { fullName: string; countryFlag: string | null; nationality: string | null } | null;
};

type SaveCabinArgs = {
  values: CabinFormValues;
  id?: number;
};

type CreateCabinOptions = {
  editId?: number;
  onSuccessCallback?: (cabin: Cabin) => void;
};

type CabinFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: import("react-hook-form").FieldError;
  children: ReactNode;
};

type CabinView = "gallery" | "list";

type CabinNumberProps = ClassNameProps & { name: string };

type CabinActionHandlers = {
  isCreating: boolean;
  onDuplicate: (cabin: Cabin) => void;
  onDelete: (cabin: Cabin) => void;
};

type CabinActionsProps = CabinActionHandlers & {
  cabin: Cabin;
  triggerClassName?: string;
};

type CabinCardProps = {
  cabin: Cabin;
  actions?: CabinActionHandlers;
  isPreview?: boolean;
};

type CabinRowProps = {
  cabin: Cabin;
  actions: CabinActionHandlers;
};

type CabinCollectionProps = {
  cabins: Cabin[];
  actions: CabinActionHandlers;
};

type CabinGallerySkeletonProps = { cards?: number };

type CabinTableSkeletonProps = { rows?: number };

type CabinFormProps = { cabin?: Cabin };

type PhotoPickerProps = {
  value: CabinPhoto[];
  onChange: (photos: CabinPhoto[]) => void;
  invalid?: boolean;
  describedBy?: string;
};

type PhotoTileProps = {
  photo: CabinPhoto;
  isCover: boolean;
  index: number;
  onMakeCover: (id: string) => void;
  onRemove: (id: string) => void;
};

type AmenityPickerProps = {
  value: string[];
  onChange: (amenities: string[]) => void;
};

type CabinAmenityListProps = { amenities: string[] | null };

type CabinAmenityStripProps = { amenities: string[] | null; limit?: number };

type CabinPhotoViewerProps = {
  photos: string[];
  name: string;
};

type CabinCarouselProps = CabinPhotoViewerProps & { href?: string };

type CarouselProgressProps = {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  onComplete: () => void;
};

type CarouselArrowProps = {
  direction: "previous" | "next";
  onClick: () => void;
};

type CabinFactProps = LabelledProps;

type CabinIdProps = { cabinId: number };

type CabinUnavailableProps = { error: Error | null };

type CabinStayRowProps = {
  stay: CabinStay;
  isActive: boolean;
  onActivate: (id: number | null) => void;
};

type CabinStayCalendarProps = {
  stays: CabinStay[];
  activeStayId: number | null;
};

type CabinPhotoPlaceholderProps = ClassNameProps;
