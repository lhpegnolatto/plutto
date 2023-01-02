import { useRef, useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { SelectInstance } from "chakra-react-select";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { UseFormSetValue } from "react-hook-form";

import {
  CreatableSelect,
  CreatableSelectProps,
  Option,
} from "components/CreatableSelect";
import { tagSelectComponents } from "components/Select";
import { CategoryPopover, CreatedCategory } from "./components/CategoryPopover";

import { Database } from "types/supabase.types";

type CategoryOption = {
  value: string;
  label: string;
  colorScheme: string;
};

interface CategorySelectProps
  extends Omit<CreatableSelectProps, "onCreateOption" | "options"> {
  setValue: UseFormSetValue<any>;
}

export function CategorySelect({ setValue, ...rest }: CategorySelectProps) {
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

  function handleOnCreatePopoverClose(createdCategory?: CreatedCategory) {
    if (finalFocusRef.current) {
      finalFocusRef.current.focus();
    }

    if (createdCategory) {
      const { id, title, color } = createdCategory;

      setCategories((currentCategories) => [
        ...currentCategories,
        {
          value: id,
          label: title,
          colorScheme: color,
        },
      ]);

      setValue("category", id);
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
  const { id: userId } = useUser() || {};

  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  useEffect(() => {
    async function getCategories() {
      setIsCategoriesLoading(true);

      const { data } = await supabaseClient
        .from("categories")
        .select("id, title, color")
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

  return (
    <>
      <CreatableSelect
        {...rest}
        ref={finalFocusRef}
        onCreateOption={onCategoryCreate}
        formatCreateLabel={(inputValue) => `Create "${inputValue}" category`}
        components={tagSelectComponents}
        isLoading={isCategoriesLoading}
        options={categories}
      />

      <CategoryPopover
        isOpen={isCreatePopoverOpen}
        onClose={handleOnCreatePopoverClose}
        getDefaultValues={getCategoryPopoverDefaultValues}
      />
    </>
  );
}
