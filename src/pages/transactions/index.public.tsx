import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";

import { NextPageWithLayout } from "pages/_app.public";

import { routes } from "constants/routes";
import { TransactionItem, useTransactions } from "./hook";
import { transactionTypes } from "constants/transactionTypes";

const Transactions: NextPageWithLayout = () => {
  const {
    isTransactionsLoading,
    transactions,
    summary,
    formattedStartDate,
    formattedEndDate,
  } = useTransactions();

  function getTransactionRecurrenceColumn({
    recurrence,
    installment_label,
    frequency,
  }: TransactionItem) {
    switch (recurrence) {
      case "fixed_periodic":
        return `Repeat ${frequency}`;
      case "installment_based":
        return `Installment ${installment_label}`;
      case "unique":
        return "Unique";
      default:
        return "";
    }
  }

  return (
    <Box as="main" h="full">
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        gap="4"
      >
        <Heading as="h1" fontSize="xl">
          Summary of your transactions
        </Heading>

        <HStack spacing="4">
          <Button
            leftIcon={<Icon as={FiFilter} />}
            isDisabled={isTransactionsLoading}
          >
            Filters
          </Button>
          <Button as={Link} href={routes.NEW_TRANSACTION} colorScheme="brand">
            Create new
          </Button>
        </HStack>
      </Flex>

      <Stack direction={{ base: "column", md: "row" }} mt="6" spacing="4">
        <Skeleton isLoaded={!isTransactionsLoading} w="full">
          <Card w="full">
            <CardBody>
              <Stat>
                <StatLabel>Saved Money</StatLabel>
                <StatNumber>${summary.savedMoneyAmount}</StatNumber>
                <StatHelpText>
                  {formattedStartDate} - {formattedEndDate}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Skeleton>
        <Skeleton isLoaded={!isTransactionsLoading} w="full">
          <Card w="full">
            <CardBody>
              <Stat>
                <StatLabel>Revenues</StatLabel>
                <StatNumber>${summary.revenuesAmount}</StatNumber>
                <StatHelpText>
                  {formattedStartDate} - {formattedEndDate}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Skeleton>
        <Skeleton isLoaded={!isTransactionsLoading} w="full">
          <Card w="full">
            <CardBody>
              <Stat>
                <StatLabel>Expenses</StatLabel>
                <StatNumber>${summary.expensesAmount}</StatNumber>
                <StatHelpText>
                  {formattedStartDate} - {formattedEndDate}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Skeleton>
      </Stack>

      <Heading as="h2" fontSize="md" mt="12">
        List of all transactions in this time
      </Heading>

      <TableContainer mt="6">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th w="px">Type</Th>
              <Th>Description</Th>
              <Th>Recurrence</Th>
              <Th isNumeric>Amount</Th>
              <Th>Category</Th>
              <Th>Payment method</Th>
              <Th>Transacted at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => {
              const {
                id,
                purpose,
                description,
                amount,
                category_color,
                category_title,
                payment_method_color,
                payment_method_title,
                occurred_at,
              } = transaction;

              return (
                <Tr key={id}>
                  <Td>
                    <Tag colorScheme={transactionTypes[purpose]?.colorScheme}>
                      {transactionTypes[purpose]?.label}
                    </Tag>
                  </Td>
                  <Td>{description}</Td>
                  <Td>{getTransactionRecurrenceColumn(transaction)}</Td>
                  <Td isNumeric>${amount}</Td>
                  <Td>
                    <Tag colorScheme={category_color}>{category_title}</Tag>
                  </Td>
                  <Td>
                    {payment_method_title && (
                      <Tag colorScheme={payment_method_color}>
                        {payment_method_title}
                      </Tag>
                    )}
                  </Td>
                  <Td>{occurred_at}</Td>
                </Tr>
              );
            })}
            {!isTransactionsLoading && transactions.length === 0 && (
              <Tr>
                <Td colSpan={7}>
                  <Flex
                    py="4"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="md"
                  >
                    {"You don't have any transaction yet :("}
                  </Flex>
                </Td>
              </Tr>
            )}
            {isTransactionsLoading && (
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
    </Box>
  );
};

Transactions.breadcrumbItems = [
  {
    title: "Transactions",
    path: routes.TRANSACTIONS,
    isCurrentPage: true,
  },
];

export default Transactions;
