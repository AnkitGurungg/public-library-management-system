import GLOBAL_SERVICE from "@/services/GlobalServices";
import { useQuery } from "@tanstack/react-query";

const useFetchLibrarian = () => {
  return useQuery({
    queryKey: ["librarian"],
    queryFn: async () => {
      try {
        const res = await GLOBAL_SERVICE.get("/api/v1/a/librarians");
        // console.log(res);

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
