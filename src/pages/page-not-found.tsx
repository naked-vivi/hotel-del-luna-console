import { useMoveBack } from "../hooks/use-move-back";
import { Button } from "@/components/ui/button";
import Logo from "@/shared/logo";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-14 bg-background px-6 py-16 text-center">
      <Logo />
      <div className="space-y-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">Error 404</p>
        <h1 className="text-4xl leading-tight font-extralight text-foreground sm:text-5xl">
          This room does not exist
        </h1>
        <p className="mx-auto max-w-[44ch] text-[15px] text-muted-foreground">
          The page you are looking for could not be found. It may have moved, or the link may be mistyped.
        </p>
      </div>
      <Button onClick={moveBack} size="lg">
        &larr; Go back
      </Button>
    </main>
  );
}

export default PageNotFound;
