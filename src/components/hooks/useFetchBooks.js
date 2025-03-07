import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/book/get/books");
        return { status: res.data.status, data: res.data };
      } catch (error) {
        if (error && error.response.status) {
          
        }
        return { status: 500, data: "Internal Server Error!!!" };
      }
    },
  });
};
