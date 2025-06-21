import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchCategoryById = (id, enabled) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () =>
      GLOBAL_SERVICE.get(`/api/v1/la/categories/${id}`).then((res) => res.data),
    enabled: !!id && enabled,
    staleTime: 5000, //5sec
  });
};
