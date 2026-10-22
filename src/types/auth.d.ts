type SignupCredentials = {
  fullName: string;
  email: string;
  password: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type UpdateUserData = {
  password?: string;
  fullName?: string;
  avatar?: File | null;
};

type UserProfile = {
  fullName: string;
  avatar: string;
  email: string;
  displayName: string;
  initials: string;
  isAdmin: boolean;
  isConfirmed: boolean;
};

type LoginValues = LoginCredentials;

type SignupFormValues = import("zod").infer<typeof import("@/lib/schemas").signupSchema>;

type SignupFormProps = { onDone?: () => void };

type PasswordFormValues = {
  password: string;
  passwordConfirm: string;
};

type AccountPanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

type NightDialProps = ClassNameProps & { now: Date };
