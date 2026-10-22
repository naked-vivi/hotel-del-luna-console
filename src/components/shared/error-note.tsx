import CloudedMoon from "@/components/shared/clouded-moon";

function ErrorNote({ title = "The sky is clouded over", message = "This could not be loaded. Try again shortly.", drawing }: ErrorNoteProps) {
  return (
    <div role="alert" className="my-auto flex flex-col items-center gap-8 py-14 text-center">
      {drawing ?? <CloudedMoon className="w-full max-w-72" />}
      <div className="space-y-2">
        <p className="text-xl font-extralight text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default ErrorNote;
