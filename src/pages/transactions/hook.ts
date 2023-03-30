import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useCallback, useRef } from "react";

import { Database } from "types/supabase.types";

import { getAllTransactions } from "services/transactions/getAll";
import { getTransactionsPurposesSummary } from "services/transactions/getPurposesSummary";
import { queryKeys } from "constants/queryKeys";
import { useDisclosure } from "@chakra-ui/react";
import { TransactionsFilters } from "./components/FiltersModal";

export type TransactionItem = {
  id: string;
  description: string;
  purpose: "revenue" | "expense";
  amount: number;
  category_title: string;
  category_color: string;
  payment_method_title: string;
  payment_method_color: string;
  recurrence: "unique" | "installment_based" | "fixed_periodic";
  frequency?: "monthly" | "daily" | "weekly" | "yearly";
  installment_label?: string;
  ended_at: string;
  occurred_at?: string;
};

type PurposesSummary = {
  expensesAmount: number;
  revenuesAmount: number;
  savedMoneyAmount: number;
};

export function useTransactions() {
  const {
    isOpen: isFiltersModalOpen,
    onOpen: onFiltersModalOpen,
    onClose: onFiltersModalClose,
  } = useDisclosure();
  const currentFilters = useRef<TransactionsFilters>(
    (() => {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      return { startDate, endDate };
    })()
  );

  const queryClient = useQueryClient();

  const formattedStartDate = currentFilters.current.startDate.toLocaleString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
  const formattedEndDate = currentFilters.current.endDate.toLocaleString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const supabaseClient = useSupabaseClient<Database>();

  const { mutateAsync: onDelete, isLoading: isDeleting } = useMutation(
    async (transactionId: string) => {
      await supabaseClient
        .from("transactions")
        .delete()
        .match({ id: transactionId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.TRANSACTIONS);
        queryClient.invalidateQueries(queryKeys.PURPOSES_SUMMARY);
      },
    }
  );

  function getFiltersQueryKey() {
    const startDateAsString = currentFilters.current.startDate.toISOString();
    const endDateAsString = currentFilters.current.endDate.toISOString();

    return `${startDateAsString}-${endDateAsString}`;
  }

  const { data: transactions = [], isLoading: isTransactionsLoading } =
    useQuery<TransactionItem[]>(
      [queryKeys.TRANSACTIONS, getFiltersQueryKey()],
      async () =>
        await getAllTransactions(supabaseClient, {
          startDate: currentFilters.current.startDate.toISOString(),
          endDate: currentFilters.current.endDate.toISOString(),
        }),
      {
        staleTime: 1000 * 60, // 1 minute
      }
    );

  const onFiltersChange = useCallback(
    (newFilters: TransactionsFilters) => {
      currentFilters.current = newFilters;
      // refetchTransactions();

      onFiltersModalClose();
    },
    [onFiltersModalClose]
  );

  const {
    data: purposesSummary = {
      expensesAmount: 0,
      revenuesAmount: 0,
      savedMoneyAmount: 0,
    },
    isLoading: isPurposesSummaryLoading,
  } = useQuery<PurposesSummary>(
    [queryKeys.PURPOSES_SUMMARY, getFiltersQueryKey()],
    async () =>
      await getTransactionsPurposesSummary(supabaseClient, {
        startDate: currentFilters.current.startDate.toISOString(),
        endDate: currentFilters.current.endDate.toISOString(),
      }),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  function getTransactionRecurrenceColumn({
    recurrence,
    installment_label,
    frequency,
  }: TransactionItem) {
    switch (recurrence) {
      case "fixed_periodic":
        return `Repeat ${frequency}`;
      case "installment_based":
        return `Installment ${installment_label}`;
      default:
        return "";
    }
  }

  function getTransactionMonth(
    { occurred_at }: TransactionItem,
    index: number
  ) {
    const previousItem = transactions[index - 1];
    const previousMonthText =
      previousItem?.occurred_at && index > 0
        ? new Date(previousItem.occurred_at).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "";

    const monthText = occurred_at
      ? new Date(occurred_at).toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "";

    return monthText !== previousMonthText ? monthText : "";
  }

  function getSummaryValuePercentage(value: number) {
    return Number(
      (value /
        (purposesSummary.expensesAmount + purposesSummary.revenuesAmount)) *
        100
    ).toFixed(2);
  }

  return {
    transactions,
    isTransactionsLoading,
    purposesSummary,
    isPurposesSummaryLoading,
    formattedStartDate,
    formattedEndDate,
    onDelete,
    isDeleting,
    getTransactionRecurrenceColumn,
    getSummaryValuePercentage,
    isFiltersModalOpen,
    onFiltersModalOpen,
    onFiltersModalClose,
    currentFilters,
    onFiltersChange,
    getTransactionMonth,
  };
}
