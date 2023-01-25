import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { Form } from "components/Form";
import { Select, tagSelectComponents } from "components/Select";
import { CurrencyInput } from "components/CurrencyInput";
import { CategorySelect } from "components/CategorySelect";
import { NextPageWithLayout } from "pages/_app.public";

import { useNewTransaction } from "./hook";
import { routes } from "constants/routes";
import {
  fixedTransactionPeriodOptions,
  transactionRepeatTypeOptions,
} from "./data";
import { transactionTypesOptions } from "constants/transactionTypes";

const formValidations = {
  description: { required: "Title is required" },
  transactedAt: { required: "Transaction date is required" },
  type: { required: "Type is required" },
  category: { required: "Category is required" },
  paymentMethod: { required: "Payment method is required" },
  repeat: { required: "Repeat type is required" },
  amount: {
    required: "Amount is required",
  },
  fixedPeriod: { required: "Period is required" },
  installments: { required: "Installments quantity is required" },
};

const NewTransaction: NextPageWithLayout = () => {
  const {
    formProps: {
      register,
      control,
      formState: { errors },
      setValue,
      getValues,
      watch,
    },
    onSubmit,
    isSubmitting,
  } = useNewTransaction();

  const repeatType = watch("repeat");

  return (
    <Box as="main" h="full">
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

      <Form.Root onSubmit={onSubmit} mt="10">
        <Form.Grid>
          <Form.Item colSpan={6}>
            <Form.Field
              label="Description"
              errorMessage={errors["description"]?.message?.toString()}
            >
              <Input
                placeholder="Type your transaction description"
                {...register("description", formValidations["description"])}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={6}>
            <Form.Field
              label="Transacted at"
              errorMessage={errors["transactedAt"]?.message?.toString()}
            >
              <Input
                type="date"
                {...register("transactedAt", formValidations["transactedAt"])}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={4}>
            <Form.Field
              label="Type"
              errorMessage={errors["type"]?.message?.toString()}
            >
              <Select
                name="type"
                control={control}
                options={transactionTypesOptions}
                placeholder="Select the transaction type"
                components={tagSelectComponents}
                rules={formValidations["type"]}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={4}>
            <Form.Field
              label="Category"
              errorMessage={errors["category"]?.message?.toString()}
            >
              <CategorySelect
                name="category"
                control={control}
                setValue={setValue}
                getValues={getValues}
                placeholder="Select the category"
                rules={formValidations["category"]}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={4}>
            <Form.Field
              label="Payment method"
              errorMessage={errors["paymentMethod"]?.message?.toString()}
            >
              <Select
                name="paymentMethod"
                control={control}
                options={[
                  { label: "Cash", value: "cash" },
                  { label: "Credit card", value: "credit_card" },
                ]}
                placeholder="Select the payment method"
                rules={formValidations["paymentMethod"]}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={4}>
            <Form.Field
              label="Repeat"
              errorMessage={errors["repeat"]?.message?.toString()}
            >
              <Select
                name="repeat"
                control={control}
                options={transactionRepeatTypeOptions}
                rules={formValidations["repeat"]}
              />
            </Form.Field>
          </Form.Item>
          {repeatType === "fixed" && (
            <Form.Item colSpan={4}>
              <Form.Field
                label="Fixed period"
                errorMessage={errors["fixedPeriod"]?.message?.toString()}
              >
                <Select
                  name="fixedPeriod"
                  control={control}
                  options={fixedTransactionPeriodOptions}
                  rules={formValidations["fixedPeriod"]}
                />
              </Form.Field>
            </Form.Item>
          )}
          {repeatType === "installment" && (
            <Form.Item colSpan={4}>
              <Form.Field
                label="Installments quantity"
                errorMessage={errors["installments"]?.message?.toString()}
              >
                <Input
                  {...register("installments", formValidations["installments"])}
                />
              </Form.Field>
            </Form.Item>
          )}
          <Form.Item colSpan={4}>
            <Form.Field
              label={
                repeatType === "installment" ? "Installment amount" : "Amount"
              }
              errorMessage={errors["amount"]?.message?.toString()}
            >
              <CurrencyInput
                name="amount"
                placeholder="$0.00"
                control={control}
                rules={formValidations["amount"]}
              />
            </Form.Field>
          </Form.Item>
        </Form.Grid>

        <Flex justifyContent="flex-end" gap="6" mt="10">
          <Button
            as={Link}
            href={routes.TRANSACTIONS}
            variant="shadow"
            isDisabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
            Create
          </Button>
        </Flex>
      </Form.Root>
    </Box>
  );
};

NewTransaction.breadcrumbItems = [
  { title: "Transactions", path: routes.TRANSACTIONS },
  { title: "New", path: routes.NEW_TRANSACTION, isCurrentPage: true },
];

export default NewTransaction;
