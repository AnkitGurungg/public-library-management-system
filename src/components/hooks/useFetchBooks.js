import GlobalService from "@/services/GlobalServices";
import { useQuery } from "@tanstack/react-query";

export const useFetchBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      try {
        const res = await GlobalService("/api/book/get/books")
        console.log(res)
        return { status: res.data.status, data: res.data };
      } catch (error) {
        if (error && error.response.status===404) {
          return {status: error.response.status, data: error.response.message}
        }
        return { status: 500, data: "Internal Server Error!!!" };
      }
    },
  });
};
