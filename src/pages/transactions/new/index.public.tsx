import { Box, Flex, Heading, Icon, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { NextPageWithLayout } from "pages/_app.public";

import { useNewTransaction } from "./hook";
import { routes } from "constants/routes";
import { TransactionForm } from "../components/TransactionForm";

const NewTransaction: NextPageWithLayout = () => {
  const { onSubmit, getDefaultValues, isSubmitting } = useNewTransaction();

  return (
    <Box as="main">
      <Flex alignItems="center">
        <IconButton
          as={Link}
          href={routes.TRANSACTIONS}
          aria-label="go back"
          icon={<Icon as={FiArrowLeft} />}
          isDisabled={isSubmitting}
        />
        <Heading as="h1" fontSize="lg" ml="4">
          New transaction
        </Heading>
      </Flex>

      <TransactionForm
        submitButtonText="Create"
        onSubmit={onSubmit}
        getDefaultValues={getDefaultValues}
      />
    </Box>
  );
};

NewTransaction.breadcrumbItems = [
  { title: "Transactions", path: routes.TRANSACTIONS },
  { title: "New", path: routes.NEW_TRANSACTION, isCurrentPage: true },
];

export default NewTransaction;
