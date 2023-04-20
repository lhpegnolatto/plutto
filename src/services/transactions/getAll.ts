import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type GetAllTransactionsOptions = {
  startDate: string;
  endDate: string;
  from: number;
  to: number;
};

export async function getAllTransactions(
  supabaseClient: SupabaseClient<Database>,
  options: GetAllTransactionsOptions
) {
  const { startDate, endDate, from, to } = options;

  const { data, count } = await supabaseClient
    .rpc(
      "transactions_filters",
      {
        start_date: startDate,
        end_date: endDate,
      },
      { count: "exact" }
    )
    .select("*")
    .order("occurred_at", { ascending: false })
    .range(from, to);

  if (data) {
    const transactions = data.map((transaction) => ({
      ...transaction,
      occurred_at: transaction.occurred_at,
    }));

    return { items: transactions, count: count || 0 };
  }

  return { items: [], count: 0 };
}
