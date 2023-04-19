import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";
import { deletePaymentMethod } from "services/paymentMethods/delete";

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
      await deletePaymentMethod(supabaseClient, { paymentMethodId });

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
