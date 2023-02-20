import {
  NumberInput,
  NumberInputField,
  NumberInputFieldProps,
} from "@chakra-ui/react";
import { Control, useController, UseControllerProps } from "react-hook-form";

interface CurrencyInputProps
  extends Omit<UseControllerProps, "defaultValue">,
    NumberInputFieldProps {
  name: string;
  control: Control<any>;
}

export function CurrencyInput({
  name,
  control,
  rules,
  shouldUnregister,
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

  const parse = (val: string) => val.replace(/^\$/, "");
  const format = (val: string) => (!!val ? `$${val}` : "");

  return (
    <NumberInput
      onChange={(valueAsString) => onChange(parse(valueAsString))}
      value={format(value)}
      pattern="\$[0-9]*(.[0-9]+)?"
    >
      <NumberInputField ref={ref} onBlur={onBlur} {...props} />
    </NumberInput>
  );
}
