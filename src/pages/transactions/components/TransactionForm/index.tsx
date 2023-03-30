import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  Skeleton,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { Form } from "components/Form";
import { Select, tagSelectComponents } from "components/Select";
import { CurrencyInput } from "components/CurrencyInput";
import { CategorySelect } from "components/CategorySelect";

import { TransactionFormData, useTransactionForm } from "./hook";
import { routes } from "constants/routes";
import {
  fixedTransactionPeriodOptions,
  transactionRepeatTypeOptions,
} from "./data";
import { transactionTypesOptions } from "constants/transactionTypes";
import { PaymentMethodSelect } from "components/PaymentMethodSelect";

interface TransactionFormProps {
  submitButtonText: string;
  onSubmit: (formData: TransactionFormData) => void;
  defaultValues: TransactionFormData;
}

export function TransactionForm({
  submitButtonText,
  onSubmit,
  defaultValues,
}: TransactionFormProps) {
  const {
    formProps: {
      register,
      control,
      formState: { errors },
      setValue,
      getValues,
    },
    handleOnSubmit,
    isSubmitting,
    formValidations,
    onPurposeChange,
    onRecurrenceChange,
    purpose,
    recurrence,
  } = useTransactionForm({ onSubmit, defaultValues });

  return (
    <Form.Root onSubmit={handleOnSubmit} mt="10">
      <Form.Grid>
        <Form.Item colSpan={{ base: 12, lg: 6 }}>
          <Form.Field
            label="Description"
            errorMessage={errors["description"]?.message?.toString()}
          >
            <Input
              placeholder="Type your transaction description"
              autoFocus
              {...register("description", formValidations["description"])}
            />
          </Form.Field>
        </Form.Item>
        <Form.Item colSpan={{ base: 12, md: 6 }}>
          <Form.Field
            label="Transacted at"
            errorMessage={errors["transactedAt"]?.message?.toString()}
          >
            <Input
              type="datetime-local"
              {...register("transactedAt", formValidations["transactedAt"])}
            />
          </Form.Field>
        </Form.Item>
        <Form.Item colSpan={{ base: 12, md: 6, lg: 4 }}>
          <Form.Field
            label="Purpose"
            errorMessage={errors["purpose"]?.message?.toString()}
          >
            <Select
              name="purpose"
              control={control}
              options={transactionTypesOptions}
              placeholder="Select the transaction purpose"
              components={tagSelectComponents}
              rules={formValidations["purpose"]}
              onChange={onPurposeChange}
            />
          </Form.Field>
        </Form.Item>
        <Form.Item colSpan={{ base: 12, md: 6, lg: 4 }}>
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
        <Form.Item colSpan={{ base: 12, md: 6, lg: 4 }}>
          <Form.Field
            label="Payment method"
            errorMessage={errors["paymentMethod"]?.message?.toString()}
            isDisabled={purpose === "revenue"}
          >
            <PaymentMethodSelect
              name="paymentMethod"
              control={control}
              setValue={setValue}
              getValues={getValues}
              placeholder="Select the payment method"
              rules={formValidations["paymentMethod"]}
              isDisabled={purpose === "revenue"}
            />
          </Form.Field>
        </Form.Item>
        <Form.Item
          colSpan={{
            base: 12,
            md: recurrence === "installment_based" ? 3 : 4,
          }}
        >
          <Form.Field
            label="Recurrence"
            errorMessage={errors["recurrence"]?.message?.toString()}
          >
            <Select
              name="recurrence"
              control={control}
              options={transactionRepeatTypeOptions}
              rules={formValidations["recurrence"]}
              onChange={onRecurrenceChange}
            />
          </Form.Field>
        </Form.Item>
        {(recurrence === "fixed_periodic" ||
          recurrence === "installment_based") && (
          <Form.Item
            colSpan={{
              base: 12,
              md: recurrence === "installment_based" ? 3 : 4,
            }}
          >
            <Form.Field
              label="Frequency"
              errorMessage={errors["frequency"]?.message?.toString()}
            >
              <Select
                name="frequency"
                control={control}
                options={fixedTransactionPeriodOptions}
                rules={formValidations["frequency"]}
              />
            </Form.Field>
          </Form.Item>
        )}
        {recurrence === "installment_based" && (
          <Form.Item colSpan={{ base: 12, md: 3 }}>
            <Form.Field
              label="Installments"
              errorMessage={errors["installments"]?.message?.toString()}
              helperMessage="minimum is 2"
            >
              <Input
                {...register("installments", formValidations["installments"])}
              />
            </Form.Field>
          </Form.Item>
        )}
        <Form.Item
          colSpan={{
            base: 12,
            md: recurrence === "installment_based" ? 3 : 4,
          }}
        >
          <Form.Field
            label="Amount"
            errorMessage={errors["amount"]?.message?.toString()}
            helperMessage={
              recurrence === "installment_based" ? "per installment" : ""
            }
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
          {submitButtonText}
        </Button>
      </Flex>
    </Form.Root>
  );
}