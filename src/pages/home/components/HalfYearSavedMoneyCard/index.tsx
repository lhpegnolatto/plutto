import { Card, Flex, Square, Text } from "@chakra-ui/react";

import { useHalfYearSavedMoneyCard } from "./hook";
import { useTranslation } from "react-i18next";

export function HalfYearSavedMoneyCard() {
  const { savedMoneyHalfYearPercentage, savedMoneyHalfYearAmount } =
    useHalfYearSavedMoneyCard();

  const { t } = useTranslation();

  return (
    <Card h="full">
      <Flex alignItems="center" p="6" gap="3">
        <Text fontWeight="semibold">
          {t("home.cards.savedMoneyHalfYear.title")}
        </Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="full"
        mb="6"
      >
        <Text>{t("home.cards.percentPrefix")}</Text>
        <Text
          fontSize="4xl"
          mt="3"
          lineHeight="none"
          color={
            parseFloat(savedMoneyHalfYearPercentage) >= 10
              ? "green.400"
              : parseFloat(savedMoneyHalfYearPercentage) > 0
              ? "yellow.400"
              : "red.400"
          }
        >
          {`${savedMoneyHalfYearPercentage}%`}
        </Text>
        <Text
          fontSize="xs"
          color={
            parseFloat(savedMoneyHalfYearPercentage) >= 10
              ? "green.400"
              : parseFloat(savedMoneyHalfYearPercentage) >= 5
              ? "yellow.400"
              : "red.400"
          }
        >
          {new Intl.NumberFormat(t("locale", "en-US") as string, {
            style: "currency",
            currency: t("currency", "USD") as string,
          }).format(savedMoneyHalfYearAmount)}
        </Text>
        <Text mt="3">{t("home.cards.percentSuffix")}</Text>

        <Flex flexDirection="column" mt="8" gap="1">
          <Flex alignItems="center" gap="2">
            <Square size="8px" borderRadius="2px" bg="green.400" />
            <Text fontSize="xs">{t("home.cards.goals.green")}</Text>
          </Flex>
          <Flex alignItems="center" gap="2">
            <Square size="8px" borderRadius="2px" bg="yellow.400" />
            <Text fontSize="xs">{t("home.cards.goals.yellow")}</Text>
          </Flex>
          <Flex alignItems="center" gap="2">
            <Square size="8px" borderRadius="2px" bg="red.400" />
            <Text fontSize="xs">{t("home.cards.goals.red")}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
