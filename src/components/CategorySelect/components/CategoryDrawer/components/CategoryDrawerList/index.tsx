import {
  Button,
  Text,
  IconButton,
  Icon,
  Flex,
  Tag,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Skeleton,
} from "@chakra-ui/react";
import { ConfirmationAlertDialog } from "components/ConfirmationAlertDialog";
import { HiOutlinePencil, HiOutlineTrash, HiXMark } from "react-icons/hi2";

import { colorsOptions } from "../../data";
import { useCategoryDrawerList } from "./hook";
import { useTranslations } from "next-intl";

type CategoryListItem = {
  id: string;
  title: string;
  color: string;
};

type Category = {
  id: string;
  title: string;
  color: string;
};

interface CategoryDrawerListProps {
  onClose: () => void;
  onOpenCategoryForm: (category?: CategoryListItem) => void;
  onDeleteCategory: (deletedCategoryId: string) => void;
  categories: Category[];
  isCategoriesLoading: boolean;
}

export function CategoryDrawerList({
  onClose,
  onOpenCategoryForm,
  onDeleteCategory,
  categories,
  isCategoriesLoading,
}: CategoryDrawerListProps) {
  const { isDeleting, onDelete } = useCategoryDrawerList({ onDeleteCategory });

  const t = useTranslations("categoriesList");

  return (
    <>
      <Flex mt="6" mb="10" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <IconButton
            aria-label={t("actions.close")}
            icon={<Icon as={HiXMark} />}
            size="sm"
            mr="4"
            onClick={() => onClose()}
          />
          <Text fontSize="md" fontWeight="bold" mr="4">
            {t("title")}
          </Text>
        </Flex>

        <Button
          onClick={() => onOpenCategoryForm()}
          size="sm"
          colorScheme="brand"
        >
          {t("actions.new")}
        </Button>
      </Flex>

      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>{t("table.headers.title")}</Th>
              <Th>{t("table.headers.color")}</Th>
              <Th w="1px" />
            </Tr>
          </Thead>
          <Tbody>
            {categories.map(({ id, title, color }) => (
              <Tr key={id}>
                <Td>{title}</Td>
                <Td>
                  <Tag colorScheme={color}>
                    {colorsOptions.find(({ value }) => value === color)?.label}
                  </Tag>
                </Td>
                <Td>
                  <Flex justifyContent="space-between">
                    <IconButton
                      aria-label={t("table.actions.edit")}
                      icon={<Icon as={HiOutlinePencil} />}
                      size="xs"
                      colorScheme="blue"
                      mr="2"
                      onClick={() => onOpenCategoryForm({ id, title, color })}
                    />
                    <ConfirmationAlertDialog
                      onConfirm={() => onDelete(id)}
                      confirmButtonText={t("table.actions.confirmDelete")}
                    >
                      {(onClick) => (
                        <IconButton
                          aria-label={t("table.actions.delete")}
                          icon={<Icon as={HiOutlineTrash} />}
                          size="xs"
                          colorScheme="red"
                          onClick={onClick}
                          isLoading={isDeleting}
                        />
                      )}
                    </ConfirmationAlertDialog>
                  </Flex>
                </Td>
              </Tr>
            ))}
            {!isCategoriesLoading && categories.length === 0 && (
              <Tr>
                <Td colSpan={3}>
                  <Flex
                    py="4"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="md"
                  >
                    {t("table.empty")}
                  </Flex>
                </Td>
              </Tr>
            )}
            {isCategoriesLoading && (
              <Tr>
                <Td>
                  <Skeleton height="25px" w="100%" />
                </Td>
                <Td>
                  <Skeleton height="25px" w="100%" />
                </Td>
                <Td>
                  <Skeleton height="25px" w="100%" />
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
