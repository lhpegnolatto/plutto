import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "react-query";
import { useUser } from "@supabase/auth-helpers-react";

import { Database } from "types/supabase.types";

import { getTransactionsPurposesPerDaySummary } from "services/transactions/getPurposesPerDaySummary";
import { queryKeys } from "constants/queryKeys";

type PurposesSummaryPerDayItem = {
  revenue: number;
  expense: number;
  savedMoney: number;
  day: number;
};

export function useHome() {
  const { user_metadata: userMetadata } = useUser() ?? {};
  const userFirstName =
    ((userMetadata?.full_name as string) || "").split(" ")[0] || "";

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

  const { data: purposesSummary, isLoading: isPurposesSummaryLoading } =
    useQuery<PurposesSummaryPerDayItem[]>(
      queryKeys.PURPOSES_SUMMARY_PER_DAY,
      async () =>
        await getTransactionsPurposesPerDaySummary(supabaseClient, {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }),
      {
        staleTime: 1000 * 60, // 1 minute
      }
    );

  return {
    userFirstName,
    formattedStartDate,
    formattedEndDate,
    purposesSummary,
    isPurposesSummaryLoading,
  };
}
