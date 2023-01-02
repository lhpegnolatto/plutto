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

import { useNewTransaction } from "./hook";
import { CurrencyInput } from "components/CurrencyInput";
import { CategorySelect } from "components/CategorySelect";

const formValidations = {
  title: { required: "Title is required" },
  category: { required: "Category is required" },
  type: { required: "Type is required" },
  amount: {
    required: "Amount is required",
  },
  transacted_at: { required: "Transaction date is required" },
};

export default function NewTransaction() {
  const { formProps, onSubmit, isSubmitting } = useNewTransaction();

  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = formProps;

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
              label="Title"
              errorMessage={errors["title"]?.message?.toString()}
            >
              <Input
                placeholder="Type your transaction title"
                {...register("title", formValidations["title"])}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={6}>
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
            <Form.Field
              label="Type"
              errorMessage={errors["type"]?.message?.toString()}
            >
              <Select
                name="type"
                control={control}
                options={[
                  { label: "Withdraw", value: "withdraw", colorScheme: "red" },
                  { label: "Deposit", value: "deposit", colorScheme: "green" },
                ]}
                placeholder="Select the transaction type"
                components={tagSelectComponents}
                rules={formValidations["type"]}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={4}>
            <Form.Field
              label="Amount"
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
          <Form.Item colSpan={4}>
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
}
