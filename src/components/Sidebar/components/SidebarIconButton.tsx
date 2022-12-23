import {
  IconButton,
  IconButtonProps,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

interface SidebarIconButtonProps extends IconButtonProps {
  title: string;
  icon: JSX.Element;
}

export function SidebarIconButton({
  title,
  icon,
  ...rest
}: SidebarIconButtonProps) {
  const buttonsHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const buttonsActiveBg = useColorModeValue("gray.50", "whiteAlpha.400");
  const tooltipBg = useColorModeValue("gray.200", "gray.700");
  const tooltipColor = useColorModeValue("black", "white");

  return (
    <Tooltip
      label={title}
      placement="right"
      hasArrow
      bg={tooltipBg}
      color={tooltipColor}
    >
      <IconButton
        icon={icon}
        _hover={{ bg: buttonsHoverBg }}
        _active={{ bg: buttonsActiveBg }}
        {...rest}
      />
    </Tooltip>
  );
}
