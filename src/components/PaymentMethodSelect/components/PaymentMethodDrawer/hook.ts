import { useEffect, useRef, useState } from "react";

import { formDefaultValues } from "./components/PaymentMethodDrawerForm/hook";

export type PaymentMethodFormItem = {
  id?: string;
  title: string;
  color: string;
};

interface UsePaymentMethodDrawerProps {
  onCreatePaymentMethod: (createdPaymentMethodId: string) => void;
  newPaymentMethodTitle: string;
}

export function usePaymentMethodDrawer({
  newPaymentMethodTitle,
  onCreatePaymentMethod,
}: UsePaymentMethodDrawerProps) {
  const [currentView, setCurrentView] = useState<"list" | "form">("list");
  const defaultValuesRef = useRef<PaymentMethodFormItem>();

  function onOpenPaymentMethodForm(value?: PaymentMethodFormItem) {
    defaultValuesRef.current = { ...formDefaultValues, ...value };
    setCurrentView("form");
  }

  function onClosePaymentMethodForm(createdPaymentMethodId?: string) {
    defaultValuesRef.current = undefined;
    setCurrentView("list");

    if (createdPaymentMethodId) {
      onCreatePaymentMethod(createdPaymentMethodId);
    }
  }

  useEffect(() => {
    if (newPaymentMethodTitle) {
      onOpenPaymentMethodForm({
        ...formDefaultValues,
        title: newPaymentMethodTitle,
      });
    }
  }, [newPaymentMethodTitle]);

  return {
    currentView,
    onOpenPaymentMethodForm,
    onClosePaymentMethodForm,
    defaultValuesRef,
  };
}
