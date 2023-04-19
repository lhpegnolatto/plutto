import { useMergeRefs } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { queryKeys } from "constants/queryKeys";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { postPaymentMethod } from "services/paymentMethods/post";
import { putPaymentMethod } from "services/paymentMethods/put";

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
  title: { required: "fields.title.validations.required" },
  color: { required: "fields.color.validations.required" },
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

  async function onPostSubmit({ title, color }: FormData) {
    const data = await postPaymentMethod(supabaseClient, {
      payload: { title, color },
    });

    onClose(data?.id);
  }

  async function onPutSubmit({ title, color }: FormData) {
    if (!paymentMethodId) {
      return;
    }

    await putPaymentMethod(supabaseClient, {
      payload: { title, color },
      paymentMethodId,
    });

    onClose();
  }

  const { mutateAsync: onSubmit, isLoading: isSubmitting } = useMutation(
    async (data: FormData) =>
      paymentMethodId ? onPutSubmit(data) : onPostSubmit(data),
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
