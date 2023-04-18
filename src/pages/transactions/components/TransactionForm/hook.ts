import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { SingleValue } from "chakra-react-select";
import { useEffect } from "react";

import { Option } from "components/Select";
import { queryKeys } from "constants/queryKeys";
import { getDateTimeInputDefaultValue } from "utils/getDateTimeInputDefaultValue";

type Purpose = "expense" | "revenue";

export type TransactionFormData = {
  description: string;
  transactedAt: string;
  purpose: Purpose;
  category: string;
  paymentMethod?: string;
  recurrence: "unique" | "installment_based" | "fixed_periodic";
  amount: string;
  frequency: "monthly" | "daily" | "weekly" | "yearly" | null;
  installments: string;
};

interface UseTransactionFormProps {
  onSubmit: (formData: TransactionFormData) => void;
  defaultValues: TransactionFormData;
}

export const transactionFormDefaultValues = {
  description: "",
  transactedAt: getDateTimeInputDefaultValue(),
  purpose: "expense",
  category: "",
  paymentMethod: undefined,
  recurrence: "unique",
  amount: "",
  frequency: null,
  installments: "",
};

export function useTransactionForm({
  onSubmit,
  defaultValues,
}: UseTransactionFormProps) {
  const formProps = useForm<TransactionFormData>({
    defaultValues,
  });

  const { handleSubmit, watch, clearErrors, setValue, reset } = formProps;

  const [recurrence, purpose] = watch(["recurrence", "purpose"]);

  const formValidations = {
    description: { required: "description.validations.required" },
    transactedAt: { required: "transactedAt.validations.required" },
    purpose: { required: "purpose.validations.required" },
    category: { required: "category.validations.required" },
    paymentMethod: {
      validate: {
        required: (value: string) => {
          if (!value && purpose === "expense")
            return "paymentMethod.validations.required";
          return true;
        },
      },
    },
    recurrence: { required: "recurrence.validations.required" },
    amount: {
      required: "amount.validations.required",
    },
    frequency: {
      validate: {
        required: (value: string) => {
          if (
            !value &&
            (recurrence === "installment_based" ||
              recurrence === "fixed_periodic")
          )
            return "frequency.validations.required";
          return true;
        },
      },
    },
    installments: {
      validate: {
        required: (value: string) => {
          if (!value && recurrence === "installment_based")
            return "installments.validations.required";
          return true;
        },
        min: (value: string) => {
          const numericValue = parseFloat(value);

          if (
            (isNaN(numericValue) || numericValue < 2) &&
            recurrence === "installment_based"
          )
            return "installments.validations.invalid";
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

  const queryClient = useQueryClient();

  const { mutateAsync: handleOnSubmit, isLoading: isSubmitting } = useMutation(
    handleSubmit(onSubmit),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.TRANSACTIONS);
      },
    }
  );

  useEffect(() => {
    reset({ ...transactionFormDefaultValues, ...defaultValues });
  }, [defaultValues, reset]);

  return {
    formProps,
    handleOnSubmit,
    isSubmitting,
    formValidations,
    onPurposeChange,
    onRecurrenceChange,
    purpose,
    recurrence,
  };
}
