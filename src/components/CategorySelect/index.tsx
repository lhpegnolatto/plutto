import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";

import {
  CreatableSelect,
  CreatableSelectProps,
} from "components/CreatableSelect";
import { tagSelectComponents } from "components/Select";
import { CategoryDrawer } from "./components/CategoryDrawer";

import { useCategorySelect } from "./hook";
import { useTranslations } from "next-intl";

interface CategorySelectProps
  extends Omit<CreatableSelectProps, "onCreateOption" | "options"> {
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
}

export function CategorySelect({
  setValue,
  getValues,
  name,
  isDisabled,
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

  const t = useTranslations("categorySelect");

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
        isDisabled={isDisabled}
      >
        {t("actions.manage")}
      </Button>

      <CreatableSelect
        {...rest}
        name={name}
        ref={finalFocusRef}
        onCreateOption={handleOnDrawerOpen}
        formatCreateLabel={(inputValue) =>
          t("actions.createNewLabel", { inputValue })
        }
        components={tagSelectComponents}
        isLoading={isCategoriesLoading}
        options={categories.map(({ id, title, color }) => ({
          value: id,
          label: title,
          colorScheme: color,
        }))}
        isDisabled={isDisabled}
      />

      <CategoryDrawer
        isOpen={isDrawerOpen && !isDisabled}
        onClose={handleOnDrawerClose}
        onCreateCategory={onCreateCategory}
        onDeleteCategory={onDeleteCategory}
        newCategoryTitle={defaultCategoryTitleRef.current}
        categories={categories}
        isCategoriesLoading={isCategoriesLoading}
      />
    </Box>
  );
}
