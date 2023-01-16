import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "react-query";

import { Database } from "types/supabase.types";
import { useRouter } from "next/router";

type FormData = {
  description: string;
  transactedAt: string;
  type: "expense" | "earn";
  category: string;
  paymentMethod: string;
  repeat: "single" | "fixed" | "installment";
  amount: string;
  fixedPeriod: "monthly" | "daily" | "weekly" | "yearly" | null;
  installments: string;
};

export function useNewTransaction() {
  const router = useRouter();

  const formProps = useForm<FormData>({
    defaultValues: {
      description: "",
      transactedAt: new Date().toISOString().split("T")[0],
      type: "expense",
      category: "",
      paymentMethod: "",
      repeat: "single",
      amount: "",
      fixedPeriod: "monthly",
      installments: "2",
    },
  });
  const { handleSubmit } = formProps;

  const supabaseClient = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const { mutateAsync: onSubmit, isLoading: isSubmitting } = useMutation(
    handleSubmit(
      async ({
        description,
        transactedAt,
        type,
        category,
        paymentMethod,
        repeat,
        amount,
        fixedPeriod,
        installments,
      }) => {
        await supabaseClient.from("transactions").insert({
          description,
          transacted_at: transactedAt,
          type,
          category_id: category,
          payment_method_id: paymentMethod,
          repeat,
          amount: parseFloat(amount),
          fixed_period: fixedPeriod,
          installments: installments ? parseInt(installments) : null,
        });

        router.push("/transactions");
      }
    ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transactions");
      },
    }
  );

  return {
    formProps,
    onSubmit,
    isSubmitting,
  };
}
