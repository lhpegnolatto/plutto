import { useEffect, useRef, useState } from "react";

import { formDefaultValues } from "./components/CategoryDrawerForm/hook";

export type CategoryFormItem = {
  id?: string;
  title: string;
  color: string;
};

interface UseCategoryDrawerProps {
  onCreateCategory: (createdCategoryId: string) => void;
  newCategoryTitle: string;
}

export function useCategoryDrawer({
  newCategoryTitle,
  onCreateCategory,
}: UseCategoryDrawerProps) {
  const [currentView, setCurrentView] = useState<"list" | "form">("list");
  const defaultValuesRef = useRef<CategoryFormItem>();

  function onOpenCategoryForm(value?: CategoryFormItem) {
    defaultValuesRef.current = { ...formDefaultValues, ...value };
    setCurrentView("form");
  }

  function onCloseCategoryForm(createdCategoryId?: string) {
    defaultValuesRef.current = undefined;
    setCurrentView("list");

    if (createdCategoryId) {
      onCreateCategory(createdCategoryId);
    }
  }

  useEffect(() => {
    if (newCategoryTitle) {
      onOpenCategoryForm({ ...formDefaultValues, title: newCategoryTitle });
    }
  }, [newCategoryTitle]);

  return {
    currentView,
    onOpenCategoryForm,
    onCloseCategoryForm,
    defaultValuesRef,
  };
}
