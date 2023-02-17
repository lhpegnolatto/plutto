export type TransactionTypeOption = {
  label: string;
  value: string;
  colorScheme: string;
};

export const transactionTypesOptions: TransactionTypeOption[] = [
  { label: "Expense", value: "expense", colorScheme: "red" },
  { label: "Revenue", value: "revenue", colorScheme: "green" },
];

export const transactionTypes: {
  [key: string]: { label: string; colorScheme: string };
} = {
  expense: { label: "Expense", colorScheme: "red" },
  revenue: { label: "Revenue", colorScheme: "green" },
};
