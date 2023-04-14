import {
  NumberInput,
  NumberInputField,
  NumberInputFieldProps,
} from "@chakra-ui/react";
import { useFormatter } from "next-intl";
import { Control, useController, UseControllerProps } from "react-hook-form";

interface CurrencyInputProps
  extends Omit<UseControllerProps, "defaultValue">,
    NumberInputFieldProps {
  name: string;
  control: Control<any>;
  canBeNegative?: boolean;
}

const INPUT_PRECISION = 2;

export function CurrencyInput({
  name,
  control,
  rules,
  shouldUnregister,
  canBeNegative = false,
  placeholder,
  ...props
}: CurrencyInputProps) {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules,
    shouldUnregister,
  });

  const f = useFormatter();

  const getPlaceholder = () => {
    if (placeholder) {
      return placeholder;
    }

    return f.number(0, "currency");
  };

  const parse = (value: string) => {
    const sign = canBeNegative && value.includes("-") ? "-" : "";

    value = value.replace(/[^\d]/g, "");
    const hasMinLengthForPrecision = value.length > INPUT_PRECISION;
    const decimal = hasMinLengthForPrecision
      ? value.slice(-2)
      : value.padStart(2, "0");
    const integer = hasMinLengthForPrecision
      ? value.slice(0, value.length - 2)
      : "0";

    const parsedNumber = [...(sign ? [sign] : []), integer, decimal].join(".");
    return parsedNumber;
  };

  const format = (value: string) => {
    if (!value) {
      return "";
    }

    const formattedNumber = f.number(parseFloat(value), "currency");
    return formattedNumber;
  };

  return (
    <NumberInput
      onChange={(_, valueAsNumber) => {
        onChange(valueAsNumber);
      }}
      value={format(value)}
      pattern=".*[0-9]*(.[0-9]+)?"
      parse={parse}
      clampValueOnBlur={false}
    >
      <NumberInputField
        ref={ref}
        onBlur={onBlur}
        placeholder={getPlaceholder()}
        {...props}
      />
    </NumberInput>
  );
}
