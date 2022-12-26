import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useBreadcrumb } from "contexts/BreadcrumbContext";

export function HeaderBreadcrumb() {
  const { asPath } = useRouter();

  const { breadcrumbItems } = useBreadcrumb();

  const separatorColor = useColorModeValue("gray.400", "gray.600");

  return (
    <Breadcrumb
      spacing="3"
      separator={<Text color={separatorColor}>/</Text>}
      sx={{ "li > span": { display: "flex" } }}
    >
      {breadcrumbItems.map(({ title, path }) => {
        const isCurrentPage = asPath === path;

        return (
          <BreadcrumbItem
            key={path}
            isCurrentPage={isCurrentPage}
            fontSize="xs"
            fontWeight={isCurrentPage ? "semibold" : "regular"}
          >
            <Link href={path} passHref legacyBehavior>
              <BreadcrumbLink>{title}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
