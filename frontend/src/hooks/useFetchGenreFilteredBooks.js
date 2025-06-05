import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

const useFetchGenreFilteredBooks = ({ categoryId }) => {
    console.log(categoryId);
  return useQuery({
    queryKey: ["genreFilteredBooks"],
    queryFn: async () => {
      try {
        const res = await GLOBAL_SERVICE.get(
          `/api/v1/p/resource/get/categories/${categoryId}`
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

export default useFetchGenreFilteredBooks;
