import { Card, Flex, Square, Text } from "@chakra-ui/react";

import { useHalfYearSavedMoneyCard } from "./hook";
import { useFormatter, useTranslations } from "next-intl";

export function HalfYearSavedMoneyCard() {
  const { savedMoneyHalfYearPercentage, savedMoneyHalfYearAmount } =
    useHalfYearSavedMoneyCard();

  const format = useFormatter();
  const t = useTranslations("home");

  return (
    <Card h="full">
      <Flex alignItems="center" p="6" gap="3">
        <Text fontWeight="semibold">{t("cards.savedMoneyHalfYear.title")}</Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="full"
        mb="6"
      >
        <Text>{t("cards.percentPrefix")}</Text>
        <Text
          fontSize="4xl"
          mt="3"
          lineHeight="none"
          color={
            savedMoneyHalfYearPercentage >= 10
              ? "green.400"
              : savedMoneyHalfYearPercentage > 0
              ? "yellow.400"
              : "red.400"
          }
        >
          {format.number(savedMoneyHalfYearPercentage, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          %
        </Text>
        <Text
          fontSize="xs"
          color={
            savedMoneyHalfYearPercentage >= 10
              ? "green.400"
              : savedMoneyHalfYearPercentage >= 5
              ? "yellow.400"
              : "red.400"
          }
        >
          {format.number(savedMoneyHalfYearAmount, {
            style: "currency",
            currency: "USD",
          })}
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
