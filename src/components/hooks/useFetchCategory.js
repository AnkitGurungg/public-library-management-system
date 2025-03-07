import CategoryAPI from "@/services/CategoryServices";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await CategoryAPI("/get/categories");
        return { status: res.status, data: res.data };
      } catch (error) {
        console.log(error);
        if (error.response) {
          return {
            status: error.response.status,
            data: error.response.data.message,
          };
        }
        return { status: 500, data: "Internal Server error" };
      }
    },
  });
};
