import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchRecentlyPublished = (page, size) => {
  return useQuery({
    queryKey: ["recentlyPublished", page, size],
    queryFn: async () => {
      const res = await GLOBAL_SERVICE.get(
        `/api/v1/p/resource/books/recently-published?page=${page}&size=${size}`,
      );
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60,
    retry: 1,
    onError: (err) => {
      console.error("Error fetching recently published books:", err);
    },
  });
};
