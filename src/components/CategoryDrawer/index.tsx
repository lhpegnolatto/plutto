import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerProps,
  SlideFade,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

import { CategoryDrawerForm } from "./components/CategoryDrawerForm";
import { FormData } from "./components/CategoryDrawerForm/hook";
import { CategoryDrawerList } from "./components/CategoryDrawerList";

interface CategoryDrawerProps
  extends Omit<DrawerProps, "onClose" | "children"> {
  getDefaultValues: () => FormData;
  isOpen: boolean;
  onClose: (createdCategoryId?: string) => void;
}

export function CategoryDrawer({
  getDefaultValues,
  isOpen,
  onClose,
  ...rest
}: CategoryDrawerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
                in={!isSubmitting}
                unmountOnExit
                custom={{ offsetX: -80 }}
              >
                <CategoryDrawerList
                  onClose={onClose}
                  setIsSubmitting={setIsSubmitting}
                />
              </SlideFade>
            </Box>

            <Box position="absolute" w="full">
              <SlideFade
                in={isSubmitting}
                unmountOnExit
                custom={{ offsetX: 80, reverse: true }}
              >
                <CategoryDrawerForm onClose={() => setIsSubmitting(false)} />
              </SlideFade>
            </Box>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
