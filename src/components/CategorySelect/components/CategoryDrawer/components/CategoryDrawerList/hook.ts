import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";
import { deleteCategory } from "services/categories/delete";

import { Database } from "types/supabase.types";

interface UseCategoryDrawerListProps {
  onDeleteCategory: (deletedCategoryId: string) => void;
}

export function useCategoryDrawerList({
  onDeleteCategory,
}: UseCategoryDrawerListProps) {
  const supabaseClient = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const { mutateAsync: onDelete, isLoading: isDeleting } = useMutation(
    async (categoryId: string) => {
      deleteCategory(supabaseClient, { categoryId });

      onDeleteCategory(categoryId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.CATEGORIES);
      },
    }
  );

  return { isDeleting, onDelete };
}
