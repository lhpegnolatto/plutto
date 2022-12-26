import { Box, Button, Heading, Input } from "@chakra-ui/react";

import { FormField } from "components/form/FormField";
import { FormGrid } from "components/form/FormGrid";
import { Select, tagSelectComponents } from "components/form/Select";
import { useAppLayoutBreadcrumb } from "contexts/AppLayoutContext";
import { useForm } from "react-hook-form";

export default function NewTransaction() {
  useAppLayoutBreadcrumb([
    { title: "Transactions", path: "/transactions" },
    { title: "New", path: "/transactions/new" },
  ]);

  const { control } = useForm();

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
              <Select
                name="category"
                control={control}
                options={[]}
                placeholder="Select the transaction category"
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
              <Input placeholder="$0.00" />
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
