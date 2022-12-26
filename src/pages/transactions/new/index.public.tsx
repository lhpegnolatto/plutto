import { Box, Button, Heading, Input } from "@chakra-ui/react";

import { FormField } from "components/form/FormField";
import { FormGrid } from "components/form/FormGrid";
import { Select, tagSelectComponents } from "components/form/Select";
import { useNewTransaction } from "./hook";

export default function NewTransaction() {
  const { formProps, categories, onSubmit, isCategoriesLoading } =
    useNewTransaction();

  const { register, control } = formProps;

  return (
    <Box as="main" h="full">
      <Heading as="h1" fontSize="lg">
        New transaction
      </Heading>

      <Box as="form" onSubmit={onSubmit}>
        <FormGrid.Grid mt="8">
          <FormGrid.Item colSpan={6}>
            <FormField label="Title">
              <Input
                placeholder="Type your transaction title"
                {...register("title")}
              />
            </FormField>
          </FormGrid.Item>
          <FormGrid.Item colSpan={6}>
            <FormField label="Category">
              <Select
                name="category"
                control={control}
                options={categories}
                placeholder="Select the transaction category"
                components={tagSelectComponents}
                isLoading={isCategoriesLoading}
              />
            </FormField>
          </FormGrid.Item>
          <FormGrid.Item colSpan={4}>
            <FormField label="Type">
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
            </FormField>
          </FormGrid.Item>
          <FormGrid.Item colSpan={4}>
            <FormField label="Amount">
              <Input placeholder="$0.00" {...register("amount")} />
            </FormField>
          </FormGrid.Item>
          <FormGrid.Item colSpan={4}>
            <FormField label="Transacted at">
              <Input type="date" {...register("transacted_at")} />
            </FormField>
          </FormGrid.Item>
        </FormGrid.Grid>

        <Button type="submit" colorScheme="green" mt="6">
          Create
        </Button>
      </Box>
    </Box>
  );
}
