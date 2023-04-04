import { Box, Card, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export function FastInsightsCard() {
  const t = useTranslations("home");

  return (
    <GridItem colSpan={{ base: 1, lg: 2 }}>
      <Card h="full" position="relative">
        <Flex alignItems="center" p="6" gap="3">
          <Text fontWeight="semibold" filter="blur(2px)">
            {t("cards.fastInsights.title")}
          </Text>
        </Flex>
        <Text
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={1}
          fontSize="xl"
          bg="whiteAlpha.400"
          px="4"
          py="2"
          borderRadius="md"
        >
          {t("cards.fastInsights.tooltip")}
        </Text>

        <Flex filter="blur(4px)" p="6" gap="4">
          <Grid h="full" w="50%" gap="4" templateRows="1fr 2fr 1fr 1fr 3fr">
            <Box borderRadius="md" h="20px" w="full" bg="gray.600" />
            <Box borderRadius="md" h="40px" w="full" bg="gray.600" />
            <Box borderRadius="md" h="20px" w="full" bg="gray.600" />
            <Box borderRadius="md" h="20px" w="full" bg="gray.600" />
            <Box borderRadius="md" h="60px" w="full" bg="gray.600" />
          </Grid>
          <Box h="100%" w="50%" bg="gray.600" borderRadius="md" />
        </Flex>
      </Card>
    </GridItem>
  );
}
