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

type Transaction = {
  id: string;
  title: string;
  type: string;
  amount: number;
  transacted_at: string;
  categories: { title: string; color: string };
};

export default function Transactions() {
  const supabaseClient = useSupabaseClient<Database>();

  const { data: transactions = [], isLoading: isTransactionsLoading } =
    useQuery<Transaction[]>(
      "transactions",
      async () => {
        const { data } = await supabaseClient
          .from("transactions")
          .select(
            "id, title, type, amount, transacted_at, categories ( title, color )"
          )
          .order("transacted_at", { ascending: false })
          .limit(10);

        if (data) {
          return data as Transaction[]; // needed to force these types because of a issue on supabase types gen
        }

        return [];
      },
      {
        staleTime: 1000 * 60, // 1 minute
      }
    );

  return (
    <Box as="main" h="full">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h1" fontSize="xl">
          About your transactions (Dec 17 - Dec 25)
        </Heading>

        <HStack spacing="4">
          <Button leftIcon={<Icon as={FiFilter} />}>Filters</Button>
          <Button as={Link} href="/transactions/new" colorScheme="brand">
            Create new
          </Button>
        </HStack>
      </Flex>

      <HStack mt="6" spacing="4">
        <Card w="full">
          <CardBody>
            <Stat>
              <StatLabel>Saved Money</StatLabel>
              <StatNumber>$430.00</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card w="full">
          <CardBody>
            <Stat>
              <StatLabel>Deposits</StatLabel>
              <StatNumber>$550.00</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                12.36%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card w="full">
          <CardBody>
            <Stat>
              <StatLabel>Withdraws</StatLabel>
              <StatNumber>$120.00</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" color="green.400" />
                9.05%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
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
            {transactions.map(
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
