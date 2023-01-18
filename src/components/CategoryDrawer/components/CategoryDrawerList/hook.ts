import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Database } from "types/supabase.types";

export function useCategoryDrawerList() {
  const supabaseClient = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const { isLoading: isCategoriesLoading, data: categories = [] } = useQuery(
    "categories",
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
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );

  return { isCategoriesLoading, categories, isDeleting, onDelete };
}
