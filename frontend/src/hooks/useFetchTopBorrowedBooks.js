import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchTopBorrowedBooks = (page, size) => {
  return useQuery({
    queryKey: ["topBorrowedBooks", page, size],
    queryFn: async () => {
      const res = await GLOBAL_SERVICE.get(
        `/api/v1/p/resource/books/top-borrowed-books?page=${page}&size=${size}`,
      );
      // await new Promise((r) => setTimeout(r, 2000));
      // throw Error
      // return [];
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60,
    retry: 1,
    onError: (err) => {
      console.error("Error fetching top borrowed books:", err);
    },
  });
};
