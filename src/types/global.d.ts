type ReactNode = import("react").ReactNode;

type IconProps = import("react").SVGProps<SVGSVGElement>;
type IconComponent = import("react").ComponentType<IconProps>;

type ClassNameProps = { className?: string };
type ChildrenProps = { children: ReactNode };
type IconShellProps = IconProps & ChildrenProps;
type LabelledProps = { label: string; children: ReactNode };

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

type LockedNavItemProps = {
  label: string;
  icon: IconComponent;
};

type Country = {
  code: string;
  name: string;
  numeric: string;
};

type SearchType = "page" | "booking" | "cabin" | "guest" | "staff";

type SearchResult = {
  id: string;
  type: SearchType;
  title: string;
  subtitle: string;
  to: string;
  flag?: string | null;
};

type SearchBookingRow = {
  id: number;
  startDate: string;
  endDate: string;
  guests: { fullName: string; countryFlag: string | null } | null;
  cabins: { name: string } | null;
};

type SearchTypeMeta = {
  value: SearchType;
  label: string;
  icon: IconComponent;
  permission?: Permission;
};

type SearchPage = {
  label: string;
  to: string;
  keywords: string;
  permission?: Permission;
};

type SearchResultItemProps = {
  result: SearchResult;
  onSelect: (result: SearchResult) => void;
};

type SearchEmptyNoteProps = {
  title: string;
  message: string;
  drawing?: ReactNode;
};

type SearchPrompt = { title: string; message: string };

type SearchTypeChipsProps = {
  value: SearchType | "all";
  onChange: (value: SearchType | "all") => void;
};

type FormSectionProps = {
  eyebrow: string;
  title: string;
  required?: boolean;
  description?: string;
  children: ReactNode;
};

type SearchInputProps = ClassNameProps & {
  param: string;
  label: string;
  placeholder: string;
  inputMode?: "text" | "numeric" | "search";
};

type PermissionRouteProps = { permission: Permission };

type NavLinkItem = {
  to: string;
  label: string;
  icon: IconComponent;
  permission?: Permission;
};

type FilterTabOption = {
  value: string;
  label: string;
  icon?: IconComponent;
};

type FilterProps = {
  filterField: string;
  options: FilterTabOption[];
};

type SortSelectOption = {
  value: string;
  label: string;
};

type SortByProps = {
  options: SortSelectOption[];
};

type PaginationPageProps = {
  count: number;
  page: number;
  pageSize: number;
};

type ConfirmDeleteProps = {
  resourceName: string;
  itemName: string;
  onConfirm: () => void;
  isDeleting: boolean;
  isOpen: boolean;
  onClose: () => void;
};

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  toolbar?: ReactNode;
  meta?: ReactNode;
};

type LogoProps = ClassNameProps & {
  tone?: "auto" | "night";
  size?: "sm" | "md" | "lg";
};

type EmptyStateProps = {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  drawing?: ReactNode;
};

type ErrorNoteProps = {
  title?: string;
  message?: string;
  drawing?: ReactNode;
};

type DrawingProps = ClassNameProps & { clouded?: boolean };

type ErrorPanelProps = { children: ReactNode };

type FogCloudProps = {
  x: number;
  y: number;
  scale?: number;
};

type CardEmptyStateProps = {
  drawing: ReactNode;
  title: string;
  message: string;
};

type CardSkeletonProps = ClassNameProps & { label?: string };

type StatusTagProps = ClassNameProps & { status: string };

type MoonPhaseProps = ClassNameProps & {
  fraction: number;
  waning?: boolean;
};

type MoonLight = "full" | "partial" | "none";

type MoonLightProps = ClassNameProps & {
  cx: number;
  cy: number;
  r: number;
  fraction: number;
  fill?: string;
};

type DialTickRadii = {
  long: number;
  short: number;
  outer: number;
};

type LunarPhase = {
  illumination: number;
  waxing: boolean;
  name: string;
};

type PageLoaderProps = { message?: string };

type HeaderDividerProps = { className: string };

type FrontDeskFigureProps = {
  value: number;
  label: string;
  isLoading: boolean;
};

type PasswordInputProps = Omit<import("react").ComponentProps<"input">, "type">;

type DashboardBoxProps = import("react").ComponentProps<"div">;

type SampleDataScope = "all" | "bookings";

type SampleDataButtonProps = {
  icon: IconComponent;
  label: string;
  disabled: boolean;
  onClick: () => void;
};

type PaginationLinkOptions = {
  href?: string;
  "aria-disabled"?: boolean;
  tabIndex?: number;
  className?: string;
  onClick: (event: import("react").MouseEvent<HTMLAnchorElement>) => void;
};
