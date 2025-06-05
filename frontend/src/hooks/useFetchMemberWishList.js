import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchMemberWishList = () => {
  return useQuery({
    queryKey: ["memberWishList"],
    queryFn: async () => {
      try {
        const response = await GLOBAL_SERVICE.get(
          "/api/v1/m/wishlist/get/wishlists"
        );
        console.log(response);
        return { status: response.status, data: response.data };
        
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          return {
            status: error.response.status,
            data: error.response.message,
          };
        }
        return { status: 500, data: "Internal Server Error!!!" };
      }
    },
    
  });
};
