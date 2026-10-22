type SettingsFormValues = import("zod").infer<typeof import("@/lib/schemas").settingsSchema>;

type Settings = SettingsFormValues & { id: number };

type SettingsFormProps = { initialValues: SettingsFormValues };
