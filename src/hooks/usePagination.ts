import { useCallback, useMemo, useState } from "react";

interface UsePaginationProps {
  registersPerPage?: number;
}

export function usePagination({ registersPerPage = 10 }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = useCallback((newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
  }, []);

  const indexesRange = useMemo(() => {
    const from = (currentPage - 1) * registersPerPage;
    const to = from + registersPerPage - 1;

    return { from, to };
  }, [currentPage, registersPerPage]);

  return { currentPage, onPageChange, indexesRange };
}
