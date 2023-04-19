import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { SelectInstance } from "chakra-react-select";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useQuery } from "react-query";

import { Option } from "components/CreatableSelect";

import { Database } from "types/supabase.types";
import { queryKeys } from "constants/queryKeys";
import { getAllCategories } from "services/categories/getAll";

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
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen,
  } = useDisclosure();

  const finalFocusRef = useRef<SelectInstance<Option> | null>(null);
  const defaultCategoryTitleRef = useRef("");

  function handleOnDrawerOpen(inputValue = "") {
    defaultCategoryTitleRef.current = inputValue;

    onDrawerOpen();
  }

  function handleOnDrawerClose() {
    if (finalFocusRef.current) {
      finalFocusRef.current.focus();
    }

    onDrawerClose();
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
    async () => await getAllCategories(supabaseClient),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  return {
    finalFocusRef,
    isCategoriesLoading,
    categories,
    isDrawerOpen,
    handleOnDrawerOpen,
    handleOnDrawerClose,
    defaultCategoryTitleRef,
    onCreateCategory,
    onDeleteCategory,
  };
}
