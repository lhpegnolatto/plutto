import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useAppLayoutContext } from "contexts/AppLayoutContext";

export function HeaderBreadcrumb() {
  const { breadcrumbItems } = useAppLayoutContext();

  const separatorColor = useColorModeValue("gray.400", "gray.600");

  return (
    <Breadcrumb
      spacing="3"
      separator={<Text color={separatorColor}>/</Text>}
      sx={{ "li > span": { display: "flex" } }}
    >
      {breadcrumbItems.map(({ title, path, isCurrentPage }) => (
        <BreadcrumbItem
          key={path}
          isCurrentPage={isCurrentPage}
          fontSize={isCurrentPage ? "sm" : "xs"}
        >
          <BreadcrumbLink href={path}>{title}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
