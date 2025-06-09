import GLOBAL_SERVICE from "@/services/GlobalServices";
import { useQuery } from "@tanstack/react-query";

export const useFetchVerifiedMembers = () => {
  return useQuery({
    queryKey: ["verifiedMembers"],
    queryFn: async () => {
      try {
        const res = await GLOBAL_SERVICE.get("/api/v1/la/users/vm");
        // console.log("Verified Members", res);

        return { status: res.status, data: res.data };
      } catch (error) {
        if (error.status === 404) {
          // console.log("Verified Members not found error", error);
          
          return { status: error.status, data: error.response.data.message };
        }
        return { status: 500, data: "Internal Server Error" };
      }
    },
  });
};
