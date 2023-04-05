import { Card, Flex, Square, Text } from "@chakra-ui/react";
import { useMonthSavedMoneyCard } from "./hook";
import { useFormatter, useTranslations } from "next-intl";

export function MonthSavedMoneyCard() {
  const { savedMoneyPercentage, savedMoneyAmount } = useMonthSavedMoneyCard();

  const format = useFormatter();
  const t = useTranslations("home");

  const statusColor =
    savedMoneyPercentage >= 0.1
      ? "green.400"
      : savedMoneyPercentage >= 0.05
      ? "yellow.400"
      : "red.400";

  return (
    <Card>
      <Flex alignItems="center" p="6" gap="3">
        <Text fontWeight="semibold">{t("cards.savedMoneyMonth.title")}</Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="full"
        mb="6"
      >
        <Text>{t("cards.percentPrefix")}</Text>
        <Text fontSize="4xl" mt="3" lineHeight="none" color={statusColor}>
          {format.number(savedMoneyPercentage, "percent")}
        </Text>
        <Text fontSize="xs" color={statusColor}>
          {format.number(savedMoneyAmount, "currency")}
        </Text>
        <Text mt="3">{t("cards.percentSuffix")}</Text>

        <Flex flexDirection="column" mt="8" gap="1">
          <Flex alignItems="center" gap="2">
            <Square size="8px" borderRadius="2px" bg="green.400" />
            <Text fontSize="xs">{t("cards.goals.green")}</Text>
          </Flex>
          <Flex alignItems="center" gap="2">
            <Square size="8px" borderRadius="2px" bg="yellow.400" />
            <Text fontSize="xs">{t("cards.goals.yellow")}</Text>
          </Flex>
          <Flex alignItems="center" gap="2">
            <Square size="8px" borderRadius="2px" bg="red.400" />
            <Text fontSize="xs">{t("cards.goals.red")}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
