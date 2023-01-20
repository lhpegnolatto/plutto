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

interface CategoryDrawerListProps {
  onClose: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export function CategoryDrawerList({
  onClose,
  setIsSubmitting,
}: CategoryDrawerListProps) {
  const { isCategoriesLoading, categories, isDeleting, onDelete } =
    useCategoryDrawerList();

  return (
    <>
      <Flex mt="6" mb="10" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <IconButton
            aria-label="Close modal"
            icon={<Icon as={HiXMark} />}
            size="sm"
            mr="4"
            onClick={() => onClose()}
          />
          <Text fontSize="md" fontWeight="bold" mr="4">
            List of categories
          </Text>
        </Flex>

        <Button
          onClick={() => setIsSubmitting(true)}
          size="sm"
          colorScheme="brand"
        >
          Create new
        </Button>
      </Flex>

      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Color</Th>
              <Th w="1px">Actions</Th>
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
                      aria-label="Edit category"
                      icon={<Icon as={HiOutlinePencil} />}
                      size="xs"
                      colorScheme="blue"
                      mr="2"
                    />
                    <ConfirmationAlertDialog
                      onConfirm={() => onDelete(id)}
                      confirmButtonText="Delete"
                    >
                      {(onClick) => (
                        <IconButton
                          aria-label="Delete category"
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
            {isCategoriesLoading && (
              <Tr>
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
