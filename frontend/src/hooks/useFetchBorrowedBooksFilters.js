import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchBorrowedBooksFilters = () => {
  return useQuery({
    queryKey: ["borrowedBooksFilters"],
    queryFn: async () => {
      try {
        const response = await GLOBAL_SERVICE.get(
          `/api/v1/mla/user/borrowed-books/filters`,
        );
        return response.data;
      } catch (error) {
        return [];
      }
    },
  });
};
