import { UseFormSetValue } from "react-hook-form";

import {
  CreatableSelect,
  CreatableSelectProps,
} from "components/CreatableSelect";
import { tagSelectComponents } from "components/Select";
import { CategoryPopover } from "./components/CategoryPopover";

import { useCategorySelect } from "./hook";

interface CategorySelectProps
  extends Omit<CreatableSelectProps, "onCreateOption" | "options"> {
  setValue: UseFormSetValue<any>;
}

export function CategorySelect({ setValue, ...rest }: CategorySelectProps) {
  const {
    finalFocusRef,
    onCategoryCreate,
    isCategoriesLoading,
    categories,
    isCreatePopoverOpen,
    handleOnCreatePopoverClose,
    getCategoryPopoverDefaultValues,
  } = useCategorySelect({ setValue });

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
