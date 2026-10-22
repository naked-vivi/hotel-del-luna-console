import UpdateSettingsForm from "@/features/settings/update-settings-form";
import PageHeader from "@/shared/page-header";

function Settings() {
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
