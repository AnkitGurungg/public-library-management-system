import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchWishlistFilters = () => {
  return useQuery({
    queryKey: ["wishListFilters"],
    queryFn: async () => {
      try {
        const response = await GLOBAL_SERVICE.get(
          `/api/v1/m/wishlists/filters`,
        );
        return response.data;
      } catch (error) {
        return [];
      }
    },
  });
};
