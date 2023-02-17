import { Tag } from "@chakra-ui/react";
import {
  Select as ReactSelect,
  Props as ReactSelectProps,
  Options,
  OptionBase,
  SelectComponentsConfig,
  GroupBase,
  chakraComponents,
} from "chakra-react-select";
import { Control, useController, UseControllerProps } from "react-hook-form";

export interface Option extends OptionBase {
  value: string;
  label: string;
  [key: string]: any;
}

interface SelectProps
  extends Omit<ReactSelectProps<Option, false>, "value">,
    Omit<UseControllerProps, "defaultValue" | "control"> {
  name: string;
  options: Options<Option>;
  control: Control<any>;
}

export function Select({
  name,
  rules,
  shouldUnregister,
  options,
  control,
  useBasicStyles = true,
  selectedOptionStyle = "check",
  onChange: propOnChange = () => {},
  ...props
}: SelectProps) {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules,
    shouldUnregister,
  });

  const selectValue =
    options && value ? options.find((option) => option.value === value) : null;

  return (
    <ReactSelect<Option>
      name={name}
      ref={ref}
      onBlur={onBlur}
      options={options}
      onChange={(option, actionMeta) => {
        onChange(option?.value);
        propOnChange(option, actionMeta);
      }}
      useBasicStyles={useBasicStyles}
      selectedOptionStyle={selectedOptionStyle}
      {...props}
      value={selectValue}
    />
  );
}

export const tagSelectComponents: Partial<
  SelectComponentsConfig<Option, false, GroupBase<Option>>
> = {
  SingleValue: ({ children, data: { colorScheme } }) => {
    return <Tag colorScheme={colorScheme}>{children}</Tag>;
  },
  Option: ({ children, ...props }) => {
    const {
      data: { colorScheme },
    } = props;

    if (!colorScheme) {
      return (
        <chakraComponents.Option {...props}>{children}</chakraComponents.Option>
      );
    }

    return (
      <chakraComponents.Option {...props}>
        <Tag colorScheme={colorScheme}>{children}</Tag>
      </chakraComponents.Option>
    );
  },
};
