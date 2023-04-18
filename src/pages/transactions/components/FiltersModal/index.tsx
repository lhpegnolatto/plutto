import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
  Flex,
  Icon,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HiXMark } from "react-icons/hi2";
import { useEffect, useCallback } from "react";

import { Form } from "components/Form";
import { getDateTimeInputDefaultValue } from "utils/getDateTimeInputDefaultValue";
import { useTranslations } from "next-intl";
import { getTranslatedErrorMessage } from "utils/getTranslatedErrorMessage";

const formValidations = {
  startDate: { required: "fields.startDate.validations.required" },
  endDate: { required: "fields.endDate.validations.required" },
};

export type TransactionsFilters = {
  startDate: Date;
  endDate: Date;
};

type TransactionsFiltersFormData = {
  startDate: string;
  endDate: string;
};

interface FiltersModalProps extends Omit<DrawerProps, "children"> {
  currentFilters: TransactionsFilters;
  onFiltersChange: (newFilters: TransactionsFilters) => void;
}

export function FiltersModal({
  isOpen,
  onClose,
  currentFilters,
  onFiltersChange,
  ...rest
}: FiltersModalProps) {
  const t = useTranslations("transactions.filters");

  const getDefaultValues = useCallback(() => {
    const startDateInputValue = getDateTimeInputDefaultValue(
      currentFilters?.startDate
    );
    const endDateDateInputValue = getDateTimeInputDefaultValue(
      currentFilters?.endDate
    );

    return {
      ...currentFilters,
      startDate: startDateInputValue,
      endDate: endDateDateInputValue,
    };
  }, [currentFilters]);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TransactionsFiltersFormData>({
    defaultValues: getDefaultValues(),
  });

  const onSubmit = handleSubmit((data) => {
    onFiltersChange({
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });
  });

  useEffect(() => {
    reset(getDefaultValues());
  }, [getDefaultValues, reset]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="lg"
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <Flex
            mt="6"
            mb="10"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center">
              <IconButton
                aria-label={t("close")}
                icon={<Icon as={HiXMark} />}
                size="sm"
                mr="4"
                onClick={() => onClose()}
              />
              <Text fontSize="md" fontWeight="bold" mr="4">
                {t("title")}
              </Text>
            </Flex>

            <Button size="sm" colorScheme="brand" onClick={onSubmit}>
              {t("submit")}
            </Button>
          </Flex>

          <Form.Root>
            <Form.Grid>
              <Form.Item colSpan={{ base: 12, md: 6 }}>
                <Form.Field
                  label={t("fields.startDate.label")}
                  errorMessage={getTranslatedErrorMessage(
                    t,
                    errors["startDate"]?.message?.toString()
                  )}
                >
                  <Input
                    type="datetime-local"
                    {...register("startDate", formValidations["startDate"])}
                  />
                </Form.Field>
              </Form.Item>
              <Form.Item colSpan={{ base: 12, md: 6 }}>
                <Form.Field
                  label={t("fields.endDate.label")}
                  errorMessage={getTranslatedErrorMessage(
                    t,
                    errors["endDate"]?.message?.toString()
                  )}
                >
                  <Input
                    type="datetime-local"
                    {...register("endDate", formValidations["endDate"])}
                  />
                </Form.Field>
              </Form.Item>
            </Form.Grid>
          </Form.Root>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
