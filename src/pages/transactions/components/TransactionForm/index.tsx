import { Button, Flex, Input } from "@chakra-ui/react";
import Link from "next/link";

import { Form } from "components/Form";
import { Select, tagSelectComponents } from "components/Select";
import { CurrencyInput } from "components/CurrencyInput";
import { CategorySelect } from "components/CategorySelect";

import { TransactionFormData, useTransactionForm } from "./hook";
import { routes } from "constants/routes";
import {
  transactionFrequencyOptions,
  transactionPurposesOptions,
  transactionRecurrenceOptions,
} from "./data";
import { PaymentMethodSelect } from "components/PaymentMethodSelect";
import { useTranslations } from "next-intl";
import { getTranslatedErrorMessage } from "utils/getTranslatedErrorMessage";

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

  const t = useTranslations("transactionForm");

  return (
    <Form.Root onSubmit={handleOnSubmit} mt="10">
      <Form.Grid>
        <Form.Item colSpan={{ base: 12, lg: 6 }}>
          <Form.Field
            label={t("description.label")}
            errorMessage={getTranslatedErrorMessage(
              t,
              errors["description"]?.message?.toString()
            )}
          >
            <Input
              placeholder={t("description.placeholder")}
              autoFocus
              {...register("description", formValidations["description"])}
            />
          </Form.Field>
        </Form.Item>
        <Form.Item colSpan={{ base: 12, md: 6 }}>
          <Form.Field
            label={t("transactedAt.label")}
            errorMessage={getTranslatedErrorMessage(
              t,
              errors["transactedAt"]?.message?.toString()
            )}
            helperMessage={
              recurrence === "installment_based"
                ? t("transactedAt.helperMessage")
                : ""
            }
          >
            <Input
              type="datetime-local"
              {...register("transactedAt", formValidations["transactedAt"])}
            />
          </Form.Field>
        </Form.Item>
        <Form.Item colSpan={{ base: 12, md: 6, lg: 4 }}>
          <Form.Field
            label={t("purpose.label")}
            errorMessage={getTranslatedErrorMessage(
              t,
              errors["purpose"]?.message?.toString()
            )}
          >
            <Select
              name="purpose"
              control={control}
              options={transactionPurposesOptions}
              components={tagSelectComponents}
              rules={formValidations["purpose"]}
              onChange={onPurposeChange}
            />
          </Form.Field>
        </Form.Item>
        <Form.Item colSpan={{ base: 12, md: 6, lg: 4 }}>
          <Form.Field
            label={t("category.label")}
            errorMessage={getTranslatedErrorMessage(
              t,
              errors["category"]?.message?.toString()
            )}
          >
            <CategorySelect
              name="category"
              control={control}
              setValue={setValue}
              getValues={getValues}
              placeholder={t("category.placeholder")}
              rules={formValidations["category"]}
            />
          </Form.Field>
        </Form.Item>
        <Form.Item colSpan={{ base: 12, md: 6, lg: 4 }}>
          <Form.Field
            label={t("paymentMethod.label")}
            errorMessage={getTranslatedErrorMessage(
              t,
              errors["paymentMethod"]?.message?.toString()
            )}
            isDisabled={purpose === "revenue"}
          >
            <PaymentMethodSelect
              name="paymentMethod"
              control={control}
              setValue={setValue}
              getValues={getValues}
              placeholder={t("paymentMethod.placeholder")}
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
            label={t("recurrence.label")}
            errorMessage={getTranslatedErrorMessage(
              t,
              errors["recurrence"]?.message?.toString()
            )}
          >
            <Select
              name="recurrence"
              control={control}
              options={transactionRecurrenceOptions}
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
              label={t("frequency.label")}
              errorMessage={getTranslatedErrorMessage(
                t,
                errors["frequency"]?.message?.toString()
              )}
            >
              <Select
                name="frequency"
                control={control}
                options={transactionFrequencyOptions}
                rules={formValidations["frequency"]}
              />
            </Form.Field>
          </Form.Item>
        )}
        {recurrence === "installment_based" && (
          <Form.Item colSpan={{ base: 12, md: 3 }}>
            <Form.Field
              label={t("installments.label")}
              errorMessage={getTranslatedErrorMessage(
                t,
                errors["installments"]?.message?.toString()
              )}
              helperMessage={t("installments.helperMessage")}
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
            label={t("amount.label")}
            errorMessage={getTranslatedErrorMessage(
              t,
              errors["amount"]?.message?.toString()
            )}
            helperMessage={
              recurrence === "installment_based"
                ? t("amount.helperMessage")
                : ""
            }
          >
            <CurrencyInput
              name="amount"
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
          {t("cancel")}
        </Button>

        <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
          {submitButtonText}
        </Button>
      </Flex>
    </Form.Root>
  );
}
