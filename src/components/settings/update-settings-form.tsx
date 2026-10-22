import useSettings from "@/hooks/settings/use-settings";
import SettingsForm from "@/components/settings/settings-form";
import SettingsFormSkeleton from "@/components/settings/settings-form-skeleton";
import { settingsFormValues } from "@/lib/helpers";

export default function UpdateSettingsForm() {
  const { isPending, settings, error } = useSettings();

  if (isPending) return <SettingsFormSkeleton />;
  if (error || !settings) return <p role="alert">{error?.message || "Settings could not be loaded."}</p>;

  return (
    <div className="max-w-4xl">
      <SettingsForm initialValues={settingsFormValues(settings)} />
    </div>
  );
}
