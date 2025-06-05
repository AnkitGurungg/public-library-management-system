import GLOBAL_SERVICE from "@/services/GlobalServices";
import { useQuery } from "@tanstack/react-query";

const useFetchDisplayCategory = () => {
  return useQuery({
    queryKey: ["displayCategories"],
    queryFn: async () => {
      try {
        const res = await GLOBAL_SERVICE.get(
          "/api/v1/p/resource/category/get/categories"
        );
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

export default useFetchDisplayCategory;
