import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { Form } from "components/Form";
import { Select, tagSelectComponents } from "components/Select";

import { useNewTransaction } from "./hook";
import { CurrencyInput } from "components/CurrencyInput";
import { CategorySelect } from "components/CategorySelect";
import { NextPageWithLayout } from "pages/_app.public";

const formValidations = {
  title: { required: "Title is required" },
  category: { required: "Category is required" },
  type: { required: "Type is required" },
  amount: {
    required: "Amount is required",
  },
  transacted_at: { required: "Transaction date is required" },
};

const NewTransaction: NextPageWithLayout = () => {
  const { formProps, onSubmit, isSubmitting } = useNewTransaction();

  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = formProps;

  const repeatFor = watch("repeatFor");

  return (
    <Box as="main" h="full">
      <Flex alignItems="center">
        <IconButton
          as={Link}
          href="/transactions"
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
                {...register("description")}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={6}>
            <Form.Field
              label="Transacted at"
              errorMessage={errors["transacted_at"]?.message?.toString()}
            >
              <Input
                type="date"
                {...register("transacted_at", formValidations["transacted_at"])}
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
                options={[
                  { label: "Expense", value: "withdraw", colorScheme: "red" },
                  { label: "Earn", value: "deposit", colorScheme: "green" },
                ]}
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
                placeholder="Select the transaction category"
                rules={formValidations["category"]}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={4}>
            <Form.Field label="Payment method">
              <Select
                name="paymentMethod"
                control={control}
                options={[
                  { label: "Cash", value: "cash" },
                  { label: "Credit card", value: "credit_card" },
                ]}
                placeholder="Select the transaction wallet"
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={4}>
            <Form.Field label="Repeat">
              <Select
                name="repeatFor"
                control={control}
                options={[
                  { label: "Don't repeat", value: "single" },
                  { label: "Fixed", value: "fixed" },
                  { label: "Installments", value: "installments" },
                ]}
              />
            </Form.Field>
          </Form.Item>
          {repeatFor === "fixed" && (
            <Form.Item colSpan={4}>
              <Form.Field label="Fixed period">
                <Select
                  name="fixedPeriod"
                  control={control}
                  options={[
                    { label: "Monthly", value: "monthly" },
                    { label: "Daily", value: "daily" },
                    { label: "Weekly", value: "weekly" },
                    { label: "Yearly", value: "yearly" },
                  ]}
                />
              </Form.Field>
            </Form.Item>
          )}
          {repeatFor === "installments" && (
            <Form.Item colSpan={4}>
              <Form.Field
                label="Installments quantity"
                errorMessage={errors[
                  "installmentsQuantity"
                ]?.message?.toString()}
              >
                <Input {...register("installmentsQuantity")} />
              </Form.Field>
            </Form.Item>
          )}
          <Form.Item colSpan={4}>
            <Form.Field
              label={
                repeatFor === "installments" ? "Installment amount" : "Amount"
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
            href="/transactions"
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
  { title: "Transactions", path: "/transactions" },
  { title: "New", path: "/transactions/new", isCurrentPage: true },
];

export default NewTransaction;
