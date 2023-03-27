import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Database } from "types/supabase.types";

import { getAllTransactions } from "services/transactions/getAll";
import { getTransactionsPurposesSummary } from "services/transactions/getPurposesSummary";
import { queryKeys } from "constants/queryKeys";

export type TransactionItem = {
  id: string;
  description: string;
  purpose: "revenue" | "expense";
  amount: number;
  category_title: string;
  category_color: string;
  payment_method_title: string;
  payment_method_color: string;
  recurrence: "unique" | "installment_based" | "fixed_periodic";
  frequency?: "monthly" | "daily" | "weekly" | "yearly";
  installment_label?: string;
  ended_at: string;
  occurred_at?: string;
};

type PurposesSummary = {
  expensesAmount: number;
  revenuesAmount: number;
  savedMoneyAmount: number;
};

export function useTransactions() {
  const today = new Date();
  const endDate = new Date(today.getFullYear(), today.getMonth(), 0);
  const startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  const formattedStartDate = startDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });
  const formattedEndDate = endDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });

  const supabaseClient = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const { mutateAsync: onDelete, isLoading: isDeleting } = useMutation(
    async (transactionId: string) => {
      await supabaseClient
        .from("transactions")
        .delete()
        .match({ id: transactionId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.TRANSACTIONS);
      },
    }
  );

  const { data: transactions = [], isLoading: isTransactionsLoading } =
    useQuery<TransactionItem[]>(
      queryKeys.TRANSACTIONS,
      async () =>
        await getAllTransactions(supabaseClient, {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }),
      {
        staleTime: 1000 * 60, // 1 minute
      }
    );

  const {
    data: purposesSummary = {
      expensesAmount: 0,
      revenuesAmount: 0,
      savedMoneyAmount: 0,
    },
    isLoading: isPurposesSummaryLoading,
  } = useQuery<PurposesSummary>(
    queryKeys.PURPOSES_SUMMARY,
    async () =>
      await getTransactionsPurposesSummary(supabaseClient, {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  return {
    transactions,
    isTransactionsLoading,
    purposesSummary,
    isPurposesSummaryLoading,
    formattedStartDate,
    formattedEndDate,
    onDelete,
    isDeleting,
  };
}
