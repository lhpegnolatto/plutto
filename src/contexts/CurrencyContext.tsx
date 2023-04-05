import { parseCookies, setCookie } from "nookies";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

interface CurrencyContextProps {
  children: ReactNode;
}

type CurrencyContextData = {
  currentCurrency: string;
  handleCurrencyChange: (currency: string) => void;
};

const CURRENCY_COOKIE_KEY = "currency";
const DEFAULT_CURRENCY = "BRL";

export const CurrencyContext = createContext({} as CurrencyContextData);

export function CurrencyProvider({ children }: CurrencyContextProps) {
  const [currentCurrency, setCurrentCurrency] = useState(DEFAULT_CURRENCY);

  function handleCurrencyChange(newCurrency: string) {
    setCurrentCurrency(newCurrency);
    setCookie(null, CURRENCY_COOKIE_KEY, newCurrency, { path: "/" });
  }

  useEffect(() => {
    const { currency } = parseCookies();
    if (currency) {
      setCurrentCurrency(currency);
      return;
    }

    setCookie(null, CURRENCY_COOKIE_KEY, DEFAULT_CURRENCY, { path: "/" });
    setCurrentCurrency(DEFAULT_CURRENCY);
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        handleCurrencyChange,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrencyContext = () => useContext(CurrencyContext);
