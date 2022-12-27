import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";

function FormGrid(props: SimpleGridProps) {
  return (
    <SimpleGrid columns={12} spacing="4" maxW="7xl" {...props}></SimpleGrid>
  );
}

export default FormGrid;
