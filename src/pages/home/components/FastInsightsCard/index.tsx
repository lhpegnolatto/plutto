import {
  Card,
  Flex,
  GridItem,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";

export function FastInsightsCard() {
  return (
    <GridItem colSpan={{ base: 1, lg: 2 }}>
      <Card h="full" position="relative">
        <Flex alignItems="center" p="6" gap="3">
          <Text fontWeight="semibold">Fast insights</Text>
        </Flex>
        <Text
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={1}
          fontSize="xl"
        >
          coming soon
        </Text>

        <VStack h="full" p="6" filter="blur(2px)">
          <Skeleton fadeDuration={10} speed={2} height="20px" width="full" />
          <Skeleton fadeDuration={10} speed={2} height="40px" width="full" />
          <Skeleton fadeDuration={10} speed={2} height="20px" width="full" />
          <Skeleton fadeDuration={10} speed={2} height="20px" width="full" />
          <Skeleton fadeDuration={10} speed={2} height="60px" width="full" />
        </VStack>
      </Card>
    </GridItem>
  );
}
