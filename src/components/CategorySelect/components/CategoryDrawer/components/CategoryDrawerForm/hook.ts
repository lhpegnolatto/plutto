import { useMergeRefs } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { queryKeys } from "constants/queryKeys";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { postCategory } from "services/categories/post";
import { putCategory } from "services/categories/put";

import { Database } from "types/supabase.types";

export type FormData = {
  title: string;
  color: string;
};

interface UseCategoryDrawerFormProps {
  defaultValues?: FormData;
  onClose: (createdCategoryId?: string) => void;
  categoryId?: string;
}

export const formDefaultValues = {
  title: "",
  color: "",
};

export const formValidations = {
  title: { required: "fields.title.validations.required" },
  color: { required: "fields.color.validations.required" },
};

export function useCategoryDrawerForm({
  defaultValues,
  onClose,
  categoryId,
}: UseCategoryDrawerFormProps) {
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
    const data = await postCategory(supabaseClient, {
      payload: { title, color },
    });

    onClose(data?.id);
  }

  async function onPutSubmit({ title, color }: FormData) {
    if (!categoryId) {
      return;
    }

    await putCategory(supabaseClient, {
      payload: { title, color },
      categoryId,
    });

    onClose();
  }

  const { mutateAsync: onSubmit, isLoading: isSubmitting } = useMutation(
    async (data: FormData) =>
      categoryId ? onPutSubmit(data) : onPostSubmit(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.CATEGORIES);
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
