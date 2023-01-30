import { useMergeRefs } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { queryKeys } from "constants/queryKeys";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { Database } from "types/supabase.types";

export type FormData = {
  title: string;
  color: string;
};

interface UsePaymentMethodDrawerFormProps {
  defaultValues?: FormData;
  onClose: (createdPaymentMethodId?: string) => void;
  paymentMethodId?: string;
}

export const formDefaultValues = {
  title: "",
  color: "",
};

export const formValidations = {
  title: { required: "Title is required" },
  color: { required: "Color is required" },
};

export function usePaymentMethodDrawerForm({
  defaultValues,
  onClose,
  paymentMethodId,
}: UsePaymentMethodDrawerFormProps) {
  const initialFocusRef = useRef(null);

  const formProps = useForm<FormData>({
    defaultValues: {
      ...formDefaultValues,
      ...(defaultValues || {}),
    },
  });

  const { ref: titleInputRef, ...titleInputProps } = formProps.register(
    "title",
    formValidations["title"]
  );
  const titleInputMergedRefs = useMergeRefs(initialFocusRef, titleInputRef);

  const supabaseClient = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const { mutateAsync: onSubmit, isLoading: isSubmitting } = useMutation(
    async ({ title, color }: FormData) => {
      if (paymentMethodId) {
        await supabaseClient
          .from("payment_methods")
          .update({ title, color })
          .eq("id", paymentMethodId);

        onClose();
      } else {
        const { data } = await supabaseClient
          .from("payment_methods")
          .insert({ title, color })
          .select("id, title, color")
          .maybeSingle();

        onClose(data?.id);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.PAYMENT_METHODS);
      },
    }
  );

  return {
    titleInputMergedRefs,
    titleInputProps,
    formProps,
    onSubmit,
    isSubmitting,
  };
}
