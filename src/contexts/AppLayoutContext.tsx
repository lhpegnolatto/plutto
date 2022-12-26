import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

interface AppLayoutContextProps {
  children: ReactNode;
}

type BreadcrumbItem = {
  title: string;
  path: string;
};

type AppLayoutContextData = {
  breadcrumbItems: BreadcrumbItem[];
  setBreadcrumbItems: (newBreadcrumbItems: BreadcrumbItem[]) => void;
};

const AppLayoutContext = createContext({} as AppLayoutContextData);

export function AppLayoutProvider({ children }: AppLayoutContextProps) {
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);

  return (
    <AppLayoutContext.Provider
      value={{
        breadcrumbItems,
        setBreadcrumbItems,
      }}
    >
      {children}
    </AppLayoutContext.Provider>
  );
}

export const useAppLayoutContext = () => useContext(AppLayoutContext);

export const useAppLayoutBreadcrumb = (
  newBreadcrumbItems: BreadcrumbItem[]
) => {
  const { setBreadcrumbItems } = useContext(AppLayoutContext);

  useEffect(() => {
    setBreadcrumbItems(newBreadcrumbItems);
  }, [setBreadcrumbItems]); // eslint-disable-line react-hooks/exhaustive-deps
};
