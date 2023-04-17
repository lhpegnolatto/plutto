import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ReactNode, useRef } from "react";

interface ConfirmationAlertDialogProps {
  children: (onClick: () => void) => ReactNode;
  onConfirm: () => void;
  confirmButtonText?: string;
  title?: string;
  description?: string;
}

export function ConfirmationAlertDialog({
  children,
  onConfirm,
  confirmButtonText,
  title,
  description,
}: ConfirmationAlertDialogProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const t = useTranslations("confirmationAlertDialog");

  return (
    <>
      {children(onOpen)}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title || t("title")}
            </AlertDialogHeader>

            <AlertDialogBody>{description || t("description")}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t("cancel")}
              </Button>
              <Button colorScheme="red" onClick={onConfirm} ml={3}>
                {confirmButtonText || t("confirm")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
