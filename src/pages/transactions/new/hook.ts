import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import { useBreadcrumb } from "contexts/BreadcrumbContext";

import { Database } from "types/supabase";

type CategoryOption = {
  value: string;
  label: string;
  colorScheme: string;
};

export function useNewTransaction() {
  useBreadcrumb([
    { title: "Transactions", path: "/transactions" },
    { title: "New", path: "/transactions/new" },
  ]);

  const formProps = useForm();
  const { handleSubmit } = formProps;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const supabaseClient = useSupabaseClient<Database>();
  const { id: userId } = useUser() || {};

  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  useEffect(() => {
    async function getCategories() {
      setIsCategoriesLoading(true);

      const { data } = await supabaseClient
        .from("categories")
        .select()
        .eq("user_id", userId);

      if (data) {
        setCategories(
          data.map(({ id, title, color }) => ({
            value: id,
            label: title,
            colorScheme: color,
          }))
        );
      }

      setIsCategoriesLoading(false);
    }

    if (userId) {
      getCategories();
    }
  }, [userId]);

  return {
    formProps,
    categories,
    onSubmit,
    isCategoriesLoading,
  };
}
