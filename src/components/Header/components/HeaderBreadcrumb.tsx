import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";

export function HeaderBreadcrumb() {
  return (
    <Breadcrumb
      spacing="2"
      separator={<Icon as={FiChevronRight} color="gray.500" />}
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
