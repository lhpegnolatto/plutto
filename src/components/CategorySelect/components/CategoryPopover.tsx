import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  Box,
  Input,
  Button,
  ButtonGroup,
  PopoverProps,
  useMergeRefs,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Form } from "components/Form";
import { Select, tagSelectComponents } from "components/Select";
import { useEffect, useRef } from "react";
import FocusLock from "react-focus-lock";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { Database } from "types/supabase.types";
import { colorsOptions } from "./data";

type FormData = {
  title: string;
  color: string;
};

const formDefaultValues = {
  title: "",
  color: "",
};

interface CategoryPopoverProps extends Omit<PopoverProps, "onClose"> {
  getDefaultValues: () => FormData;
  isOpen: boolean;
  onClose: (createdCategoryId?: string) => void;
}

export function CategoryPopover({
  getDefaultValues,
  isOpen,
  onClose,
  ...rest
}: CategoryPopoverProps) {
  const initialFocusRef = useRef(null);

  const { control, register, reset, handleSubmit } = useForm<FormData>({
    defaultValues: formDefaultValues,
  });

  const { ref: titleInputRef, ...titleInputProps } = register("title");
  const titleInputMergedRefs = useMergeRefs(initialFocusRef, titleInputRef);

  const supabaseClient = useSupabaseClient<Database>();
  const queryClient = useQueryClient();

  const { mutateAsync: onSubmit, isLoading: isSubmitting } = useMutation(
    handleSubmit(async ({ title, color }) => {
      const { data } = await supabaseClient
        .from("categories")
        .insert({ title, color })
        .select("id, title, color")
        .maybeSingle();

      onClose(data?.id);
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );

  useEffect(() => {
    if (isOpen) {
      const defaultValues = getDefaultValues();
      reset({ ...formDefaultValues, ...defaultValues });
    }
  }, [getDefaultValues, isOpen, reset]);

  return (
    <Popover
      matchWidth
      isLazy
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
    >
      <PopoverTrigger>
        <Box />
      </PopoverTrigger>
      <PopoverContent w="full">
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverHeader>Creating a new category</PopoverHeader>
          <PopoverBody p="4">
            <Form.Root
              id="category-form"
              onSubmit={onSubmit}
              onSubmitCapture={onSubmit}
            >
              <Form.Field label="Title" size="sm">
                <Input
                  ref={titleInputMergedRefs}
                  placeholder="Type your category title"
                  size="sm"
                  {...titleInputProps}
                />
              </Form.Field>
              <Form.Field label="Color" mt="4" size="sm">
                <Select
                  name="color"
                  control={control}
                  options={colorsOptions}
                  placeholder="Select your category color"
                  components={tagSelectComponents}
                  size="sm"
                />
              </Form.Field>
            </Form.Root>
          </PopoverBody>
          <PopoverFooter p="4">
            <ButtonGroup size="sm" justifyContent="flex-end" w="full">
              <Button
                variant="shadow"
                onClick={() => onClose()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                colorScheme="brand"
                type="submit"
                form="category-form"
                isLoading={isSubmitting}
              >
                Create
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
}
