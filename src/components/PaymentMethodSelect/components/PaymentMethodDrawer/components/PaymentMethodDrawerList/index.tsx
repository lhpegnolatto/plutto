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
import { usePaymentMethodDrawerList } from "./hook";

type PaymentMethodListItem = {
  id: string;
  title: string;
  color: string;
};

type PaymentMethod = {
  id: string;
  title: string;
  color: string;
};

interface PaymentMethodDrawerListProps {
  onClose: () => void;
  onOpenPaymentMethodForm: (paymentMethod?: PaymentMethodListItem) => void;
  onDeletePaymentMethod: (deletedPaymentMethodId: string) => void;
  paymentMethods: PaymentMethod[];
  isPaymentMethodsLoading: boolean;
}

export function PaymentMethodDrawerList({
  onClose,
  onOpenPaymentMethodForm,
  onDeletePaymentMethod,
  paymentMethods,
  isPaymentMethodsLoading,
}: PaymentMethodDrawerListProps) {
  const { isDeleting, onDelete } = usePaymentMethodDrawerList({
    onDeletePaymentMethod,
  });

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
            List of payment methods
          </Text>
        </Flex>

        <Button
          onClick={() => onOpenPaymentMethodForm()}
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
              <Th w="1px" />
            </Tr>
          </Thead>
          <Tbody>
            {paymentMethods.map(({ id, title, color }) => (
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
                      aria-label="Edit payment method"
                      icon={<Icon as={HiOutlinePencil} />}
                      size="xs"
                      colorScheme="blue"
                      mr="2"
                      onClick={() =>
                        onOpenPaymentMethodForm({ id, title, color })
                      }
                    />
                    <ConfirmationAlertDialog
                      onConfirm={() => onDelete(id)}
                      confirmButtonText="Delete"
                    >
                      {(onClick) => (
                        <IconButton
                          aria-label="Delete payment method"
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
            {!isPaymentMethodsLoading && paymentMethods.length === 0 && (
              <Tr>
                <Td colSpan={3}>
                  <Flex
                    py="4"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="md"
                  >
                    {"You don't have any payment method yet :("}
                  </Flex>
                </Td>
              </Tr>
            )}
            {isPaymentMethodsLoading && (
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
