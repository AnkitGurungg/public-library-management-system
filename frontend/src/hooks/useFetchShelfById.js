import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchShelfById = (id, enabled) => {
  return useQuery({
    queryKey: ["shelf", id],
    queryFn: () =>
      GLOBAL_SERVICE.get(`/api/v1/la/shelves/${id}`).then((res) => res.data),
    enabled: !!id && enabled,
  });
};
