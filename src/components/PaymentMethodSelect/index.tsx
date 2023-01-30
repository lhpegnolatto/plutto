import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";

import {
  CreatableSelect,
  CreatableSelectProps,
} from "components/CreatableSelect";
import { tagSelectComponents } from "components/Select";
import { PaymentMethodDrawer } from "./components/PaymentMethodDrawer";

import { usePaymentMethodSelect } from "./hook";

interface PaymentMethodSelectProps
  extends Omit<CreatableSelectProps, "onCreateOption" | "options"> {
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
}

export function PaymentMethodSelect({
  setValue,
  getValues,
  name,
  ...rest
}: PaymentMethodSelectProps) {
  const {
    finalFocusRef,
    isPaymentMethodsLoading,
    paymentMethods,
    isDrawerOpen,
    handleOnDrawerOpen,
    handleOnDrawerClose,
    defaultPaymentMethodTitleRef,
    onCreatePaymentMethod,
    onDeletePaymentMethod,
  } = usePaymentMethodSelect({ setValue, name, getValues });

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
        Manage payment methods
      </Button>

      <CreatableSelect
        {...rest}
        name={name}
        ref={finalFocusRef}
        onCreateOption={handleOnDrawerOpen}
        formatCreateLabel={(inputValue) =>
          `Create "${inputValue}" payment method`
        }
        components={tagSelectComponents}
        isLoading={isPaymentMethodsLoading}
        options={paymentMethods}
      />

      <PaymentMethodDrawer
        isOpen={isDrawerOpen}
        onClose={handleOnDrawerClose}
        onCreatePaymentMethod={onCreatePaymentMethod}
        onDeletePaymentMethod={onDeletePaymentMethod}
        newPaymentMethodTitle={defaultPaymentMethodTitleRef.current}
      />
    </Box>
  );
}
