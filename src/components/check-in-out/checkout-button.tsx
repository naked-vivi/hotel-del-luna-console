import { Button } from "@/components/ui/button";
import LoadingDots from "@/components/shared/loading-dots";
import { useCheckout } from "@/hooks/check-in-out/use-checkout";

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkOut, isCheckingOut } = useCheckout();

  return (
    <Button type="button" size="sm" disabled={isCheckingOut} aria-busy={isCheckingOut} onClick={() => checkOut(bookingId)}>
      {isCheckingOut ? <LoadingDots label="Checking out" /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
