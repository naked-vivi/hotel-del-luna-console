import { Button } from "@/components/ui/button";
import { useMoveBack } from "@/hooks/shared/use-move-back";

function LoadError({ message }: LoadErrorProps) {
  const moveBack = useMoveBack();

  return (
    <div className="flex flex-col items-start gap-4">
      <p role="alert">{message}</p>
      <Button variant="outline" onClick={moveBack}>Back</Button>
    </div>
  );
}

export default LoadError;
