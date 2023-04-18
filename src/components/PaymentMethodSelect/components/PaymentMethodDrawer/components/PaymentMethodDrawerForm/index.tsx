import {
  Input,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Icon,
  Text,
} from "@chakra-ui/react";
import { HiArrowLeft } from "react-icons/hi2";

import { colorsOptions } from "../../data";
import { FormData, formValidations, usePaymentMethodDrawerForm } from "./hook";

import { Form } from "components/Form";
import { Select, tagSelectComponents } from "components/Select";
import { useTranslations } from "next-intl";
import { getTranslatedErrorMessage } from "utils/getTranslatedErrorMessage";

interface PaymentMethodDrawerProps {
  onClose: (createdPaymentMethodId?: string) => void;
  defaultValues?: FormData;
  paymentMethodId?: string;
}

export function PaymentMethodDrawerForm({
  onClose,
  defaultValues,
  paymentMethodId,
}: PaymentMethodDrawerProps) {
  const {
    titleInputMergedRefs,
    titleInputProps,
    formProps: {
      control,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
    isSubmitting,
  } = usePaymentMethodDrawerForm({ onClose, defaultValues, paymentMethodId });

  const t = useTranslations("paymentMethodForm");

  return (
    <>
      <Flex mt="6" mb="10" alignItems="center">
        <IconButton
          aria-label={t("actions.goBack")}
          icon={<Icon as={HiArrowLeft} />}
          size="sm"
          mr="4"
          onClick={() => onClose()}
        />

        <Text fontSize="md" fontWeight="bold">
          {paymentMethodId ? t("editTitle") : t("newTitle")}
        </Text>
      </Flex>

      <Form.Root>
        <Form.Field
          label={t("fields.title.label")}
          size="sm"
          errorMessage={getTranslatedErrorMessage(
            t,
            errors["title"]?.message?.toString()
          )}
        >
          <Input
            ref={titleInputMergedRefs}
            placeholder={t("fields.title.placeholder")}
            size="sm"
            autoFocus
            {...titleInputProps}
          />
        </Form.Field>
        <Form.Field
          label={t("fields.color.label")}
          mt="6"
          size="sm"
          errorMessage={getTranslatedErrorMessage(
            t,
            errors["color"]?.message?.toString()
          )}
        >
          <Select
            name="color"
            control={control}
            options={colorsOptions}
            placeholder={t("fields.color.placeholder")}
            components={tagSelectComponents}
            size="sm"
            rules={formValidations["color"]}
          />
        </Form.Field>
      </Form.Root>

      <ButtonGroup size="sm" justifyContent="flex-end" w="full" mt="4">
        <Button
          variant="shadow"
          onClick={() => onClose()}
          disabled={isSubmitting}
        >
          {t("actions.cancel")}
        </Button>
        <Button
          colorScheme="brand"
          onClick={handleSubmit(async (data) => onSubmit(data))}
          isLoading={isSubmitting}
        >
          {paymentMethodId ? t("actions.editSubmit") : t("actions.newSubmit")}
        </Button>
      </ButtonGroup>
    </>
  );
}
