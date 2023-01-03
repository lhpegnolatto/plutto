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

import { useTransactions } from "./hook";

export default function Transactions() {
  const {
    isTransactionsLoading,
    transactions,
    formattedStartDate,
    formattedEndDate,
  } = useTransactions();

  return (
    <Box as="main" h="full">
      <Flex alignItems="center" justifyContent="space-between">
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
          <Button as={Link} href="/transactions/new" colorScheme="brand">
            Create new
          </Button>
        </HStack>
      </Flex>

      <HStack mt="6" spacing="4">
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
                <StatLabel>Deposits</StatLabel>
                <StatNumber>${transactions.summary.depositsAmount}</StatNumber>
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
                <StatLabel>Withdraws</StatLabel>
                <StatNumber>${transactions.summary.withdrawsAmount}</StatNumber>
                <StatHelpText>
                  {formattedStartDate} - {formattedEndDate}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Skeleton>
      </HStack>

      <Heading as="h2" fontSize="md" mt="12">
        List of all transactions in this time
      </Heading>

      <TableContainer mt="6">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th w="px">Type</Th>
              <Th>Title</Th>
              <Th isNumeric>Amount</Th>
              <Th>Category</Th>
              <Th>Transacted at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.items.map(
              ({ id, type, title, amount, categories, transacted_at }) => (
                <Tr key={id}>
                  <Td>
                    <Tag colorScheme={type === "withdraw" ? "red" : "green"}>
                      {type === "withdraw" ? "Withdraw" : "Deposit"}
                    </Tag>
                  </Td>
                  <Td>{title}</Td>
                  <Td isNumeric>${amount}</Td>
                  <Td>
                    <Tag colorScheme={categories?.color}>
                      {categories?.title}
                    </Tag>
                  </Td>
                  <Td>{transacted_at}</Td>
                </Tr>
              )
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
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
