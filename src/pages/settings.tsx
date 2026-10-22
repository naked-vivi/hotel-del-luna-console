import UpdateSettingsForm from "@/components/settings/update-settings-form";
import PageHeader from "@/components/shared/page-header";
import useTitle from "@/hooks/shared/use-title";

function Settings() {
  useTitle("Settings");

  return (
    <>
      <PageHeader
        eyebrow="House rules"
        title="Hotel settings"
        description="Booking limits and the breakfast rate. Changes apply to new bookings as soon as you save."
      />
      <UpdateSettingsForm />
    </>
  );
}

export default Settings;
