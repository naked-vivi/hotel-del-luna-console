type SettingsFormValues = import("zod").infer<typeof import("@/lib/schemas").settingsSchema>;

type Settings = SettingsFormValues & { id: number; updatedAt?: string | null };

type SettingsFormProps = { settings: Settings };

type SettingRowProps = {
  id: string;
  label: string;
  hint: string;
  error?: string;
  children: ReactNode;
};

type StepperInputProps = {
  id: string;
  label: string;
  unit: string;
  value: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
  min: number;
  max?: number;
  step?: number;
  invalid?: boolean;
  describedBy?: string;
  disabled?: boolean;
};

type TimeSelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  invalid?: boolean;
  describedBy?: string;
  disabled?: boolean;
};

type HouseRulesPreviewProps = {
  values: SettingsFormValues;
  isDirty: boolean;
  updatedAt?: string | null;
};

type HouseRuleProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
};

type SettingsSaveBarProps = {
  isDirty: boolean;
  isUpdating: boolean;
  onReset: () => void;
};

type SettingsNumberField = "minBookingLength" | "maxBookingLength" | "maxGuestsPerBooking" | "breakfastPrice" | "bookingWindowDays";

type SettingsFieldControl = { control: import("react-hook-form").Control<SettingsFormValues>; disabled?: boolean };

type StepperFieldProps = SettingsFieldControl & {
  name: SettingsNumberField;
  label: string;
  hint: string;
  unit: string;
  units?: string;
  min: number;
  max?: number;
  step?: number;
};

type TimeFieldProps = SettingsFieldControl & {
  name: "checkInTime" | "checkOutTime";
  label: string;
  hint: string;
  options: readonly string[];
};

type WebsiteBookingsSectionProps = SettingsFieldControl & { lock: AccessLock };
