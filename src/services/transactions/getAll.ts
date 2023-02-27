import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type GetAllTransactionsOptions = {
  startDate: string;
  endDate: string;
};

export async function getAllTransactions(
  supabaseClient: SupabaseClient<Database>,
  options: GetAllTransactionsOptions
) {
  const { startDate, endDate } = options;

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

    return transactions;
  }

  return [];
}
