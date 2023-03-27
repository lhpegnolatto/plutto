import { Card, Flex, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { calendarCardQuotes } from "./data";

export function CalendarCard() {
  const quote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * calendarCardQuotes.length);
    const randomQuote = calendarCardQuotes[randomIndex];

    return randomQuote;
  }, []);

  const [today, setToday] = useState(new Date());

  const day = today.getDate();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();

  const time = today.toLocaleTimeString("default", {
    hour: "numeric",
    minute: "numeric",
  });

  useEffect(() => {
    function refreshClock() {
      setToday(new Date());
    }

    const timerId = setInterval(refreshClock, 10000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Card>
      <Flex px="6" pt="6" w="full" justifyContent="space-between">
        <Text>{time}</Text>
        <Text lineHeight="none" color="gray.400">
          {year}
        </Text>
      </Flex>
      <Flex h="full" alignItems="center" justifyContent="center">
        <VStack spacing="1">
          <Text fontSize="7xl" lineHeight="none">
            {day}
          </Text>
          <Text lineHeight="none" color="gray.400">
            {month}
          </Text>
        </VStack>
      </Flex>
      <Flex px="6" pb="6" w="full" flexDir="column" alignItems="center" gap="1">
        <Text lineHeight="none" color="gray.400" textAlign="center">
          {quote.text}
        </Text>
        <Text fontSize="sm" lineHeight="none" color="gray.500">
          {`- ${quote.author}`}
        </Text>
      </Flex>
    </Card>
  );
}
