import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  ResponsiveValue,
  useColorModeValue,
} from "@chakra-ui/react";

interface FormFieldProps extends FormControlProps {
  children: React.ReactNode;
  label: string;
  errorMessage?: string;
  errorMessageSize?: ResponsiveValue<string>;
  helperMessage?: string;
}

function FormField({
  children,
  label,
  errorMessage = "",
  errorMessageSize = "xs",
  helperMessage = "",
  size = "sm",
  ...rest
}: FormFieldProps) {
  const isInvalid = !!errorMessage;
  const errorColor = useColorModeValue("red.500", "red.300");

  return (
    <FormControl isInvalid={isInvalid} {...rest} size={size}>
      <FormLabel fontSize={size} color={isInvalid ? errorColor : undefined}>
        {label}
        {isInvalid && ` ${errorMessage}`}
      </FormLabel>
      {children}
      {helperMessage && (
        <FormHelperText position="absolute">{helperMessage}</FormHelperText>
      )}
    </FormControl>
  );
}

export default FormField;
