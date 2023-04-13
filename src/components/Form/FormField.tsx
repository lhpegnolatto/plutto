import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  useColorModeValue,
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
  size = "sm",
  ...rest
}: FormFieldProps) {
  const isInvalid = !!errorMessage;
  const errorColor = useColorModeValue("red.500", "red.300");

  return (
    <FormControl isInvalid={isInvalid} {...rest} size={size}>
      <FormLabel fontSize={size} {...(isInvalid && { color: errorColor })}>
        {label}
        {isInvalid && ` ${errorMessage}`}
      </FormLabel>
      {children}
      {helperMessage && (
        <FormHelperText position="absolute" bottom="-5">
          {helperMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default FormField;
