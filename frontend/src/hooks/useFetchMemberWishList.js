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

export const useFetchMemberWishList = ({
  page = 0,
  size = 11,
  filters = {},
} = {}) => {
  const debouncedFilters = useDebounce(filters, 400);

  return useQuery({
    queryKey: ["memberWishList", page, size, debouncedFilters],
    queryFn: async () => {
      try {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("size", size);

        if (debouncedFilters.title) {
          params.append("title", debouncedFilters.title);
        }
        if (debouncedFilters.language) {
          params.append("language", debouncedFilters.language);
        }
        if (!!debouncedFilters.categoryId) {
          params.append("categoryId", debouncedFilters.categoryId);
        }
        if (typeof debouncedFilters.inStock === "boolean") {
          params.append("inStock", debouncedFilters.inStock);
        }

        const response = await GLOBAL_SERVICE.get(
          `/api/v1/m/wishlists?${params.toString()}`,
        );
        return response.data;
      } catch (error) {
        return [];
      }
    },
  });
};
