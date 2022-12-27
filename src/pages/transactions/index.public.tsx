import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Icon,
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
import Link from "next/link";
import { FiFilter } from "react-icons/fi";

export default function Transactions() {
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
            <Tr>
              <Td>
                <Tag colorScheme="green">Deposit</Tag>
              </Td>
              <Td>Landing page freelance</Td>
              <Td isNumeric>$250.00</Td>
              <Td>
                <Tag colorScheme="cyan">Freelance</Tag>
              </Td>
              <Td>December 22, 2022</Td>
            </Tr>
            <Tr>
              <Td>
                <Tag colorScheme="red">Withdraw</Tag>
              </Td>
              <Td>Christmas gift for my gf</Td>
              <Td isNumeric>$100.00</Td>
              <Td>
                <Tag colorScheme="pink">Others</Tag>
              </Td>
              <Td>December 18, 2022</Td>
            </Tr>
            <Tr>
              <Td>
                <Tag colorScheme="red">Withdraw</Tag>
              </Td>
              <Td>Burger and fries</Td>
              <Td isNumeric>$20.00</Td>
              <Td>
                <Tag colorScheme="orange">Food</Tag>
              </Td>
              <Td>December 18, 2022</Td>
            </Tr>
            <Tr>
              <Td>
                <Tag colorScheme="green">Deposit</Tag>
              </Td>
              <Td>Week salary</Td>
              <Td isNumeric>$300.00</Td>
              <Td>
                <Tag colorScheme="purple">Salary</Tag>
              </Td>
              <Td>December 17, 2022</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
