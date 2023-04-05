import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "react-query";

import { Database } from "types/supabase.types";

import { queryKeys } from "constants/queryKeys";
import { getTransactionsPurposesSummary } from "services/transactions/getPurposesSummary";

type PurposesSummary = {
  expensesAmount: number;
  revenuesAmount: number;
  savedMoneyAmount: number;
};

export function useYearSavedMoneyCard() {
  const today = new Date();
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startDate = new Date(today.getFullYear(), today.getMonth() - 12, 1);

  const supabaseClient = useSupabaseClient<Database>();

  const { data: purposesSummaryYear, isLoading: isPurposesSummaryYearLoading } =
    useQuery<PurposesSummary>(
      queryKeys.PURPOSES_SUMMARY_YEAR,
      async () =>
        await getTransactionsPurposesSummary(supabaseClient, {
          startDate: new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            1
          ).toISOString(),
          endDate: endDate.toISOString(),
        }),
      {
        staleTime: 1000 * 60, // 1 minute
      }
    );

  const {
    revenuesAmount: revenuesYearAmount,
    savedMoneyAmount: savedMoneyYearAmount,
  } = purposesSummaryYear
    ? purposesSummaryYear
    : { revenuesAmount: 0, savedMoneyAmount: 0 };

  const savedMoneyYearPercentage =
    (100 * savedMoneyYearAmount) / revenuesYearAmount / 100;

  return {
    savedMoneyYearPercentage,
    savedMoneyYearAmount,
    isPurposesSummaryYearLoading,
  };
}
