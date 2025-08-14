import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

const useFetchGenreFilteredBooks = ({ categoryId }) => {
  return useQuery({
    queryKey: ["genreFilteredBooks", categoryId],
    queryFn: async () => {
      const res = await GLOBAL_SERVICE.get(
        `/api/v1/p/resource/categories/${categoryId}/books`,
      );
      return { status: res.status, data: res.data };
    },
    enabled: !!categoryId,
  });
};

export default useFetchGenreFilteredBooks;
