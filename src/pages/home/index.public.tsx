import { Flex, Grid, useBreakpointValue } from "@chakra-ui/react";

import { routes } from "constants/routes";
import { NextPageWithLayout } from "pages/_app.public";
import { HomeHeader } from "./components/Header";
import { CalendarCard } from "./components/CalendarCard";
import { HalfYearSavedMoneyCard } from "./components/HalfYearSavedMoneyCard";
import { YearSavedMoneyCard } from "./components/YearSavedMoneyCard";
import { MonthSavedMoneyCard } from "./components/MonthSavedMoneyCard";
import { FastInsightsCard } from "./components/FastInsightsCard";
import { getStaticMessageProps } from "utils/getStaticMessagesProps";

const Home: NextPageWithLayout = () => {
  const hasFastInsightsCard = useBreakpointValue({ base: false, lg: true });
  const hasCalendarCard = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex as="main" flexDirection="column">
      <HomeHeader />

      <Grid
        h="auto"
        templateRows={{
          base: "repeat(3, minmax(240px, 1fr))",
          lg: "repeat(2, 1fr)",
        }}
        templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        gap="6"
        flex="1"
      >
        <MonthSavedMoneyCard />

        {hasFastInsightsCard && <FastInsightsCard />}

        <HalfYearSavedMoneyCard />

        <YearSavedMoneyCard />

        {hasCalendarCard && <CalendarCard />}
      </Grid>
    </Flex>
  );
};

Home.breadcrumbItems = [
  { title: "Home", path: routes.HOME, isCurrentPage: true },
];

export const getStaticProps = getStaticMessageProps;

export default Home;
