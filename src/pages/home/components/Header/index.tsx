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
import { useTranslations } from "next-intl";

export function HomeHeader() {
  const { userFirstName, handleOnNewRevenueClick, handleOnNewExpenseClick } =
    useHomeHeader();

  const tooltipBg = useColorModeValue("gray.200", "gray.700");
  const tooltipColor = useColorModeValue("black", "white");

  const hasFastActions = useBreakpointValue({ base: false, md: true });

  const t = useTranslations("home");

  return (
    <Flex justifyContent="space-between" mb="8">
      <Flex flexDirection="column">
        <Heading as="h1" fontSize="xl">
          {userFirstName && t("title", { userName: userFirstName })}
        </Heading>
        <Text fontSize="sm" color="gray.400">
          {t("subtitle")}
        </Text>
      </Flex>

      {hasFastActions && (
        <Flex gap="4">
          <Tooltip
            label={t("fastActions.addNewRevenue")}
            bg={tooltipBg}
            color={tooltipColor}
          >
            <IconButton
              aria-label={t("fastActions.addNewRevenue")}
              icon={<Icon as={HiArrowTrendingUp} />}
              _hover={{ color: "green.400" }}
              onClick={handleOnNewRevenueClick}
            />
          </Tooltip>
          <Tooltip
            label={t("fastActions.addNewExpense")}
            bg={tooltipBg}
            color={tooltipColor}
          >
            <IconButton
              aria-label={t("fastActions.addNewExpense")}
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
