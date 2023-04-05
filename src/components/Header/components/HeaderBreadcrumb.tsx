import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export type BreadcrumbItem = {
  titleKey: string;
  path: string;
  isCurrentPage?: boolean;
};

interface HeaderBreadcrumbProps {
  items: Array<BreadcrumbItem>;
}

export function HeaderBreadcrumb({ items }: HeaderBreadcrumbProps) {
  const separatorColor = useColorModeValue("gray.400", "gray.600");

  const t = useTranslations("pages");

  return (
    <Breadcrumb
      spacing={{ base: "1.5", md: "3" }}
      separator={<Text color={separatorColor}>/</Text>}
      sx={{ "li > span": { display: "flex" } }}
    >
      {items.map(({ titleKey, path, isCurrentPage }) => {
        const title = t(titleKey as any);

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
