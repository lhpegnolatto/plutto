import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { SingleValue } from "chakra-react-select";

import { Option } from "components/Select";

import { Database } from "types/supabase.types";
import { routes } from "constants/routes";
import { getDateTimeInputDefaultValue } from "utils/getDateTimeInputDefaultValue";

type FormData = {
  description: string;
  transactedAt: string;
  purpose: "expense" | "revenue";
  category: string;
  paymentMethod?: string;
  recurrence: "unique" | "installment_based" | "fixed_periodic";
  amount: string;
  frequency: "monthly" | "daily" | "weekly" | "yearly" | null;
  installments: string;
};

export function useNewTransaction() {
  const router = useRouter();

  const formProps = useForm<FormData>({
    defaultValues: {
      description: "",
      transactedAt: getDateTimeInputDefaultValue(),
      purpose: "expense",
      category: "",
      paymentMethod: undefined,
      recurrence: "unique",
      amount: "",
      frequency: null,
      installments: "",
    },
  });

  const { handleSubmit, watch, clearErrors, setValue } = formProps;

  const [recurrence, purpose] = watch(["recurrence", "purpose"]);

  const formValidations = {
    description: { required: "is required" },
    transactedAt: { required: "is required" },
    purpose: { required: "is required" },
    category: { required: "is required" },
    paymentMethod: {
      validate: {
        required: (value: string) => {
          if (!value && purpose === "expense") return "is required";
          return true;
        },
      },
    },
    recurrence: { required: "is required" },
    amount: {
      required: "is required",
    },
    frequency: {
      validate: {
        required: (value: string) => {
          if (
            !value &&
            (recurrence === "installment_based" ||
              recurrence === "fixed_periodic")
          )
            return "is required";
          return true;
        },
      },
    },
    installments: {
      validate: {
        required: (value: string) => {
          if (!value && recurrence === "installment_based")
            return "is required";
          return true;
        },
        min: (value: string) => {
          const numericValue = parseFloat(value);

          if (
            (isNaN(numericValue) || numericValue < 2) &&
            recurrence === "installment_based"
          )
            return "is invalid";
          return true;
        },
      },
    },
  };

  function onPurposeChange(option: SingleValue<Option>) {
    clearErrors();

    if (option && option.value === "revenue") {
      setValue("paymentMethod", undefined);
    }
  }

  function onRecurrenceChange(option: SingleValue<Option>) {
    clearErrors();

    if (!option) return;

    if (option.value === "unique") {
      setValue("frequency", null);
      setValue("installments", "");
    } else if (option.value === "fixed_periodic") {
      setValue("frequency", "monthly");
      setValue("installments", "");
    } else if (option.value === "installment_based") {
      setValue("frequency", "monthly");
      setValue("installments", "2");
    }
  }

  const supabaseClient = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const { mutateAsync: onSubmit, isLoading: isSubmitting } = useMutation(
    handleSubmit(
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
      }) => {
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
    formValidations,
    onPurposeChange,
    onRecurrenceChange,
    purpose,
    recurrence,
  };
}
