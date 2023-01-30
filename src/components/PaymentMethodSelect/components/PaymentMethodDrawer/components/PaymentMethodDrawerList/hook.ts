import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

import { Database } from "types/supabase.types";

interface UsePaymentMethodDrawerListProps {
  onDeletePaymentMethod: (deletedPaymentMethodId: string) => void;
}

export function usePaymentMethodDrawerList({
  onDeletePaymentMethod,
}: UsePaymentMethodDrawerListProps) {
  const supabaseClient = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const { mutateAsync: onDelete, isLoading: isDeleting } = useMutation(
    async (paymentMethodId: string) => {
      await supabaseClient
        .from("payment_methods")
        .delete()
        .match({ id: paymentMethodId });

      onDeletePaymentMethod(paymentMethodId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.PAYMENT_METHODS);
      },
    }
  );

  return { isDeleting, onDelete };
}
