import useSettings from "@/hooks/settings/use-settings";
import SettingsForm from "@/components/settings/settings-form";
import SettingsFormSkeleton from "@/components/settings/settings-form-skeleton";
import ErrorNote from "@/components/shared/error-note";
import ErrorPanel from "@/components/shared/error-panel";

export default function UpdateSettingsForm() {
  const { isPending, settings, error } = useSettings();

  if (isPending) return <SettingsFormSkeleton />;
  if (error || !settings) {
    return (
      <ErrorPanel>
        <ErrorNote title="The house rules are in the fog" message={error?.message || "Settings could not be loaded."} />
      </ErrorPanel>
    );
  }

  return <SettingsForm key={settings.updatedAt ?? settings.id} settings={settings} />;
}
