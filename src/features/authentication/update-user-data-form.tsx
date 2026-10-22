import { useEffect, useMemo, useRef, useState } from "react";
import type { SubmitEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "./use-user";
import { useUpdateUser } from "./use-update-user";

/** Your name and photo. Sits inside the "Your details" panel on the Account page. */
function UpdateUserDataForm() {
  const { user, isPending } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentFullName = user?.user_metadata?.fullName ?? "";
  const currentAvatar = typeof user?.user_metadata?.avatar === "string" ? user.user_metadata.avatar : "";

  const [fullName, setFullName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  // Preview the chosen file before saving; release the temporary link when it changes.
  const selectedUrl = useMemo(() => (avatar ? URL.createObjectURL(avatar) : ""), [avatar]);
  useEffect(() => () => { if (selectedUrl) URL.revokeObjectURL(selectedUrl); }, [selectedUrl]);
  const preview = selectedUrl || currentAvatar;
  const busy = isPending || isUpdating || !user;
  const isDirty = (fullName !== null && fullName.trim() !== currentFullName) || Boolean(avatar);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const nextFullName = (fullName ?? currentFullName).trim();
    if (!nextFullName) return;
    updateUser({ fullName: nextFullName, avatar }, { onSuccess: handleReset });
  }

  function handleReset() {
    setFullName(null);
    setAvatar(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} aria-busy={busy} className="flex flex-1 flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="accountFullName">Full name</Label>
        <Input
          type="text"
          id="accountFullName"
          required
          pattern=".*\S.*"
          title="Enter your full name"
          autoComplete="name"
          value={fullName ?? currentFullName}
          onChange={(event) => setFullName(event.target.value)}
          disabled={busy}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountEmail">Email address</Label>
        <Input type="email" id="accountEmail" autoComplete="email" value={user?.email ?? ""} disabled className="h-11" aria-describedby="accountEmail-note" />
        <p id="accountEmail-note" className="text-xs text-muted-foreground">Ask an admin if your email address needs to change.</p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="avatar">Photo</Label>
        <div className="flex items-center gap-5">
          <Avatar className="size-16 shrink-0 rounded-full ring-1 ring-border">
            {preview ? <AvatarImage src={preview} alt="" /> : null}
            <AvatarFallback className="rounded-full bg-muted text-sm text-muted-foreground">—</AvatarFallback>
          </Avatar>
          <div className="min-w-0 space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              id="avatar"
              accept="image/*"
              className="sr-only"
              onChange={(event) => setAvatar(event.target.files?.[0] ?? null)}
              disabled={busy}
              aria-describedby="avatar-description"
            />
            <Button type="button" variant="outline" disabled={busy} onClick={() => fileInputRef.current?.click()}>
              {avatar ? "Choose another photo" : "Upload a new photo"}
            </Button>
            <p id="avatar-description" className="truncate text-xs text-muted-foreground">
              {avatar ? `Selected: ${avatar.name}` : "A square photo works best."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap justify-end gap-3 border-t border-border pt-6">
        <Button type="reset" variant="outline" disabled={busy || !isDirty}>Cancel</Button>
        <Button type="submit" disabled={busy || !isDirty}>{isUpdating ? "Saving..." : "Save details"}</Button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
