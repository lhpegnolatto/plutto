import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Database } from "types/supabase.types";

interface UseCategoryDrawerListProps {
  onDeleteCategory: (deletedCategoryId: string) => void;
}

export function useCategoryDrawerList({
  onDeleteCategory,
}: UseCategoryDrawerListProps) {
  const supabaseClient = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const { isLoading: isCategoriesLoading, data: categories = [] } = useQuery(
    queryKeys.CATEGORIES,
    async () => {
      const { data } = await supabaseClient
        .from("categories")
        .select("id, title, color");

      return data || [];
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  const { mutateAsync: onDelete, isLoading: isDeleting } = useMutation(
    async (categoryId: string) => {
      await supabaseClient
        .from("categories")
        .delete()
        .match({ id: categoryId });

      onDeleteCategory(categoryId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.CATEGORIES);
      },
    }
  );

  return { isCategoriesLoading, categories, isDeleting, onDelete };
}
