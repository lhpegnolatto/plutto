import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";

import { FormField } from "components/form/FormField";
import { FormGrid } from "components/form/FormGrid";
import { useAppLayoutBreadcrumb } from "contexts/AppLayoutContext";

export default function NewTransaction() {
  useAppLayoutBreadcrumb([
    { title: "Transactions", path: "/transactions" },
    { title: "New", path: "/transactions/new" },
  ]);

  return (
    <Box as="main" h="full">
      <Heading as="h1" fontSize="lg">
        New transaction
      </Heading>

      <Box as="form" onSubmit={() => alert("form submitted")}>
        <FormGrid.Grid mt="8">
          <FormGrid.Item colSpan={6}>
            <FormField label="Title">
              <Input placeholder="Type your transaction title" />
            </FormField>
          </FormGrid.Item>
          <FormGrid.Item colSpan={6}>
            <FormField label="Category">
              <Select placeholder="Select the transaction category">
                <option value="option1">Withdraw</option>
                <option value="option2">Deposit</option>
              </Select>
            </FormField>
          </FormGrid.Item>
          <FormGrid.Item colSpan={4}>
            <FormField label="Type">
              <Select placeholder="Select the transaction type">
                <option value="option1">Withdraw</option>
                <option value="option2">Deposit</option>
              </Select>
            </FormField>
          </FormGrid.Item>
          <FormGrid.Item colSpan={4}>
            <FormField label="Amount">
              <Input placeholder="$00.00" />
            </FormField>
          </FormGrid.Item>
          <FormGrid.Item colSpan={4}>
            <FormField label="Transacted at">
              <Input type="date" />
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
