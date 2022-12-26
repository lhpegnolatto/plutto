import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AppLoaderContextProps {
  children: ReactNode;
}

type AppLoaderContextData = {
  isAppLoading: boolean;
  setIsAppLoading: Dispatch<SetStateAction<boolean>>;
};

const AppLoaderContext = createContext({} as AppLoaderContextData);

export function AppLoaderProvider({ children }: AppLoaderContextProps) {
  const [isAppLoading, setIsAppLoading] = useState(false);

  return (
    <AppLoaderContext.Provider
      value={{
        isAppLoading,
        setIsAppLoading,
      }}
    >
      {children}
    </AppLoaderContext.Provider>
  );
}

export const useAppLoaderContext = () => useContext(AppLoaderContext);
