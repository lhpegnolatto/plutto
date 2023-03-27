import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type PurposesSummaryPerDayResponse = {
  purpose: "revenue" | "expense";
  amount: number;
  day: number;
};

type PurposesSummaryPerDayItem = {
  revenues: number;
  expenses: number;
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
    const groupedByDay = (data as PurposesSummaryPerDayResponse[])
      .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime())
      .reduce((acc, { purpose, amount, day }) => {
        const existingItemIndex = acc.findIndex((item) => item.day === day);

        if (existingItemIndex > -1) {
          const existingItem = acc[existingItemIndex];
          acc.splice(existingItemIndex, 1, {
            day: existingItem.day,
            revenues:
              existingItem.revenues +
              (purpose === "revenue" ? amount : existingItem.revenues),
            expenses:
              existingItem.expenses +
              (purpose === "expense" ? amount : existingItem.expenses),
            savedMoney:
              existingItem.savedMoney +
              (purpose === "revenue" ? amount : amount * -1),
          });
        } else {
          acc.push({
            day,
            revenues:
              (acc[acc.length - 1]?.revenues || 0) +
              (purpose === "revenue" ? amount : 0),
            expenses:
              (acc[acc.length - 1]?.expenses || 0) +
              (purpose === "expense" ? amount : 0),
            savedMoney:
              (acc[acc.length - 1]?.savedMoney || 0) +
              (purpose === "revenue" ? amount : amount * -1),
          });
        }

        return acc;
      }, [] as PurposesSummaryPerDayItem[]);

    return groupedByDay;
  }

  return [];
}
