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
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
    23,
    59,
    59
  );
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth() - 6,
    1,
    0,
    0,
    0
  );

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
    revenuesAmount: revenuesHalfYearAmount,
    savedMoneyAmount: savedMoneyHalfYearAmount,
  } = purposesSummaryHalfYear
    ? purposesSummaryHalfYear
    : { revenuesAmount: 0, savedMoneyAmount: 0 };

  const savedMoneyHalfYearPercentage =
    savedMoneyHalfYearAmount === 0 || revenuesHalfYearAmount === 0
      ? 0
      : (100 * savedMoneyHalfYearAmount) / revenuesHalfYearAmount / 100;

  return {
    savedMoneyHalfYearPercentage,
    savedMoneyHalfYearAmount,
    isPurposesSummaryHalfYearLoading,
  };
}
