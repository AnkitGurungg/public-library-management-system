import { useQuery } from "@tanstack/react-query";
import GLOBAL_SERVICE from "@/services/GlobalServices";

const useFetchCountVm = () => {
  return useQuery({
    queryKey: ["countVm"],
    queryFn: async () => {
      try {
        const res = await GLOBAL_SERVICE.get(
          "/api/v1/la/dashboard/members/count-vm"
        );
        console.log(res);
        return { status: res.status, data: res.data };
      } catch (error) {
        console.log(error);
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

export default useFetchCountVm;
