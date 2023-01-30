import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { SelectInstance } from "chakra-react-select";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useQuery } from "react-query";

import { Option } from "components/CreatableSelect";

import { Database } from "types/supabase.types";
import { queryKeys } from "constants/queryKeys";

interface UsePaymentMethodSelectProps {
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  name: string;
}

export function usePaymentMethodSelect({
  setValue,
  getValues,
  name,
}: UsePaymentMethodSelectProps) {
  const {
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen,
  } = useDisclosure();

  const finalFocusRef = useRef<SelectInstance<Option> | null>(null);
  const defaultPaymentMethodTitleRef = useRef("");

  function handleOnDrawerOpen(inputValue = "") {
    defaultPaymentMethodTitleRef.current = inputValue;

    onDrawerOpen();
  }

  function handleOnDrawerClose() {
    if (finalFocusRef.current) {
      finalFocusRef.current.focus();
    }

    onDrawerClose();
  }

  function onCreatePaymentMethod(createdPaymentMethodId: string) {
    setValue(name, createdPaymentMethodId);
  }

  function onDeletePaymentMethod(deletedPaymentMethodId: string) {
    const currentPaymentMethodId = getValues(name);

    if (currentPaymentMethodId === deletedPaymentMethodId) {
      setValue(name, "", { shouldValidate: true });
    }
  }

  const supabaseClient = useSupabaseClient<Database>();

  const { isLoading: isPaymentMethodsLoading, data: paymentMethods = [] } =
    useQuery(
      queryKeys.PAYMENT_METHODS,
      async () => {
        const { data } = await supabaseClient
          .from("payment_methods")
          .select("id, title, color");

        return data || [];
      },
      {
        staleTime: 1000 * 60, // 1 minute
      }
    );

  return {
    finalFocusRef,
    isPaymentMethodsLoading,
    paymentMethods,
    isDrawerOpen,
    handleOnDrawerOpen,
    handleOnDrawerClose,
    defaultPaymentMethodTitleRef,
    onCreatePaymentMethod,
    onDeletePaymentMethod,
  };
}
