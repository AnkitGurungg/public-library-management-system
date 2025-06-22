import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchBookById = (id, enabled) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () =>
      GLOBAL_SERVICE.get(`/api/v1/la/books/${id}`).then((res) => res.data),
    enabled: !!id && enabled,
  });
};
