import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

const breadcrumbItems = [
  [{ title: "Home", path: "/", shouldMatchExactHref: true }],
  [
    {
      title: "Transactions",
      path: "/transactions",
      shouldMatchExactHref: true,
    },
  ],
  [
    { title: "Transactions", path: "/transactions" },
    { title: "New", path: "/transactions/new", shouldMatchExactHref: true },
  ],
  [{ title: "Planned", path: "/planned", shouldMatchExactHref: true }],
];

export function HeaderBreadcrumb() {
  const { asPath } = useRouter();

  const separatorColor = useColorModeValue("gray.400", "gray.600");

  const currentPageBreadcrumbItems = breadcrumbItems.find((items) => {
    const { path: lastItemPath, shouldMatchExactHref } =
      items[items.length - 1];

    return shouldMatchExactHref
      ? lastItemPath === asPath
      : asPath.startsWith(lastItemPath);
  });

  return (
    <Breadcrumb
      spacing="3"
      separator={<Text color={separatorColor}>/</Text>}
      sx={{ "li > span": { display: "flex" } }}
    >
      {currentPageBreadcrumbItems &&
        currentPageBreadcrumbItems.map(
          ({ title, path, shouldMatchExactHref }, index) => {
            const isCurrentPage = shouldMatchExactHref
              ? path === asPath
              : index === currentPageBreadcrumbItems.length - 1 &&
                asPath.startsWith(path);

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
          }
        )}
    </Breadcrumb>
  );
}
