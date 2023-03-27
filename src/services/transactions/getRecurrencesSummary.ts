import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type CamelCaseRecurrence = "unique" | "fixedPeriodic" | "installmentBased";

type PurposesSummaryRecurrencesResponse = {
  purpose: "revenue" | "expense";
  amount: number;
  recurrence: "unique" | "fixed_periodic" | "installment_based";
};

type PurposesSummaryRecurrencesItem = {
  revenues: number;
  expenses: number;
};

type PurposesSummaryRecurrences = {
  unique: PurposesSummaryRecurrencesItem;
  fixedPeriodic: PurposesSummaryRecurrencesItem;
  installmentBased: PurposesSummaryRecurrencesItem;
};

type GetTransactionsRecurrencesSummaryOptions = {
  startDate: string;
  endDate: string;
};

export async function getTransactionsRecurrencesSummary(
  supabaseClient: SupabaseClient<Database>,
  options: GetTransactionsRecurrencesSummaryOptions
) {
  const { startDate, endDate } = options;

  const { data } = await supabaseClient.rpc("transactions_summary_recurrence", {
    start_date: startDate,
    end_date: endDate,
  });

  if (data) {
    const groupedByRecurrence = (
      data as PurposesSummaryRecurrencesResponse[]
    ).reduce((acc, { recurrence, purpose, amount }) => {
      const camelCaseRecurrence = recurrence
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) =>
          group.toUpperCase().replace("-", "").replace("_", "")
        ) as CamelCaseRecurrence;

      return {
        ...acc,
        [camelCaseRecurrence]: {
          expenses:
            purpose === "expense"
              ? amount
              : acc[camelCaseRecurrence]?.expenses || 0,
          revenues:
            purpose === "revenue"
              ? amount
              : acc[camelCaseRecurrence]?.revenues || 0,
        },
      };
    }, {} as PurposesSummaryRecurrences);

    return groupedByRecurrence;
  }

  return {} as PurposesSummaryRecurrences;
}
