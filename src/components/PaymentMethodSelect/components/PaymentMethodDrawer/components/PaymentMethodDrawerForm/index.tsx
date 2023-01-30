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

  return (
    <>
      <Flex mt="6" mb="10" alignItems="center">
        <IconButton
          aria-label="Go back for payment methods list"
          icon={<Icon as={HiArrowLeft} />}
          size="sm"
          mr="4"
          onClick={() => onClose()}
        />

        <Text fontSize="md" fontWeight="bold">
          {paymentMethodId
            ? "Editing a payment method"
            : "Creating a new payment method"}
        </Text>
      </Flex>

      <Form.Root>
        <Form.Field
          label="Title"
          size="sm"
          errorMessage={errors["title"]?.message?.toString()}
          errorMessageSize="xs"
        >
          <Input
            ref={titleInputMergedRefs}
            placeholder="Type your payment method title"
            size="sm"
            autoFocus
            {...titleInputProps}
          />
        </Form.Field>
        <Form.Field
          label="Color"
          mt="6"
          size="sm"
          errorMessage={errors["color"]?.message?.toString()}
          errorMessageSize="xs"
        >
          <Select
            name="color"
            control={control}
            options={colorsOptions}
            placeholder="Select your payment method color"
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
          Cancel
        </Button>
        <Button
          colorScheme="brand"
          onClick={handleSubmit(async (data) => onSubmit(data))}
          isLoading={isSubmitting}
        >
          {paymentMethodId ? "Save" : "Create"}
        </Button>
      </ButtonGroup>
    </>
  );
}
