import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "react-query";

import { Database } from "types/supabase.types";

type TransactionItem = {
  id: string;
  title: string;
  type: string;
  amount: number;
  transacted_at: string;
  categories: { title: string; color: string };
};

type TransactionsSummary = {
  withdrawsAmount: number;
  depositsAmount: number;
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
  withdrawsAmount: 0,
  depositsAmount: 0,
  savedMoneyAmount: 0,
};

export function useTransactions() {
  const startDate = new Date(2022, 11, 20);
  const endDate = new Date();

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
        const withdrawsAmount = (
          summaryData as TransactionsSummaryResponse[]
        ).reduce(
          (acc, { type, amount }) => acc + (type === "withdraw" ? amount : 0),
          0
        );
        const depositsAmount = (
          summaryData as TransactionsSummaryResponse[]
        ).reduce(
          (acc, { type, amount }) => acc + (type === "deposit" ? amount : 0),
          0
        );
        const savedMoneyAmount = depositsAmount - withdrawsAmount;

        summary = {
          withdrawsAmount,
          depositsAmount,
          savedMoneyAmount,
        };
      }

      const { data } = await supabaseClient
        .from("transactions")
        .select(
          "id, title, type, amount, transacted_at, categories ( title, color )",
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
