export const transactionTypesOptions = [
  { label: "Expense", value: "expense", colorScheme: "red" },
  { label: "Earn", value: "earn", colorScheme: "green" },
];

export const transactionTypes: {
  [key: string]: { label: string; colorScheme: string };
} = {
  expense: { label: "Expense", colorScheme: "red" },
  earn: { label: "Earn", colorScheme: "green" },
};
