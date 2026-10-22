import ProfileCard from "@/components/authentication/profile-card";
import UpdatePasswordForm from "@/components/authentication/update-password-form";
import UpdateUserDataForm from "@/components/authentication/update-user-data-form";
import AccountPanel from "@/components/authentication/account-panel";
import PageHeader from "@/components/shared/page-header";
import useTitle from "@/hooks/shared/use-title";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

function Account() {
  useTitle("Account");

  return (
    <>
      <PageHeader eyebrow="Your account" title="Account settings" description="Your profile in the house, the name and photo other staff see, and your password." />

      <div className="space-y-6">
        <ProfileCard />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <AccountPanel eyebrow="Profile" title="Your details" description="Your name and the photo other staff see next to your bookings.">
            <UpdateUserDataForm />
          </AccountPanel>
          <AccountPanel eyebrow="Security" title="Password" description={`Use at least ${PASSWORD_MIN_LENGTH} characters. You will stay logged in after changing it.`}>
            <UpdatePasswordForm />
          </AccountPanel>
        </div>
      </div>
    </>
  );
}

export default Account;
