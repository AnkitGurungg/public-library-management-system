import GLOBAL_SERVICE from "@/services/GlobalServices";
import { useQuery } from "@tanstack/react-query";

const useFetchLibrarian = () => {
  return useQuery({
    queryKey: ["librarian"],
    queryFn: async () => {
      try {
        const res = await GLOBAL_SERVICE.get(
          "/api/v1/a/librarian/get/librarians"
        );
        console.log(res.config.headers.getContentType());
        return { status: res.status, data: res.data };
      } catch (error) {
        console.log("err", error);
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

export default useFetchLibrarian;
