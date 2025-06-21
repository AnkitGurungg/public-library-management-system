import { useState, useEffect } from "react";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import { useQuery } from "@tanstack/react-query";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useFetchOverdueBooks = ({
  pageIndex = 0,
  pageSize = 11,
  filters = {},
} = {}) => {
  const debouncedFilters = useDebounce(filters, 400);

  return useQuery({
    queryKey: ["overdueBooks", pageIndex, pageSize, debouncedFilters],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", pageIndex);
      params.append("size", pageSize);

      if (debouncedFilters.name) {
        params.append("name", debouncedFilters.name);
      }
      if (typeof debouncedFilters.extended === "boolean") {
        params.append("extended", debouncedFilters.extended);
      }
      if (typeof debouncedFilters.returnStatus === "boolean") {
        params.append("returnStatus", debouncedFilters.returnStatus);
      }

      try {
        const response = await GLOBAL_SERVICE.get(
          `/api/v1/la/borrows/overdue-books?${params.toString()}`
        );
        // console.log(response);

        return { status: response.status, data: response.data };
      } catch (error) {
        // console.log(error);
        if (error.status === 404) {
          return { status: error.status, data: error.message };
        }
        return { status: 500, data: "Internal Server Error!!!" };
      }
    },
  });
};

export default useFetchOverdueBooks;
