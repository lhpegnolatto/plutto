import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { SelectInstance } from "chakra-react-select";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { UseFormSetValue } from "react-hook-form";
import { useQuery } from "react-query";

import { Option } from "components/CreatableSelect";

import { Database } from "types/supabase.types";

type CategoryOption = {
  value: string;
  label: string;
  colorScheme: string;
};

interface UseCategorySelectProps {
  setValue: UseFormSetValue<any>;
}

export function useCategorySelect({ setValue }: UseCategorySelectProps) {
  const {
    isOpen: isCreatePopoverOpen,
    onClose: onCreatePopoverClose,
    onOpen: onCreatePopoverOpen,
  } = useDisclosure();

  const finalFocusRef = useRef<SelectInstance<Option> | null>(null);
  const defaultCategoryTitle = useRef("");

  function onCategoryCreate(inputValue: string) {
    defaultCategoryTitle.current = inputValue;

    onCreatePopoverOpen();
  }

  function handleOnCreatePopoverClose(createdCategoryId?: string) {
    if (finalFocusRef.current) {
      finalFocusRef.current.focus();
    }

    if (createdCategoryId) {
      setValue("category", createdCategoryId);
    }

    onCreatePopoverClose();
  }

  function getCategoryPopoverDefaultValues() {
    return {
      title: defaultCategoryTitle.current,
      color: "",
    };
  }

  const supabaseClient = useSupabaseClient<Database>();

  const { isLoading: isCategoriesLoading, data: categories = [] } = useQuery<
    CategoryOption[]
  >(
    "categories",
    async () => {
      const { data } = await supabaseClient
        .from("categories")
        .select("id, title, color");

      if (data) {
        return data.map(({ id, title, color }) => ({
          value: id,
          label: title,
          colorScheme: color,
        }));
      }

      return [];
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  return {
    finalFocusRef,
    onCategoryCreate,
    isCategoriesLoading,
    categories,
    isCreatePopoverOpen,
    handleOnCreatePopoverClose,
    getCategoryPopoverDefaultValues,
  };
}
