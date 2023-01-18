import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  ResponsiveValue,
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
  errorMessageSize = "sm",
  helperMessage = "",
  size = "sm",
  ...rest
}: FormFieldProps) {
  return (
    <FormControl isInvalid={!!errorMessage} {...rest} size={size}>
      <FormLabel fontSize={size}>{label}</FormLabel>
      {children}
      {errorMessage && (
        <FormErrorMessage position="absolute" fontSize={errorMessageSize}>
          {errorMessage.toString()}
        </FormErrorMessage>
      )}
      {helperMessage && !errorMessage && (
        <FormHelperText position="absolute">{helperMessage}</FormHelperText>
      )}
    </FormControl>
  );
}

export default FormField;
