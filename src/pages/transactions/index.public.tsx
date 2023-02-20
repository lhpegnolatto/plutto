import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardBody,
  Circle,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Skeleton,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  Text,
} from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";

import { NextPageWithLayout } from "pages/_app.public";

import { routes } from "constants/routes";
import { TransactionItem, useTransactions } from "./hook";
import {
  HiArrowTrendingDown,
  HiArrowTrendingUp,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { ConfirmationAlertDialog } from "components/ConfirmationAlertDialog";

const Transactions: NextPageWithLayout = () => {
  const {
    isTransactionsLoading,
    transactions,
    summary,
    formattedStartDate,
    formattedEndDate,
    onDelete,
    isDeleting,
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
      default:
        return "";
    }
  }

  return (
    <Box as="main">
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
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(summary.savedMoneyAmount)}
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
                <StatLabel>Revenues</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(summary.revenuesAmount)}
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
                <StatLabel>Expenses</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(summary.expensesAmount)}
                </StatNumber>
                <StatHelpText>
                  {formattedStartDate} - {formattedEndDate}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Skeleton>
      </Stack>

      <Heading as="h2" fontSize="md" mt="12" mb="3" color="gray.400">
        Feb 2023
      </Heading>

      <Flex as="ul" gap="3" flexDirection="column">
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

          const recurrenceText = getTransactionRecurrenceColumn(transaction);

          return (
            <Card
              key={id}
              py="4"
              px="6"
              w="full"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              gap="3"
              as="li"
            >
              <Flex alignItems="center" gap="3" h="full">
                <Icon
                  as={
                    purpose === "expense"
                      ? HiArrowTrendingDown
                      : HiArrowTrendingUp
                  }
                  color={purpose === "expense" ? "red.400" : "green.300"}
                  boxSize="6"
                />

                <Divider orientation="vertical" height="8" />

                <Flex flexDirection="column" gap="1">
                  <Flex alignItems="center" gap="2">
                    <Text fontSize="sm">{description}</Text>

                    <Circle size="4px" bg="gray.500" />

                    <Flex gap="2">
                      <Tag
                        colorScheme={category_color}
                        size="sm"
                        lineHeight="none"
                      >
                        {category_title}
                      </Tag>
                      {payment_method_title && (
                        <Tag
                          colorScheme={payment_method_color}
                          size="sm"
                          lineHeight="none"
                        >
                          {payment_method_title}
                        </Tag>
                      )}
                    </Flex>
                  </Flex>

                  <Flex alignItems="center" gap="2">
                    <Text color="gray.500" fontSize="xs">
                      {occurred_at}
                    </Text>

                    {recurrenceText && (
                      <>
                        <Circle size="4px" bg="gray.500" />

                        <Text color="gray.500" fontSize="xs">
                          {recurrenceText}
                        </Text>
                      </>
                    )}
                  </Flex>
                </Flex>
              </Flex>

              <Flex alignItems="center" gap="4">
                <Text
                  fontSize="sm"
                  textAlign="end"
                  color={purpose === "expense" ? "red.400" : "green.300"}
                >
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(amount * (purpose === "expense" ? -1 : 1))}
                </Text>

                <Divider orientation="vertical" height="8" />

                <Flex gap="2">
                  <IconButton
                    aria-label="Edit category"
                    icon={<Icon as={HiOutlinePencil} />}
                    size="xs"
                    isDisabled={isDeleting}
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
                        onClick={onClick}
                        isLoading={isDeleting}
                      />
                    )}
                  </ConfirmationAlertDialog>
                </Flex>
              </Flex>
            </Card>
          );
        })}
        {!isTransactionsLoading && transactions.length === 0 && (
          <Card py="4" px="6" w="full" alignItems="center">
            <Text fontSize="md">{"You don't have any transaction yet :("}</Text>
          </Card>
        )}
        {isTransactionsLoading && (
          <>
            <Skeleton height="75px" w="full" />
            <Skeleton height="75px" w="full" />
            <Skeleton height="75px" w="full" />
            <Skeleton height="75px" w="full" />
            <Skeleton height="75px" w="full" />
          </>
        )}
      </Flex>
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
