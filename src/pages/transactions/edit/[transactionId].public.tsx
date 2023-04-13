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
import { getServerSideMessagesProps } from "utils/getServerSideMessagesProps";
import { useTranslations } from "next-intl";

const NewTransaction: NextPageWithLayout = () => {
  const { onSubmit, defaultValues, isSubmitting } = useNewTransaction();

  const t = useTranslations("editTransaction");

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
          {t("title")}
        </Heading>
      </Flex>

      <TransactionForm
        submitButtonText={t("submit")}
        onSubmit={onSubmit}
        defaultValues={
          (defaultValues || transactionFormDefaultValues) as TransactionFormData
        }
      />
    </Box>
  );
};

NewTransaction.breadcrumbItems = [
  { titleKey: "transactions", path: routes.TRANSACTIONS },
  {
    titleKey: "editTransaction",
    path: routes.EDIT_TRANSACTION,
    isCurrentPage: true,
  },
];

export const getServerSideProps = getServerSideMessagesProps;

export default NewTransaction;
