import {
  CreatableSelect as ReactCreatableSelect,
  CreatableProps as ReactCreatableProps,
  Options,
  OptionBase,
  GroupBase,
  SelectInstance,
} from "chakra-react-select";
import { Control, useController, UseControllerProps } from "react-hook-form";
import { forwardRef } from "react";
import { useMergeRefs } from "@chakra-ui/react";

export interface Option extends OptionBase {
  value: string;
  label: string;
  [key: string]: any;
}

export interface CreatableSelectProps
  extends Omit<ReactCreatableProps<Option, false, GroupBase<Option>>, "value">,
    Omit<UseControllerProps, "defaultValue" | "control"> {
  name: string;
  options: Options<Option>;
  control: Control<any>;
}

export const CreatableSelect = forwardRef<
  SelectInstance<Option>,
  CreatableSelectProps
>(
  (
    {
      name,
      rules,
      shouldUnregister,
      options,
      control,
      useBasicStyles = true,
      selectedOptionStyle = "check",
      onChange: propOnChange = () => {},
      ...props
    },
    ref
  ) => {
    const {
      field: { onChange, onBlur, value, ref: formRef },
    } = useController({
      name,
      control,
      rules,
      shouldUnregister,
    });

    const mergedRefs = useMergeRefs(formRef, ref);

    const selectValue =
      options && value
        ? options.find((option) => option.value === value)
        : null;

    return (
      <ReactCreatableSelect<Option>
        name={name}
        ref={mergedRefs}
        onBlur={onBlur}
        options={options}
        onChange={(option, actionMeta) => {
          onChange(option?.value);
          propOnChange(option, actionMeta);
        }}
        useBasicStyles={useBasicStyles}
        selectedOptionStyle={selectedOptionStyle}
        chakraStyles={{
          placeholder: (provided) => ({
            ...provided,
            whiteSpace: "nowrap",
            width: "calc(100% - 20px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }),
        }}
        {...props}
        value={selectValue}
      />
    );
  }
);

CreatableSelect.displayName = "CreatableSelect";
