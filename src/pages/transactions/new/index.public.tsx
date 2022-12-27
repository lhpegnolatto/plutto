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

import { Form } from "../../../components/Form";
import { Select, tagSelectComponents } from "components/Select";

import { useNewTransaction } from "./hook";

export default function NewTransaction() {
  const { formProps, categories, onSubmit, isCategoriesLoading } =
    useNewTransaction();

  const { register, control } = formProps;

  return (
    <Box as="main" h="full">
      <Flex alignItems="center">
        <IconButton
          as={Link}
          href="/transactions"
          aria-label="go back"
          icon={<Icon as={FiArrowLeft} />}
        />
        <Heading as="h1" fontSize="lg" ml="4">
          New transaction
        </Heading>
      </Flex>

      <Form.Root onSubmit={onSubmit}>
        <Form.Grid mt="8">
          <Form.Item colSpan={6}>
            <Form.Field label="Title">
              <Input
                placeholder="Type your transaction title"
                {...register("title")}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={6}>
            <Form.Field label="Category">
              <Select
                name="category"
                control={control}
                options={categories}
                placeholder="Select the transaction category"
                components={tagSelectComponents}
                isLoading={isCategoriesLoading}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={4}>
            <Form.Field label="Type">
              <Select
                name="type"
                control={control}
                options={[
                  { label: "Withdraw", value: "withdraw", colorScheme: "red" },
                  { label: "Deposit", value: "deposit", colorScheme: "green" },
                ]}
                placeholder="Select the transaction type"
                components={tagSelectComponents}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={4}>
            <Form.Field label="Amount">
              <Input placeholder="$0.00" {...register("amount")} />
            </Form.Field>
          </Form.Item>
          <Form.Item colSpan={4}>
            <Form.Field label="Transacted at">
              <Input type="date" {...register("transacted_at")} />
            </Form.Field>
          </Form.Item>
        </Form.Grid>

        <Button type="submit" colorScheme="green" mt="6">
          Create
        </Button>
      </Form.Root>
    </Box>
  );
}
