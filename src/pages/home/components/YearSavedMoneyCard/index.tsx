import { Card, Flex, Square, Text } from "@chakra-ui/react";
import { useYearSavedMoneyCard } from "./hook";

export function YearSavedMoneyCard() {
  const { savedMoneyYearPercentage, savedMoneyYearAmount } =
    useYearSavedMoneyCard();

  return (
    <Card>
      <Flex alignItems="center" p="6" gap="3">
        <Text fontWeight="semibold">Saved money on a year ago</Text>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="full"
        mb="6"
      >
        <Text>You are saving</Text>
        <Text
          fontSize="4xl"
          mt="3"
          lineHeight="none"
          color={
            parseFloat(savedMoneyYearPercentage) >= 10
              ? "green.400"
              : parseFloat(savedMoneyYearPercentage) > 0
              ? "yellow.400"
              : "red.400"
          }
        >
          {`${savedMoneyYearPercentage}%`}
        </Text>
        <Text
          fontSize="xs"
          color={
            parseFloat(savedMoneyYearPercentage) >= 10
              ? "green.400"
              : parseFloat(savedMoneyYearPercentage) >= 5
              ? "yellow.400"
              : "red.400"
          }
        >
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(savedMoneyYearAmount)}
        </Text>
        <Text mt="3">of your money!</Text>

        <Flex flexDirection="column" mt="8" gap="1">
          <Flex alignItems="center" gap="2">
            <Square size="8px" borderRadius="2px" bg="green.400" />
            <Text fontSize="xs">{`very good job! (10% or more)`}</Text>
          </Flex>
          <Flex alignItems="center" gap="2">
            <Square size="8px" borderRadius="2px" bg="yellow.400" />
            <Text fontSize="xs">{`you can do better! (at least 5%)`}</Text>
          </Flex>
          <Flex alignItems="center" gap="2">
            <Square size="8px" borderRadius="2px" bg="red.400" />
            <Text fontSize="xs">{`too expensive life. (less than 5%)`}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
