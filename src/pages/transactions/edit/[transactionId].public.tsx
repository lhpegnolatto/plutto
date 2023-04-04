import { Box, Flex, Heading, Icon, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { NextPageWithLayout } from "pages/_app.public";

import { useNewTransaction } from "./hook";
import { routes } from "constants/routes";
import { TransactionForm } from "../components/TransactionForm";
import {
  TransactionFormData,
  transactionFormDefaultValues,
} from "../components/TransactionForm/hook";
import { getStaticMessageProps } from "utils/getStaticMessagesProps";

const NewTransaction: NextPageWithLayout = () => {
  const { onSubmit, defaultValues, isSubmitting } = useNewTransaction();

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
          Edit transaction
        </Heading>
      </Flex>

      <TransactionForm
        submitButtonText="Save"
        onSubmit={onSubmit}
        defaultValues={
          (defaultValues || transactionFormDefaultValues) as TransactionFormData
        }
      />
    </Box>
  );
};

NewTransaction.breadcrumbItems = [
  { title: "Transactions", path: routes.TRANSACTIONS },
  { title: "Edit", path: routes.EDIT_TRANSACTION, isCurrentPage: true },
];

export const getStaticProps = getStaticMessageProps;

export default NewTransaction;
