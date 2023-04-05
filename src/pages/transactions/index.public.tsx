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
import { getStaticMessageProps } from "utils/getStaticMessagesProps";
import { useFormatter, useTranslations } from "next-intl";

const Transactions: NextPageWithLayout = () => {
  const {
    transactions,
    isTransactionsLoading,
    purposesSummary,
    isPurposesSummaryLoading,
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

  const format = useFormatter();
  const t = useTranslations("transactions");

  return (
    <Box as="main">
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        gap="4"
      >
        <Box>
          <Heading as="h1" fontSize="xl">
            {t("title")}
          </Heading>
          <Tag mt="2">
            {t("tags.dates", {
              startDate: currentFilters.current.startDate,
              endDate: currentFilters.current.endDate,
            })}
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
            {t("actions.filters")}
          </Button>
          <Button as={Link} href={routes.NEW_TRANSACTION} colorScheme="brand">
            {t("actions.new")}
          </Button>
        </HStack>
      </Flex>

      <Stack direction={{ base: "column", md: "row" }} mt="6" spacing="4">
        <Skeleton isLoaded={!isPurposesSummaryLoading} w="full">
          <Card w="full">
            <CardBody>
              <Stat>
                <StatLabel>{t("summary.savedMoney")}</StatLabel>
                <StatNumber>
                  {format.number(purposesSummary.savedMoneyAmount, "currency")}
                </StatNumber>
                <StatHelpText>
                  {format.number(
                    getSummaryValuePercentage(purposesSummary.savedMoneyAmount),
                    "default"
                  )}
                  %
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Skeleton>
        <Skeleton isLoaded={!isPurposesSummaryLoading} w="full">
          <Card w="full">
            <CardBody>
              <Stat>
                <StatLabel>{t("summary.revenues")}</StatLabel>
                <StatNumber>
                  {format.number(purposesSummary.revenuesAmount, "currency")}
                </StatNumber>
                <StatHelpText>
                  {format.number(
                    getSummaryValuePercentage(purposesSummary.revenuesAmount),
                    "default"
                  )}
                  %
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Skeleton>
        <Skeleton isLoaded={!isPurposesSummaryLoading} w="full">
          <Card w="full">
            <CardBody>
              <Stat>
                <StatLabel>{t("summary.expenses")}</StatLabel>
                <StatNumber>
                  {format.number(purposesSummary.expensesAmount, "currency")}
                </StatNumber>
                <StatHelpText>
                  {format.number(
                    getSummaryValuePercentage(purposesSummary.expensesAmount),
                    "default"
                  )}
                  %
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
                        {occurred_at &&
                          format.dateTime(new Date(occurred_at), "short")}
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
                    whiteSpace="nowrap"
                  >
                    {format.number(
                      amount * (purpose === "expense" ? -1 : 1),
                      "currency"
                    )}
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
                      aria-label={t("items.actions.edit")}
                      icon={<Icon as={HiOutlinePencil} />}
                      size={actionButtonsSize}
                      isDisabled={isDeleting}
                    />
                    <ConfirmationAlertDialog
                      onConfirm={() => onDelete(id)}
                      confirmButtonText={t("items.actions.delete")}
                    >
                      {(onClick) => (
                        <IconButton
                          aria-label={t("items.actions.delete")}
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
    titleKey: "transactions",
    path: routes.TRANSACTIONS,
    isCurrentPage: true,
  },
];

export const getStaticProps = getStaticMessageProps;

export default Transactions;
