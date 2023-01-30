import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "react-query";

import { Database } from "types/supabase.types";

type TransactionItem = {
  id: string;
  description: string;
  type: string;
  amount: number;
  transacted_at: string;
  categories: { title: string; color: string };
  payment_methods: { title: string; color: string };
};

type TransactionsSummary = {
  expensesAmount: number;
  earnsAmount: number;
  savedMoneyAmount: number;
};

type Transaction = {
  items: TransactionItem[];
  summary: TransactionsSummary;
};

type TransactionsSummaryResponse = {
  type: string;
  amount: number;
};

const defaultSummary = {
  expensesAmount: 0,
  earnsAmount: 0,
  savedMoneyAmount: 0,
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
    data: transactions = { items: [], summary: defaultSummary } as Transaction,
    isLoading: isTransactionsLoading,
  } = useQuery<Transaction>(
    "transactions",
    async () => {
      const { data: summaryData } = await supabaseClient.rpc(
        "transactions_summary",
        {
          start_date: startDate.toDateString(),
          end_date: endDate.toDateString(),
        }
      );

      let summary = defaultSummary;

      if (summaryData) {
        const expensesAmount = (
          summaryData as TransactionsSummaryResponse[]
        ).reduce(
          (acc, { type, amount }) => acc + (type === "expense" ? amount : 0),
          0
        );
        const earnsAmount = (
          summaryData as TransactionsSummaryResponse[]
        ).reduce(
          (acc, { type, amount }) => acc + (type === "earn" ? amount : 0),
          0
        );
        const savedMoneyAmount = earnsAmount - expensesAmount;

        summary = {
          expensesAmount,
          earnsAmount,
          savedMoneyAmount,
        };
      }

      const { data } = await supabaseClient
        .from("transactions")
        .select(
          "id, description, type, amount, transacted_at, categories ( title, color ), payment_methods ( title, color )",
          { count: "exact" }
        )
        .gte("transacted_at", startDate.toDateString())
        .lte("transacted_at", endDate.toDateString())
        .order("transacted_at", { ascending: false })
        .limit(10);

      if (data) {
        const items = (data as TransactionItem[]) // needed to force these types because of a issue on supabase types gen
          .map((transaction) => ({
            ...transaction,
            transacted_at: new Date(transaction.transacted_at).toLocaleString(
              "en-US",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            ),
          }));

        return { items, summary };
      }

      return { items: [], summary: defaultSummary };
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  return {
    isTransactionsLoading,
    transactions,
    formattedStartDate,
    formattedEndDate,
  };
}
