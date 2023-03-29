import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

export type BreadcrumbItem = {
  title: string;
  path: string;
  isCurrentPage?: boolean;
};

interface HeaderBreadcrumbProps {
  items: Array<BreadcrumbItem>;
}

export function HeaderBreadcrumb({ items }: HeaderBreadcrumbProps) {
  const separatorColor = useColorModeValue("gray.400", "gray.600");

  return (
    <Breadcrumb
      spacing="3"
      separator={<Text color={separatorColor}>/</Text>}
      sx={{ "li > span": { display: "flex" } }}
    >
      {items.map(({ title, path, isCurrentPage }) => {
        return (
          <BreadcrumbItem
            key={path}
            isCurrentPage={isCurrentPage}
            fontSize="xs"
            fontWeight={isCurrentPage ? "semibold" : "regular"}
          >
            <Link href={isCurrentPage ? "#" : path} passHref legacyBehavior>
              <BreadcrumbLink>{title}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
