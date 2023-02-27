import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type PurposesSummaryPerDayResponse = {
  purpose: "revenue" | "expense";
  amount: number;
  day: number;
};

type PurposesSummaryPerDayItem = {
  revenue: number;
  expense: number;
  savedMoney: number;
  day: number;
};

type GetTransactionsPurposesPerDaySummaryOptions = {
  startDate: string;
  endDate: string;
};

export async function getTransactionsPurposesPerDaySummary(
  supabaseClient: SupabaseClient<Database>,
  options: GetTransactionsPurposesPerDaySummaryOptions
) {
  const { startDate, endDate } = options;

  const { data } = await supabaseClient.rpc(
    "transactions_summary_purposes_per_day",
    {
      start_date: startDate,
      end_date: endDate,
    }
  );

  if (data) {
    const groupedByDay = (data as PurposesSummaryPerDayResponse[]).reduce(
      (acc, { purpose, amount, day }) => {
        const existingItemIndex = acc.findIndex((item) => item.day === day);

        if (existingItemIndex > -1) {
          const existingItem = acc[existingItemIndex];
          acc.splice(existingItemIndex, 1, {
            day: existingItem.day,
            revenue: purpose === "revenue" ? amount : existingItem.revenue,
            expense: purpose === "expense" ? amount : existingItem.expense,
            savedMoney:
              existingItem.savedMoney +
              (purpose === "revenue" ? amount : amount * -1),
          });
        } else {
          acc.push({
            day,
            revenue: purpose === "revenue" ? amount : 0,
            expense: purpose === "expense" ? amount : 0,
            savedMoney: purpose === "revenue" ? amount : amount * -1,
          });
        }

        return acc;
      },
      [] as PurposesSummaryPerDayItem[]
    );

    console.log(groupedByDay);

    return groupedByDay;
  }

  return [];
}
