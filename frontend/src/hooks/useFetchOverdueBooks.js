import GLOBAL_SERVICE from "@/services/GlobalServices";
import { useQuery } from "@tanstack/react-query";

const useFetchOverdueBooks = () => {
  return useQuery({
    queryKey: ["overdueBooks"],
    queryFn: async () => {
      try {
        const response = await GLOBAL_SERVICE.get(
          `/api/v1/la/borrows/overdue-books`
        );
        // console.log(response);

        return { status: response.status, data: response.data };
      } catch (error) {
        // console.log(error);
        if (error.status === 404) {
          return { status: error.status, data: error.message };
        }
        return { status: 500, data: "Internal Server Error!!!" };
      }
    },
  });
};

export default useFetchOverdueBooks;
