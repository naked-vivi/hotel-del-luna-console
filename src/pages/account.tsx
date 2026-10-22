import type { ReactNode } from "react";
import ProfileCard from "@/features/authentication/profile-card";
import UpdatePasswordForm from "@/features/authentication/update-password-form";
import UpdateUserDataForm from "@/features/authentication/update-user-data-form";
import PageHeader from "@/shared/page-header";

/** A titled panel that holds one form. */
function Panel({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <section className="flex min-w-0 flex-col border border-border bg-card">
      <header className="space-y-2 border-b border-border p-6 sm:px-8">
        <p className="text-[10px] font-semibold tracking-[0.28em] text-gold uppercase">{eyebrow}</p>
        <h2 className="text-2xl font-extralight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>
      <div className="flex flex-1 flex-col p-6 sm:px-8">{children}</div>
    </section>
  );
}

function Account() {
  return (
    <>
      <PageHeader eyebrow="Your account" title="Account settings" description="Your profile in the house, the name and photo other staff see, and your password." />

      <div className="space-y-6">
        <ProfileCard />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Panel eyebrow="Profile" title="Your details" description="Your name and the photo other staff see next to your bookings.">
            <UpdateUserDataForm />
          </Panel>
          <Panel eyebrow="Security" title="Password" description="Use at least 8 characters. You will stay logged in after changing it.">
            <UpdatePasswordForm />
          </Panel>
        </div>
      </div>
    </>
  );
}

export default Account;
