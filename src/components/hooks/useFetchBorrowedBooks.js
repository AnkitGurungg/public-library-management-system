import GlobalService from "@/services/GlobalServices";
import { useQuery } from "@tanstack/react-query";

export const useFetchBorrowedBooks = () => {
  return useQuery({
    queryKey: ["borrowedBooks"],
    queryFn: async () => {
      try {
        const response = await GlobalService.get("/api/borrow/get/borrows");
        console.log(response);
        return { status: response.status, data: response.data };
      } catch (error) {
        console.log(error);
        if (error.status === 404) {
          return { status: error.status, data: error.message };
        }
        return { status: 500, data: "Internal Server Error!!!" };
      }
    },
  });
};
