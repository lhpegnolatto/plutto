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
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";

import { NextPageWithLayout } from "pages/_app.public";

import { addRouteParam, routes } from "constants/routes";
import { useTransactions } from "./hook";
import {
  HiArrowTrendingDown,
  HiArrowTrendingUp,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { ConfirmationAlertDialog } from "components/ConfirmationAlertDialog";
import { FiltersModal } from "./components/FiltersModal";
import { Fragment } from "react";

const Transactions: NextPageWithLayout = () => {
  const {
    transactions,
    isTransactionsLoading,
    purposesSummary,
    isPurposesSummaryLoading,
    formattedStartDate,
    formattedEndDate,
    onDelete,
    isDeleting,
    getTransactionRecurrenceColumn,
    getSummaryValuePercentage,
    isFiltersModalOpen,
    onFiltersModalOpen,
    onFiltersModalClose,
    currentFilters,
    onFiltersChange,
    getTransactionMonth,
  } = useTransactions();

  const actionButtonsSize = useBreakpointValue({ base: "sm", md: "xs" });

  return (
    <Box as="main">
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        gap="4"
      >
        <Box>
          <Heading as="h1" fontSize="xl">
            Summary of your transactions
          </Heading>
          <Tag mt="2">
            {`from ${formattedStartDate} to ${formattedEndDate}`}
          </Tag>
        </Box>

        <HStack spacing="4">
          <FiltersModal
            isOpen={isFiltersModalOpen}
            onClose={onFiltersModalClose}
            currentFilters={currentFilters.current}
            onFiltersChange={onFiltersChange}
          />
          <Button
            leftIcon={<Icon as={FiFilter} />}
            isDisabled={isTransactionsLoading}
            onClick={onFiltersModalOpen}
          >
            Filters
          </Button>
          <Button as={Link} href={routes.NEW_TRANSACTION} colorScheme="brand">
            Create new
          </Button>
        </HStack>
      </Flex>

      <Stack direction={{ base: "column", md: "row" }} mt="6" spacing="4">
        <Skeleton isLoaded={!isPurposesSummaryLoading} w="full">
          <Card w="full">
            <CardBody>
              <Stat>
                <StatLabel>Saved Money</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(purposesSummary.savedMoneyAmount)}
                </StatNumber>
                <StatHelpText>
                  {getSummaryValuePercentage(purposesSummary.savedMoneyAmount)}%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Skeleton>
        <Skeleton isLoaded={!isPurposesSummaryLoading} w="full">
          <Card w="full">
            <CardBody>
              <Stat>
                <StatLabel>Revenues</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(purposesSummary.revenuesAmount)}
                </StatNumber>
                <StatHelpText>
                  {getSummaryValuePercentage(purposesSummary.revenuesAmount)}%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Skeleton>
        <Skeleton isLoaded={!isPurposesSummaryLoading} w="full">
          <Card w="full">
            <CardBody>
              <Stat>
                <StatLabel>Expenses</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(purposesSummary.expensesAmount)}
                </StatNumber>
                <StatHelpText>
                  {getSummaryValuePercentage(purposesSummary.expensesAmount)}%
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Skeleton>
      </Stack>

      <Flex as="ul" gap="3" flexDirection="column">
        {transactions.map((transaction, index) => {
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

          const monthText = getTransactionMonth(transaction, index);
          const recurrenceText = getTransactionRecurrenceColumn(transaction);

          return (
            <Fragment key={id}>
              {monthText && (
                <Text fontSize="md" mt="12" mb="3" color="gray.400">
                  {monthText}
                </Text>
              )}
              <Card
                py="4"
                px="6"
                w="full"
                flexDirection="row"
                alignItems={{ base: "space-between", md: "center" }}
                justifyContent={{ base: "center", md: "space-between" }}
                gap="3"
                as="li"
                position="relative"
              >
                <Flex
                  alignItems={{ base: "flex-start", md: "center" }}
                  gap="3"
                  h="full"
                  w="full"
                  flexDirection={{ base: "column", md: "row" }}
                >
                  <Icon
                    as={
                      purpose === "expense"
                        ? HiArrowTrendingDown
                        : HiArrowTrendingUp
                    }
                    color={purpose === "expense" ? "red.400" : "green.300"}
                    boxSize="6"
                  />

                  <Divider
                    orientation="vertical"
                    height="8"
                    display={{ base: "none", md: "initial" }}
                  />

                  <Flex
                    flexDirection="column"
                    gap="1"
                    pt={{ base: "1", md: "0" }}
                  >
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

                <Flex
                  alignItems="center"
                  gap="4"
                  justifyContent={{ base: "space-between", md: "center" }}
                  position={{ base: "absolute", md: "initial" }}
                  w={{ base: "full", md: "auto" }}
                  pl={{ base: "16", md: "0" }}
                  pr={{ base: "6", md: "0" }}
                >
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

                  <Divider
                    orientation="vertical"
                    height="8"
                    display={{ base: "none", md: "initial" }}
                  />

                  <Flex gap="2">
                    <IconButton
                      as={Link}
                      href={addRouteParam(routes.EDIT_TRANSACTION, {
                        transactionId: id,
                      })}
                      aria-label="Edit category"
                      icon={<Icon as={HiOutlinePencil} />}
                      size={actionButtonsSize}
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
                          size={actionButtonsSize}
                          onClick={onClick}
                          isLoading={isDeleting}
                        />
                      )}
                    </ConfirmationAlertDialog>
                  </Flex>
                </Flex>
              </Card>
            </Fragment>
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
