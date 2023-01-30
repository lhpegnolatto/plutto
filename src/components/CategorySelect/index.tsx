import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";

import {
  CreatableSelect,
  CreatableSelectProps,
} from "components/CreatableSelect";
import { tagSelectComponents } from "components/Select";
import { CategoryDrawer } from "./components/CategoryDrawer";

import { useCategorySelect } from "./hook";

interface CategorySelectProps
  extends Omit<CreatableSelectProps, "onCreateOption" | "options"> {
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
}

export function CategorySelect({
  setValue,
  getValues,
  name,
  ...rest
}: CategorySelectProps) {
  const {
    finalFocusRef,
    isCategoriesLoading,
    categories,
    isDrawerOpen,
    handleOnDrawerOpen,
    handleOnDrawerClose,
    defaultCategoryTitleRef,
    onCreateCategory,
    onDeleteCategory,
  } = useCategorySelect({ setValue, name, getValues });

  return (
    <Box position="relative">
      <Button
        size="xs"
        variant="link"
        colorScheme="blue"
        position="absolute"
        top="-6"
        right="0"
        padding="0"
        onClick={() => handleOnDrawerOpen()}
        textDecoration="none !important"
      >
        Manage categories
      </Button>

      <CreatableSelect
        {...rest}
        name={name}
        ref={finalFocusRef}
        onCreateOption={handleOnDrawerOpen}
        formatCreateLabel={(inputValue) => `Create "${inputValue}" category`}
        components={tagSelectComponents}
        isLoading={isCategoriesLoading}
        options={categories}
      />

      <CategoryDrawer
        isOpen={isDrawerOpen}
        onClose={handleOnDrawerClose}
        onCreateCategory={onCreateCategory}
        onDeleteCategory={onDeleteCategory}
        newCategoryTitle={defaultCategoryTitleRef.current}
      />
    </Box>
  );
}
