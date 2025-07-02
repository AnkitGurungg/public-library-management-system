import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchMemberWishListIds = (enabled) => {
  return useQuery({
    queryKey: ["memberWishListIds"],
    queryFn: async () => {
      try {
        const response = await GLOBAL_SERVICE.get("/api/v1/m/wishlists/ids");
        return response.data;
      } catch (error) {
        return [];
      }
    },
    enabled,
    retry: 1,
  });
};
