import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { SelectInstance } from "chakra-react-select";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { UseFormSetValue } from "react-hook-form";
import { useQuery } from "react-query";

import { Option } from "components/CreatableSelect";

import { Database } from "types/supabase.types";

interface UseCategorySelectProps {
  setValue: UseFormSetValue<any>;
}

export function useCategorySelect({ setValue }: UseCategorySelectProps) {
  const {
    isOpen: isCreateDrawerOpen,
    onClose: onCreateDrawerClose,
    onOpen: onCreateDrawerOpen,
  } = useDisclosure();

  const finalFocusRef = useRef<SelectInstance<Option> | null>(null);
  const defaultCategoryTitle = useRef("");

  function handleOnCreateDrawerOpen(inputValue = "") {
    defaultCategoryTitle.current = inputValue;

    onCreateDrawerOpen();
  }

  function handleOnCreateDrawerClose(createdCategoryId?: string) {
    if (finalFocusRef.current) {
      finalFocusRef.current.focus();
    }

    if (createdCategoryId) {
      setValue("category", createdCategoryId);
    }

    onCreateDrawerClose();
  }

  function getCategoryDrawerDefaultValues() {
    return {
      title: defaultCategoryTitle.current,
      color: "",
    };
  }

  const supabaseClient = useSupabaseClient<Database>();

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
    getCategoryDrawerDefaultValues,
  };
}
