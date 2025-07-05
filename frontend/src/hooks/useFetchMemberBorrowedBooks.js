import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import { useEffect, useState } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export const useFetchMemberBorrowedBooks = ({
  pageNumber = 0,
  pageSize = 11,
  filters = {},
} = {}) => {
  const debouncedFilters = useDebounce(filters, 400);
  return useQuery({
    queryKey: ["memberBorrowedBooks", pageNumber, pageSize, debouncedFilters],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        params.append("pageNumber", pageNumber);
        params.append("pageSize", pageSize);

        if (debouncedFilters.title) {
          params.append("title", debouncedFilters.title);
        }
        if (debouncedFilters.language) {
          params.append("language", debouncedFilters.language);
        }
        if (!!debouncedFilters.categoryId) {
          params.append("categoryId", debouncedFilters.categoryId);
        }
        if (typeof debouncedFilters.extended === "boolean") {
          params.append("extended", debouncedFilters.extended);
        }

        const res = await GLOBAL_SERVICE.get(
          `/api/v1/mla/user/borrowed-books?${params.toString()}`,
        );
        return res.data;
      } catch (error) {
        return [];
      }
    },
  });
};
