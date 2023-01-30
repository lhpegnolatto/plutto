import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerProps,
  SlideFade,
  Box,
} from "@chakra-ui/react";

import { PaymentMethodDrawerForm } from "./components/PaymentMethodDrawerForm";
import { PaymentMethodDrawerList } from "./components/PaymentMethodDrawerList";
import { usePaymentMethodDrawer } from "./hook";

export type PaymentMethodFormItem = {
  id?: string;
  title: string;
  color: string;
};

interface PaymentMethodDrawerProps
  extends Omit<DrawerProps, "onClose" | "children"> {
  isOpen: boolean;
  onClose: () => void;
  onCreatePaymentMethod: (createdPaymentMethodId: string) => void;
  onDeletePaymentMethod: (deletedPaymentMethodId: string) => void;
  newPaymentMethodTitle: string;
}

export function PaymentMethodDrawer({
  isOpen,
  onClose,
  onCreatePaymentMethod,
  onDeletePaymentMethod,
  newPaymentMethodTitle,
  ...rest
}: PaymentMethodDrawerProps) {
  const {
    currentView,
    onOpenPaymentMethodForm,
    onClosePaymentMethodForm,
    defaultValuesRef,
  } = usePaymentMethodDrawer({ onCreatePaymentMethod, newPaymentMethodTitle });

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
                <PaymentMethodDrawerList
                  onClose={onClose}
                  onOpenPaymentMethodForm={onOpenPaymentMethodForm}
                  onDeletePaymentMethod={onDeletePaymentMethod}
                />
              </SlideFade>
            </Box>

            <Box position="absolute" w="full">
              <SlideFade
                in={currentView === "form"}
                unmountOnExit
                custom={{ offsetX: 80, reverse: true }}
              >
                <PaymentMethodDrawerForm
                  onClose={onClosePaymentMethodForm}
                  defaultValues={defaultValuesRef.current}
                  paymentMethodId={defaultValuesRef.current?.id}
                />
              </SlideFade>
            </Box>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
