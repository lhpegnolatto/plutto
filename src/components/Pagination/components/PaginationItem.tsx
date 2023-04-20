import { Button, useColorModeValue } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  const buttonBg = useColorModeValue("gray.200", "gray.700");
  const buttonHoverBg = useColorModeValue("gray.300", "gray.500");

  const currentButtonBg = useColorModeValue("brand.500", "brand.200");

  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="sm"
        w="4"
        colorScheme="brand"
        isDisabled
        _disabled={{ bg: currentButtonBg }}
        _hover={{ bg: currentButtonBg }}
        _active={{ bg: currentButtonBg }}
        cursor="default"
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="sm"
      w="4"
      bg={buttonBg}
      _hover={{ bg: buttonHoverBg }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}
