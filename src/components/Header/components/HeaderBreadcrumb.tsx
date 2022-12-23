import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export function HeaderBreadcrumb() {
  const separatorColor = useColorModeValue("gray.400", "gray.600");

  return (
    <Breadcrumb
      spacing="3"
      separator={<Text color={separatorColor}>/</Text>}
      fontSize="xs"
      sx={{ "li > span": { display: "flex" } }}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="/">About</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="/">Contact</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
