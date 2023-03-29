import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { Database } from "types/supabase.types";
import { routes } from "constants/routes";
import { TransactionFormData } from "../components/TransactionForm/hook";
import { useQuery } from "react-query";
import { getTransaction } from "services/transactions/get";
import { useAppLoaderContext } from "contexts/AppLoaderContext";

export function useNewTransaction() {
  const router = useRouter();
  const { transactionId } = router.query;
  const { setIsAppLoading } = useAppLoaderContext();
  const supabaseClient = useSupabaseClient<Database>();

  const { data: defaultValues } = useQuery<TransactionFormData>(
    `transaction-${transactionId}`,
    async () => {
      if (!!transactionId && typeof transactionId === "string") {
        setIsAppLoading(true);

        const response = (await getTransaction(supabaseClient, {
          transactionId,
        })) as TransactionFormData;

        setIsAppLoading(false);

        return response;
      }

      return {} as TransactionFormData;
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async ({
      description,
      transactedAt,
      purpose,
      category,
      paymentMethod,
      recurrence,
      amount,
      frequency,
      installments,
    }: TransactionFormData) => {
      if (transactionId && typeof transactionId === "string") {
        setIsSubmitting(true);

        await supabaseClient
          .from("transactions")
          .update({
            description,
            transacted_at: new Date(transactedAt).toISOString(),
            purpose,
            category_id: category,
            payment_method_id: paymentMethod,
            recurrence,
            amount: parseFloat(amount),
            frequency,
            installments: installments ? parseInt(installments) : null,
          })
          .eq("id", transactionId);

        router.push(routes.TRANSACTIONS);

        setIsSubmitting(false);
      }
    },
    [router, supabaseClient, transactionId]
  );

  return {
    onSubmit,
    defaultValues,
    isSubmitting,
  };
}
