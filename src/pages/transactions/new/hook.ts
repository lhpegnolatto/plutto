import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

import { Database } from "types/supabase.types";
import { routes } from "constants/routes";
import { getDateTimeInputDefaultValue } from "utils/getDateTimeInputDefaultValue";
import { TransactionFormData } from "../components/TransactionForm/hook";

type Purpose = "expense" | "revenue";

export function useNewTransaction() {
  const router = useRouter();

  const defaultValues = useMemo(
    () =>
      ({
        description: "",
        transactedAt: getDateTimeInputDefaultValue(),
        purpose: (router.query?.purpose as Purpose) || "expense",
        category: "",
        paymentMethod: undefined,
        recurrence: "unique",
        amount: "",
        frequency: null,
        installments: "",
      } as TransactionFormData),
    [router]
  );

  const supabaseClient = useSupabaseClient<Database>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async ({
      description,
      transactedAt,
      purpose,
      category,
      paymentMethod,
      recurrence,
      amount,
      frequency,
      installments,
    }: TransactionFormData) => {
      setIsSubmitting(true);

      await supabaseClient.from("transactions").insert({
        description,
        transacted_at: new Date(transactedAt).toISOString(),
        purpose,
        category_id: category,
        payment_method_id: paymentMethod,
        recurrence,
        amount: parseFloat(amount),
        frequency,
        installments: installments ? parseInt(installments) : null,
      });

      router.push(routes.TRANSACTIONS);

      setIsSubmitting(false);
    },
    [router, supabaseClient]
  );

  return {
    onSubmit,
    defaultValues,
    isSubmitting,
  };
}
