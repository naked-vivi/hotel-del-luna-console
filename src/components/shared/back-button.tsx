import { Button } from "@/components/ui/button";
import { useMoveBack } from "@/hooks/shared/use-move-back";

function BackButton() {
  const moveBack = useMoveBack();

  return (
    <Button variant="ghost" onClick={moveBack} className="text-muted-foreground hover:text-foreground">
      &larr; Back
    </Button>
  );
}

export default BackButton;
