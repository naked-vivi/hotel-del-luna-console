import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/check-in-out/use-checkout";

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkOut, isCheckingOut } = useCheckout();

  return (
    <Button type="button" size="sm" disabled={isCheckingOut} onClick={() => checkOut(bookingId)}>
      {isCheckingOut ? "Checking out..." : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
