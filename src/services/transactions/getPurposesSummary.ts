import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type PurposesSummaryResponse = {
  purpose: "revenue" | "expense";
  amount: number;
};

type GetTransactionsPurposesSummaryOptions = {
  startDate: string;
  endDate: string;
};

export async function getTransactionsPurposesSummary(
  supabaseClient: SupabaseClient<Database>,
  options: GetTransactionsPurposesSummaryOptions
) {
  const { startDate, endDate } = options;

  const { data } = await supabaseClient.rpc("transactions_summary_purposes", {
    start_date: startDate,
    end_date: endDate,
  });

  if (data) {
    const expensesAmount = (data as PurposesSummaryResponse[]).reduce(
      (acc, { purpose, amount }) => acc + (purpose === "expense" ? amount : 0),
      0
    );
    const revenuesAmount = (data as PurposesSummaryResponse[]).reduce(
      (acc, { purpose, amount }) => acc + (purpose === "revenue" ? amount : 0),
      0
    );
    const savedMoneyAmount = revenuesAmount - expensesAmount;

    return {
      expensesAmount,
      revenuesAmount,
      savedMoneyAmount,
    };
  }

  return {
    expensesAmount: 0,
    revenuesAmount: 0,
    savedMoneyAmount: 0,
  };
}
