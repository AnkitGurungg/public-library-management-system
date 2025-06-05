import GLOBAL_SERVICE from "@/services/GlobalServices";
import { useQuery } from "@tanstack/react-query";

const useFetchNewArrivalBooks = () => {
  return useQuery({
    queryKey: ["displayBooks"],
    queryFn: async () => {
      try {
        const res = await GLOBAL_SERVICE.get(
          "/api/v1/p/resource/book/get/new-arrivals"
        );
        console.log(res);
        return { status: res.status, data: res.data };
      } catch (error) {
        console.log(error);
        if (error && error.response.status === 404) {
          return {
            status: error.response.status,
            data: error.response.message,
          };
        }
        return { status: 500, data: error.response.data.message };
      }
    },
  });
};

export default useFetchNewArrivalBooks;
