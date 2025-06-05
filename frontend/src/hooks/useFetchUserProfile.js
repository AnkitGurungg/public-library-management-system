import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await GLOBAL_SERVICE.get("/api/v1/m/user/profile/get");
        console.log(res);
        return { status: res.status, data: res.data };
      } catch (error) {
        if (error && error.response.status === 404) {
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
