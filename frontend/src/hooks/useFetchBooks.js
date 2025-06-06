import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      try {
        const res = await GLOBAL_SERVICE.get("/api/v1/la/books");
        // console.log(res)
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
