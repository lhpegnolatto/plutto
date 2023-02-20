import {
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Square,
  Text,
} from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import { routes } from "constants/routes";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { NextPageWithLayout } from "./_app.public";

const data = [
  {
    expenses: 4000,
    revenues: 2400,
    amt: 2400,
  },
  {
    expenses: 3000,
    revenues: 1398,
    amt: 2210,
  },
  {
    expenses: 2000,
    revenues: 9800,
    amt: 2290,
  },
  {
    expenses: 2780,
    revenues: 3908,
    amt: 2000,
  },
  {
    expenses: 1890,
    revenues: 4800,
    amt: 2181,
  },
  {
    expenses: 2390,
    revenues: 3800,
    amt: 2500,
  },
  {
    expenses: 3490,
    revenues: 4300,
    amt: 2100,
  },
];

const Home: NextPageWithLayout = () => {
  const { user_metadata: userMetadata } = useUser() ?? {};
  const firstName = (userMetadata?.full_name || "").split(" ")[0];

  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
  const formattedStartDate = startDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });
  const formattedEndDate = endDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });

  return (
    <Box as="main">
      <Flex flexDirection="column">
        <Heading as="h1" fontSize="xl">
          {userMetadata && `Welcome ${firstName}! `}
        </Heading>
        <Text
          fontSize="sm"
          color="gray.400"
        >{`Let's see a summary of your month (${formattedStartDate} - ${formattedEndDate})`}</Text>
      </Flex>

      <Grid
        h="full"
        mt="8"
        templateRows={{ base: "repeat(4, 1fr)", lg: "4fr 2fr" }}
        templateColumns={{ base: "1fr", lg: "4fr 2fr" }}
        gap="6"
      >
        <Card
          sx={{
            "& .recharts-surface": {
              borderRadius: "md",
            },
          }}
        >
          <Flex alignItems="center" p="6" mb="4" gap="3">
            <Text fontWeight="semibold">Your transactions</Text>

            <Divider orientation="vertical" height="6" />

            <Flex alignItems="center" gap="2">
              <Square size="8px" borderRadius="2px" bg="red.400" />
              <Text fontSize="xs">expenses</Text>
            </Flex>
            <Flex alignItems="center" gap="2">
              <Square size="8px" borderRadius="2px" bg="green.300" />
              <Text fontSize="xs">revenues</Text>
            </Flex>
          </Flex>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F56565" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#F56565" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#68D391" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#68D391" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Tooltip
                cursor={{ opacity: 0.2 }}
                contentStyle={{
                  background: "#2D3748",
                  borderColor: "#1A202C",
                  borderRadius: "10px",
                }}
                labelFormatter={() => ""}
              />
              <Area
                type="monotone"
                dataKey="revenues"
                stroke="#48BB78"
                fillOpacity={1}
                fill="url(#colorPv)"
                dot={false}
                activeDot={false}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#F56565"
                fillOpacity={1}
                fill="url(#colorUv)"
                dot={false}
                activeDot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card
          sx={{
            "& .recharts-surface": {
              borderRadius: "md",
            },
          }}
        >
          <Flex alignItems="center" p="6" mb="4" gap="3">
            <Text fontWeight="semibold">Purposes diff</Text>

            <Divider orientation="vertical" height="6" />

            <Flex alignItems="center" gap="2">
              <Square size="8px" borderRadius="2px" bg="blue.400" />
              <Text fontSize="xs">saved money</Text>
            </Flex>
          </Flex>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4299E1" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#4299E1" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Tooltip cursor={false} />
              <Area
                type="monotone"
                dataKey="amt"
                stroke="#4299E1"
                fillOpacity={1}
                fill="url(#colorAmt)"
                dot={false}
                activeDot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card p="6">
          <Text fontWeight="semibold">Recurrences</Text>

          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            h="full"
          >
            <Icon as={HiWrenchScrewdriver} boxSize="10" />
            <Text mt="2">{"Working on it"} </Text>
          </Flex>
        </Card>
        <Card p="6">
          <Text fontWeight="semibold">Categories</Text>

          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            h="full"
          >
            <Icon as={HiWrenchScrewdriver} boxSize="10" />
            <Text mt="2">{"On it too"} </Text>
          </Flex>
        </Card>
      </Grid>
    </Box>
  );
};

Home.breadcrumbItems = [
  { title: "Home", path: routes.HOME, isCurrentPage: true },
];

export default Home;
