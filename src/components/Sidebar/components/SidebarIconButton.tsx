import {
  IconButton,
  IconButtonProps,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

interface SidebarIconButtonProps extends IconButtonProps {
  title: string;
  path: string;
  icon: JSX.Element;
}

export function SidebarIconButton({
  title,
  icon,
  path,
  isDisabled,
  ...rest
}: SidebarIconButtonProps) {
  const buttonsHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const buttonsActiveBg = useColorModeValue("gray.50", "whiteAlpha.400");
  const tooltipBg = useColorModeValue("gray.200", "gray.700");
  const tooltipColor = useColorModeValue("black", "white");

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Tooltip
      label={title}
      placement="right"
      hasArrow
      bg={tooltipBg}
      color={tooltipColor}
      isDisabled={isMobile}
    >
      <IconButton
        as={Link}
        href={isDisabled ? {} : path}
        icon={icon}
        _hover={{ bg: buttonsHoverBg }}
        _active={{ bg: buttonsActiveBg }}
        {...rest}
        isDisabled={isDisabled}
      />
    </Tooltip>
  );
}
