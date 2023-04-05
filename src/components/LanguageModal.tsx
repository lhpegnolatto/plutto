import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { Select } from "components/Select";
import { Form } from "./Form";
import { useCurrencyContext } from "contexts/CurrencyContext";

interface LanguageModalProps {
  children: (props: { isOpen: boolean; onOpen: () => void }) => ReactNode;
  hasCurrency?: boolean;
}

const supportedLanguages = [
  { value: "pt", label: "Português" },
  { value: "en", label: "English" },
];

const supportedCurrencies = [
  { value: "BRL", label: "BRL - R$" },
  { value: "USD", label: "USD - $" },
  { value: "EUR", label: "EUR - €" },
  { value: "GPB", label: "GPB - £" },
];

export function LanguageModal({
  children,
  hasCurrency = false,
}: LanguageModalProps) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentCurrency, handleCurrencyChange } = useCurrencyContext();

  const getDefaultValues = useCallback(() => {
    const lang = router.locale || "pt";
    return { lang, currency: currentCurrency };
  }, [currentCurrency, router]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: getDefaultValues(),
  });

  const onSubmit = handleSubmit(({ lang, currency }) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: lang });

    handleCurrencyChange(currency);

    onClose();
  });

  useEffect(() => {
    if (isOpen) {
      reset(getDefaultValues());
    }
  }, [getDefaultValues, isOpen, reset]);

  return (
    <>
      {children({ isOpen, onOpen })}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader fontSize="lg" fontWeight="bold">
              Configurações regionais
            </ModalHeader>

            <ModalBody>
              <Form.Field label="Idioma" size="sm">
                <Select
                  name="lang"
                  options={supportedLanguages}
                  control={control}
                  placeholder="Selecione o seu idioma"
                />
              </Form.Field>
              {hasCurrency && (
                <Form.Field label="Moeda" size="sm" mt="6">
                  <Select
                    name="currency"
                    options={supportedCurrencies}
                    control={control}
                    placeholder="Selecione a sua moeda"
                  />
                </Form.Field>
              )}
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Cancelar</Button>
              <Button colorScheme="blue" ml={3} onClick={onSubmit}>
                Salvar
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
