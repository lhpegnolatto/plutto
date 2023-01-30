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
import { FormData, formValidations, useCategoryDrawerForm } from "./hook";

import { Form } from "components/Form";
import { Select, tagSelectComponents } from "components/Select";

interface CategoryDrawerProps {
  onClose: (createdCategoryId?: string) => void;
  defaultValues?: FormData;
  categoryId?: string;
}

export function CategoryDrawerForm({
  onClose,
  defaultValues,
  categoryId,
}: CategoryDrawerProps) {
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
  } = useCategoryDrawerForm({ onClose, defaultValues, categoryId });

  return (
    <>
      <Flex mt="6" mb="10" alignItems="center">
        <IconButton
          aria-label="Go back for categories list"
          icon={<Icon as={HiArrowLeft} />}
          size="sm"
          mr="4"
          onClick={() => onClose()}
        />

        <Text fontSize="md" fontWeight="bold">
          {categoryId ? "Editing a category" : "Creating a new category"}
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
            placeholder="Type your category title"
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
            placeholder="Select your category color"
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
          {categoryId ? "Save" : "Create"}
        </Button>
      </ButtonGroup>
    </>
  );
}