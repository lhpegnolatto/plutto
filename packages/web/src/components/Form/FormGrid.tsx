import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";

function FormGrid(props: SimpleGridProps) {
  return <SimpleGrid columns={12} spacing="6" {...props} />;
}

export default FormGrid;
