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

export function useHalfYearSavedMoneyCard() {
  const today = new Date();
  const endDate = new Date(today.getFullYear(), today.getMonth(), 0);
  const startDate = new Date(today.getFullYear(), today.getMonth() - 6, 1);

  const supabaseClient = useSupabaseClient<Database>();

  const {
    data: purposesSummaryHalfYear,
    isLoading: isPurposesSummaryHalfYearLoading,
  } = useQuery<PurposesSummary>(
    queryKeys.PURPOSES_SUMMARY_HALF_YEAR,
    async () =>
      await getTransactionsPurposesSummary(supabaseClient, {
        startDate: new Date(
          startDate.getFullYear(),
          startDate.getMonth() - 5,
          1
        ).toISOString(),
        endDate: endDate.toISOString(),
      }),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  const {
    expensesAmount: expensesHalfYearAmount,
    revenuesAmount: revenuesHalfYearAmount,
    savedMoneyAmount: savedMoneyHalfYearAmount,
  } = purposesSummaryHalfYear
    ? purposesSummaryHalfYear
    : { expensesAmount: 0, revenuesAmount: 0, savedMoneyAmount: 0 };

  const savedMoneyHalfYearPercentage = Number(
    (savedMoneyHalfYearAmount /
      (expensesHalfYearAmount + revenuesHalfYearAmount)) *
      100
  ).toFixed(2);

  return {
    savedMoneyHalfYearPercentage,
    savedMoneyHalfYearAmount,
    isPurposesSummaryHalfYearLoading,
  };
}
