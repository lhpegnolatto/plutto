import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

interface BreadcrumbContextProps {
  children: ReactNode;
}

type BreadcrumbItem = {
  title: string;
  path: string;
};

type BreadcrumbContextData = {
  breadcrumbItems: BreadcrumbItem[];
  setBreadcrumbItems: (newBreadcrumbItems: BreadcrumbItem[]) => void;
};

const BreadcrumbContext = createContext({} as BreadcrumbContextData);

export function BreadcrumbProvider({ children }: BreadcrumbContextProps) {
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);

  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumbItems,
        setBreadcrumbItems,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
}

export const useBreadcrumb = (
  newBreadcrumbItems?: BreadcrumbItem[]
): BreadcrumbContextData => {
  const { breadcrumbItems, setBreadcrumbItems } = useContext(BreadcrumbContext);

  useEffect(() => {
    if (newBreadcrumbItems) {
      setBreadcrumbItems(newBreadcrumbItems);
    }
  }, [setBreadcrumbItems]); // eslint-disable-line react-hooks/exhaustive-deps

  return { breadcrumbItems, setBreadcrumbItems };
};
