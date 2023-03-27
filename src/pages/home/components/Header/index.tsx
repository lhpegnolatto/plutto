import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";
import { useHomeHeader } from "./hook";

export function HomeHeader() {
  const { userFirstName, handleOnNewRevenueClick, handleOnNewExpenseClick } =
    useHomeHeader();

  const tooltipBg = useColorModeValue("gray.200", "gray.700");
  const tooltipColor = useColorModeValue("black", "white");

  const hasFastActions = useBreakpointValue({ base: false, md: true });

  return (
    <Flex justifyContent="space-between" mb="8">
      <Flex flexDirection="column">
        <Heading as="h1" fontSize="xl">
          {userFirstName && `Welcome ${userFirstName}! `}
        </Heading>
        <Text fontSize="sm" color="gray.400">
          {"Let's see a summary of your transactions"}
        </Text>
      </Flex>

      {hasFastActions && (
        <Flex gap="4">
          <Tooltip label="add new revenue" bg={tooltipBg} color={tooltipColor}>
            <IconButton
              aria-label="Insert new revenue"
              icon={<Icon as={HiArrowTrendingUp} />}
              _hover={{ color: "green.400" }}
              onClick={handleOnNewRevenueClick}
            />
          </Tooltip>
          <Tooltip label="add new expense" bg={tooltipBg} color={tooltipColor}>
            <IconButton
              aria-label="Insert new expense"
              icon={<Icon as={HiArrowTrendingDown} />}
              _hover={{ color: "red.400" }}
              onClick={handleOnNewExpenseClick}
            />
          </Tooltip>
        </Flex>
      )}
    </Flex>
  );
}
