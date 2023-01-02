import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "react-query";

import { Database } from "types/supabase.types";
import { useRouter } from "next/router";

export function useNewTransaction() {
  const router = useRouter();

  const formProps = useForm({
    defaultValues: {
      title: "",
      category: "",
      type: "withdraw",
      amount: "",
      transacted_at: new Date().toISOString().split("T")[0],
    },
  });
  const { handleSubmit } = formProps;

  const supabaseClient = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const { mutateAsync: onSubmit, isLoading: isSubmitting } = useMutation(
    handleSubmit(async ({ amount, category, title, transacted_at, type }) => {
      await supabaseClient.from("transactions").insert({
        amount: parseFloat(amount),
        category_id: category,
        title,
        transacted_at,
        type,
      });

      router.push("/transactions");
    }),
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
