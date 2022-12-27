import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";

interface FormFieldProps extends FormControlProps {
  children: React.ReactNode;
  label: string;
  errorMessage?: string;
  helperMessage?: string;
}

function FormField({
  children,
  label,
  errorMessage = "",
  helperMessage = "",
  ...rest
}: FormFieldProps) {
  return (
    <FormControl isInvalid={!!errorMessage} {...rest}>
      <FormLabel>{label}</FormLabel>
      {children}
      {errorMessage && (
        <FormErrorMessage position="absolute">
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
