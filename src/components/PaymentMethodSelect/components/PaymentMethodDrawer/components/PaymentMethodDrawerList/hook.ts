import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Database } from "types/supabase.types";

interface UsePaymentMethodDrawerListProps {
  onDeletePaymentMethod: (deletedPaymentMethodId: string) => void;
}

export function usePaymentMethodDrawerList({
  onDeletePaymentMethod,
}: UsePaymentMethodDrawerListProps) {
  const supabaseClient = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const { isLoading: isPaymentMethodsLoading, data: paymentMethods = [] } =
    useQuery(
      queryKeys.PAYMENT_METHODS,
      async () => {
        const { data } = await supabaseClient
          .from("payment_methods")
          .select("id, title, color");

        return data || [];
      },
      {
        staleTime: 1000 * 60, // 1 minute
      }
    );

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

  return { isPaymentMethodsLoading, paymentMethods, isDeleting, onDelete };
}
