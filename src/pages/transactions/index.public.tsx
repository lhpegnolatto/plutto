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
import { useTransactions } from "./hook";
import { transactionTypes } from "constants/transactionTypes";

const Transactions: NextPageWithLayout = () => {
  const {
    isTransactionsLoading,
    transactions,
    formattedStartDate,
    formattedEndDate,
  } = useTransactions();

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
                <StatNumber>
                  ${transactions.summary.savedMoneyAmount}
                </StatNumber>
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
                <StatLabel>Earns</StatLabel>
                <StatNumber>${transactions.summary.earnsAmount}</StatNumber>
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
                <StatNumber>${transactions.summary.expensesAmount}</StatNumber>
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
              <Th isNumeric>Amount</Th>
              <Th>Category</Th>
              <Th>Payment method</Th>
              <Th>Transacted at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.items.map(
              ({
                id,
                type,
                description,
                amount,
                categories,
                payment_methods,
                transacted_at,
              }) => (
                <Tr key={id}>
                  <Td>
                    <Tag colorScheme={transactionTypes[type]?.colorScheme}>
                      {transactionTypes[type]?.label}
                    </Tag>
                  </Td>
                  <Td>{description}</Td>
                  <Td isNumeric>${amount}</Td>
                  <Td>
                    <Tag colorScheme={categories?.color}>
                      {categories?.title}
                    </Tag>
                  </Td>
                  <Td>
                    <Tag colorScheme={payment_methods?.color}>
                      {payment_methods?.title}
                    </Tag>
                  </Td>
                  <Td>{transacted_at}</Td>
                </Tr>
              )
            )}
            {!isTransactionsLoading && transactions.items.length === 0 && (
              <Tr>
                <Td colSpan={6}>
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
