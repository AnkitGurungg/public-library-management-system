import ShelfAPI from "@/services/ShelfServices";
import { useQuery } from "@tanstack/react-query";

export const useFetchShelfs = () => {
  return useQuery({
    queryKey: ["shelfs"],
    queryFn: async () => {
      try {
        const res = await ShelfAPI("/get/shelves");
        return { status: res.status, data: res.data };
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return {
            status: error.response.status,
            data: error.response.data.message,
          };
        }
        return { status: 500, data: "Internal Server Error!!!" };
      }
    },
  });
};
