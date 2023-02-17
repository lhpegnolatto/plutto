import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type TransactionsSummaryResponse = {
  purpose: "revenue" | "expense";
  amount: number;
};

type GetTransactionsWithSummaryOptions = {
  startDate: string;
  endDate: string;
};

export async function getTransactionsWithSummary(
  supabaseClient: SupabaseClient<Database>,
  options: GetTransactionsWithSummaryOptions
) {
  const { startDate, endDate } = options;

  const { data: summaryData } = await supabaseClient.rpc(
    "transactions_summary",
    {
      start_date: startDate,
      end_date: endDate,
    }
  );

  let summary = {
    expensesAmount: 0,
    revenuesAmount: 0,
    savedMoneyAmount: 0,
  };

  if (summaryData) {
    const expensesAmount = (
      summaryData as TransactionsSummaryResponse[]
    ).reduce(
      (acc, { purpose, amount }) => acc + (purpose === "expense" ? amount : 0),
      0
    );
    const revenuesAmount = (
      summaryData as TransactionsSummaryResponse[]
    ).reduce(
      (acc, { purpose, amount }) => acc + (purpose === "revenue" ? amount : 0),
      0
    );
    const savedMoneyAmount = revenuesAmount - expensesAmount;

    summary = {
      expensesAmount,
      revenuesAmount,
      savedMoneyAmount,
    };
  }

  const { data } = await supabaseClient
    .rpc("transactions_filters", {
      start_date: startDate,
      end_date: endDate,
    })
    .select(
      "id, description, purpose, amount, ended_at, category_title, category_color, payment_method_title, payment_method_color, recurrence, installment_label, frequency, occurred_at"
    )
    .order("occurred_at", { ascending: false })
    .limit(50);

  if (data) {
    const transactions = data.map((transaction) => ({
      ...transaction,
      occurred_at: transaction.occurred_at
        ? new Date(transaction.occurred_at).toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : undefined,
    }));

    return { transactions, summary };
  }

  return { transactions: [], summary };
}
