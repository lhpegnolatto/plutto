import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerProps,
  SlideFade,
  Box,
} from "@chakra-ui/react";

import { CategoryDrawerForm } from "./components/CategoryDrawerForm";
import { CategoryDrawerList } from "./components/CategoryDrawerList";
import { useCategoryDrawer } from "./hook";

export type CategoryFormItem = {
  id?: string;
  title: string;
  color: string;
};

type Category = {
  id: string;
  title: string;
  color: string;
};

interface CategoryDrawerProps
  extends Omit<DrawerProps, "onClose" | "children"> {
  isOpen: boolean;
  onClose: () => void;
  onCreateCategory: (createdCategoryId: string) => void;
  onDeleteCategory: (deletedCategoryId: string) => void;
  newCategoryTitle: string;
  categories: Category[];
  isCategoriesLoading: boolean;
}

export function CategoryDrawer({
  isOpen,
  onClose,
  onCreateCategory,
  onDeleteCategory,
  newCategoryTitle,
  categories,
  isCategoriesLoading,
  ...rest
}: CategoryDrawerProps) {
  const {
    currentView,
    onOpenCategoryForm,
    onCloseCategoryForm,
    defaultValuesRef,
  } = useCategoryDrawer({ onCreateCategory, newCategoryTitle });

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="md"
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <Box position="relative">
            <Box position="absolute" w="full">
              <SlideFade
                in={currentView === "list"}
                unmountOnExit
                custom={{ offsetX: -80 }}
              >
                <CategoryDrawerList
                  onClose={onClose}
                  onOpenCategoryForm={onOpenCategoryForm}
                  onDeleteCategory={onDeleteCategory}
                  categories={categories}
                  isCategoriesLoading={isCategoriesLoading}
                />
              </SlideFade>
            </Box>

            <Box position="absolute" w="full">
              <SlideFade
                in={currentView === "form"}
                unmountOnExit
                custom={{ offsetX: 80, reverse: true }}
              >
                <CategoryDrawerForm
                  onClose={onCloseCategoryForm}
                  defaultValues={defaultValuesRef.current}
                  categoryId={defaultValuesRef.current?.id}
                />
              </SlideFade>
            </Box>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
