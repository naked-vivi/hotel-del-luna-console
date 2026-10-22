type StaffRole = "admin" | "staff";

type UserAccount = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  emailConfirmed: boolean;
  avatar?: string;
  role?: StaffRole;
  lastSignInAt?: string | null;
};

type UserAccountsPage = {
  users: UserAccount[];
  count: number;
  page: number;
};

type UpdateUserAccountArgs = {
  id: string;
  fullName: string;
  role: StaffRole;
};

type EditStaffValues = {
  fullName: string;
  role: StaffRole;
};

type StaffRoleOption = {
  value: StaffRole;
  label: string;
  note: string;
};

type StaffRolePickerProps = {
  value: StaffRole;
  onChange: (role: StaffRole) => void;
};

type EditStaffFormProps = {
  account: UserAccount;
  isSelf: boolean;
  onClose: () => void;
};

type EditStaffModalProps = Omit<EditStaffFormProps, "account"> & {
  account: UserAccount | null;
};

type StaffDetailsModalProps = EditStaffModalProps & {
  onEdit: (account: UserAccount) => void;
};

type StaffAvatarProps = ClassNameProps & {
  account: UserAccount;
  isSelf?: boolean;
};

type RoleTagProps = { role?: StaffRole };

type EmailStatusTagProps = { confirmed: boolean };

type StaffActionsProps = {
  account: UserAccount;
  isSelf: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

type StaffRowProps = Omit<StaffActionsProps, "onView" | "onEdit" | "onDelete"> & {
  onView: (account: UserAccount) => void;
  onEdit: (account: UserAccount) => void;
  onDelete: (account: UserAccount) => void;
};

type StaffTableProps = { onAdd: () => void };

type StaffTableSkeletonProps = { rows?: number };

type AddStaffModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
