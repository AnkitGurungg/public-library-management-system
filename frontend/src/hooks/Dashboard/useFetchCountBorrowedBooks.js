import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

const useFetchCountBorrowedBooks = () => {
  return useQuery({
    queryKey: ["countBorrwedBooks"],
    queryFn: async () => {
      try {
        const res = await GLOBAL_SERVICE.get(
          "/api/v1/la/dashboard/get/count/bb"
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

export default useFetchCountBorrowedBooks;
