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
  StatArrow,
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
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FiFilter } from "react-icons/fi";
import { useQuery } from "react-query";

import { Database } from "types/supabase.types";

type TransactionItem = {
  id: string;
  title: string;
  type: string;
  amount: number;
  transacted_at: string;
  categories: { title: string; color: string };
};

type TransactionsSummary = {
  withdrawsAmount: number;
  depositsAmount: number;
  savedMoneyAmount: number;
};

type Transaction = {
  items: TransactionItem[];
  summary: TransactionsSummary;
};

type TransactionsSummaryResponse = {
  type: string;
  amount: number;
};

const defaultSummary = {
  withdrawsAmount: 0,
  depositsAmount: 0,
  savedMoneyAmount: 0,
};

export default function Transactions() {
  const startDate = new Date(2022, 11, 20);
  const endDate = new Date();

  const formattedStartDate = startDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });
  const formattedEndDate = endDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });

  const supabaseClient = useSupabaseClient<Database>();

  const {
    data: transactions = { items: [], summary: defaultSummary } as Transaction,
    isLoading: isTransactionsLoading,
  } = useQuery<Transaction>(
    "transactions",
    async () => {
      const { data: summaryData } = await supabaseClient.rpc(
        "transactions_summary",
        {
          start_date: startDate.toDateString(),
          end_date: endDate.toDateString(),
        }
      );

      let summary = defaultSummary;

      if (summaryData) {
        const withdrawsAmount = (
          summaryData as TransactionsSummaryResponse[]
        ).reduce(
          (acc, { type, amount }) => acc + (type === "withdraw" ? amount : 0),
          0
        );
        const depositsAmount = (
          summaryData as TransactionsSummaryResponse[]
        ).reduce(
          (acc, { type, amount }) => acc + (type === "deposit" ? amount : 0),
          0
        );
        const savedMoneyAmount = depositsAmount - withdrawsAmount;

        summary = {
          withdrawsAmount,
          depositsAmount,
          savedMoneyAmount,
        };
      }

      const { data } = await supabaseClient
        .from("transactions")
        .select(
          "id, title, type, amount, transacted_at, categories ( title, color )",
          { count: "exact" }
        )
        .gte("transacted_at", startDate.toDateString())
        .lte("transacted_at", endDate.toDateString())
        .order("transacted_at", { ascending: false })
        .limit(10);

      if (data) {
        const items = (data as TransactionItem[]) // needed to force these types because of a issue on supabase types gen
          .map((transaction) => ({
            ...transaction,
            transacted_at: new Date(transaction.transacted_at).toLocaleString(
              "en-US",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            ),
          }));

        return { items, summary };
      }

      return { items: [], summary: defaultSummary };
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  return (
    <Box as="main" h="full">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h1" fontSize="xl">
          About your transactions
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
