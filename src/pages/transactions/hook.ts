import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "react-query";

import { Database } from "types/supabase.types";

import { getTransactionsWithSummary } from "services/transactions/getWithSummary";

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

type TransactionsSummary = {
  expensesAmount: number;
  revenuesAmount: number;
  savedMoneyAmount: number;
};

type TransactionsQueryResponse = {
  transactions: TransactionItem[];
  summary: TransactionsSummary;
};

export function useTransactions() {
  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

  const formattedStartDate = startDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });
  const formattedEndDate = endDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });

  const supabaseClient = useSupabaseClient<Database>();

  const {
    data: {
      transactions = [],
      summary = {
        expensesAmount: 0,
        revenuesAmount: 0,
        savedMoneyAmount: 0,
      },
    } = {} as TransactionsQueryResponse,
    isLoading: isTransactionsLoading,
  } = useQuery<TransactionsQueryResponse>(
    "transactions",
    async () =>
      await getTransactionsWithSummary(supabaseClient, {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  return {
    isTransactionsLoading,
    transactions,
    summary,
    formattedStartDate,
    formattedEndDate,
  };
}
