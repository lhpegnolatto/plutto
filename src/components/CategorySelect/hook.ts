import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { SelectInstance } from "chakra-react-select";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useQuery } from "react-query";

import { Option } from "components/CreatableSelect";

import { Database } from "types/supabase.types";
import { queryKeys } from "constants/queryKeys";

interface UseCategorySelectProps {
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  name: string;
}

export function useCategorySelect({
  setValue,
  getValues,
  name,
}: UseCategorySelectProps) {
  const {
    isOpen: isCreateDrawerOpen,
    onClose: onCreateDrawerClose,
    onOpen: onCreateDrawerOpen,
  } = useDisclosure();

  const finalFocusRef = useRef<SelectInstance<Option> | null>(null);
  const defaultCategoryTitleRef = useRef("");

  function handleOnCreateDrawerOpen(inputValue = "") {
    defaultCategoryTitleRef.current = inputValue;

    onCreateDrawerOpen();
  }

  function handleOnCreateDrawerClose() {
    if (finalFocusRef.current) {
      finalFocusRef.current.focus();
    }

    onCreateDrawerClose();
  }

  function onCreateCategory(createdCategoryId: string) {
    setValue(name, createdCategoryId);
  }

  function onDeleteCategory(deletedCategoryId: string) {
    const currentCategoryId = getValues(name);

    if (currentCategoryId === deletedCategoryId) {
      setValue(name, "", { shouldValidate: true });
    }
  }

  const supabaseClient = useSupabaseClient<Database>();

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
      select: (data) =>
        data.map(({ id, title, color }) => ({
          value: id,
          label: title,
          colorScheme: color,
        })),
    }
  );

  return {
    finalFocusRef,
    isCategoriesLoading,
    categories,
    isCreateDrawerOpen,
    handleOnCreateDrawerOpen,
    handleOnCreateDrawerClose,
    defaultCategoryTitleRef,
    onCreateCategory,
    onDeleteCategory,
  };
}
