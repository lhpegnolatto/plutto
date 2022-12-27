import { Box, BoxProps } from "@chakra-ui/react";

function FormRoot(props: BoxProps) {
  return <Box as="form" {...props} />;
}

export default FormRoot;
