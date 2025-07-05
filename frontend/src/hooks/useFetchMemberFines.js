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

export const useFetchMemberFines = ({
  page = 0,
  size = 11,
  filters = {},
} = {}) => {
  const debouncedFilters = useDebounce(filters, 400);

  return useQuery({
    queryKey: ["memberFines", page, size, debouncedFilters],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("size", size);

        if (debouncedFilters.title) {
          params.append("title", debouncedFilters.title);
        }
        if (!!debouncedFilters.categoryId) {
          params.append("categoryId", debouncedFilters.categoryId);
        }
        if (typeof debouncedFilters.extended === "boolean") {
          params.append("extended", debouncedFilters.extended);
        }
        if (typeof debouncedFilters.paid === "boolean") {
          params.append("paid", debouncedFilters.paid);
        }

        const res = await GLOBAL_SERVICE.get(
          `/api/v1/mla/user/fines?${params.toString()}`,
        );
        return res.data;
      } catch (error) {
        return [];
      }
    },
  });
};
