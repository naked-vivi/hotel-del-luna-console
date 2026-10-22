type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
};

type CabinFormValues = import("zod").infer<typeof import("@/lib/schemas").cabinSchema>;

type CabinToEdit = CabinFormValues & { id?: number };

type CreateCabinFormProps = {
  cabinToEdit?: CabinToEdit;
  onClose?: () => void;
};

type CabinFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cabinToEdit?: CabinToEdit | null;
};

type CreateCabinOptions = {
  editId?: number;
  onSuccessCallback?: () => void;
};

type CabinFieldProps = {
  id: string;
  label: string;
  hint: string;
  error?: import("react-hook-form").FieldError;
  children: ReactNode;
};

type CabinView = "gallery" | "list";

type CabinNumberProps = ClassNameProps & { name: string };

type CabinActionHandlers = {
  isCreating: boolean;
  onDuplicate: (cabin: Cabin) => void;
  onEdit: (cabin: Cabin) => void;
  onDelete: (cabin: Cabin) => void;
};

type CabinActionsProps = CabinActionHandlers & {
  cabin: Cabin;
  triggerClassName?: string;
};

type CabinCardProps = {
  cabin: Cabin;
  actions: CabinActionHandlers;
};

type CabinCollectionProps = {
  cabins: Cabin[];
  actions: CabinActionHandlers;
};

type CabinGallerySkeletonProps = { cards?: number };

type CabinTableSkeletonProps = { rows?: number };
