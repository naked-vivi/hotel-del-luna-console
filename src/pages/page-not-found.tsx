import { useMoveBack } from "@/hooks/shared/use-move-back";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/logo";
import useTitle from "@/hooks/shared/use-title";

function PageNotFound() {
  useTitle("Page not found");
  const moveBack = useMoveBack();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-16 text-center">
      <Logo size="sm" className="absolute top-10 left-1/2 -translate-x-1/2" />

      <div className="relative flex flex-col items-center gap-12 pt-28">
        <h1
          aria-label="Error 404"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 bg-linear-to-b from-primary/30 to-secondary/10 bg-clip-text font-mono text-[200px] font-semibold tracking-tighter text-transparent uppercase select-none mask-[linear-gradient(to_bottom,black,black_20%,transparent_80%)] [-webkit-text-stroke:3px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
        >
          404
        </h1>
        <div className="relative space-y-5">
          <h2 className="text-4xl leading-tight font-extralight text-foreground sm:text-5xl">This room does not exist</h2>
          <p className="mx-auto max-w-[44ch] text-[15px] text-muted-foreground">
            The page you are looking for could not be found. It may have moved, or the link may be mistyped.
          </p>
        </div>
        <Button onClick={moveBack} size="lg" className="relative">
          &larr; Go back
        </Button>
      </div>
    </main>
  );
}

export default PageNotFound;
