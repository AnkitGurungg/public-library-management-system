import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchNewArrivalBooks = (page, size) => {
  return useQuery({
    queryKey: ["newlyArrivedBooks", page, size],
    queryFn: async () => {
      const res = await GLOBAL_SERVICE.get(
        `/api/v1/p/resource/books/new-arrivals?page=${page}&size=${size}`,
      );
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60,
    onError: (err) => {
      console.error("Error fetching new arrival books:", err);
    },
  });
};
