import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadAllSampleData, uploadSampleBookings } from "@/services/api-sample-data";

export function useSampleData() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (scope: SampleDataScope) => (scope === "all" ? uploadAllSampleData() : uploadSampleBookings()),
    onMutate: (scope) => ({
      toastId: toast.loading(scope === "all" ? "Replacing all sample data…" : "Replacing sample bookings…"),
    }),
    onSuccess: (_, scope, context) => {
      toast.success(scope === "all" ? "Sample data replaced" : "Sample bookings replaced", {
        id: context?.toastId,
        description: scope === "all" ? "Cabins, guests and bookings now start from today." : "Bookings now start from today.",
      });
      queryClient.invalidateQueries();
    },
    onError: (error: Error, _, context) => {
      toast.error("Couldn't replace the sample data", { id: context?.toastId, description: error.message });
    },
  });

  return { replaceSampleData: mutate, isReplacing: isPending };
}
