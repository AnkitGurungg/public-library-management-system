import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

export const useFetchUserById = (id, enabled) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      GLOBAL_SERVICE.get(`/api/v1/la/users/${id}`).then((res) => res.data),
    enabled: !!id && enabled,
  });
};
