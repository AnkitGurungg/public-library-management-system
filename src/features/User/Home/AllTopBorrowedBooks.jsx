import { Button } from "@/components/ui/button";
import { UserContext } from "@/contexts/UserContext";
import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import { useFetchTopBorrowedBooks } from "@/hooks/useFetchTopBorrowedBooks";
import GLOBAL_SERVICE, {
  BACKEND_SERVER_BASE_URL,
} from "@/services/GlobalServices";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import HoverBookCard from "./HoverBookCard";

const AllTopBorrowedBooks = () => {
  const { data: topBorrowedBooks, refetch: refetchTopBorrowedBooks } =
    useFetchTopBorrowedBooks();

  useEffect(() => {
    refetchTopBorrowedBooks();
  }, []);

  useEffect(() => {
    console.log(topBorrowedBooks);
  }, [topBorrowedBooks]);

  return (
    <div className="flex flex-grow">
      <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-5 space-y-0">
        {topBorrowedBooks?.status === 200 &&
        Array.isArray(topBorrowedBooks?.data) &&
        topBorrowedBooks?.data?.length !== 0 ? (
          topBorrowedBooks?.data?.map((element) => (
            <div key={element?.borrowBooks?.bookId}>
              <HoverBookCard
                key={element?.borrowBooks?.bookId}
                curBook={element?.borrowBooks}
              />
            </div>
          ))
        ) : (
          <p className="col-span-2">
            {topBorrowedBooks?.data?.message ||
              "Book are currently unavailble!!1"}
          </p>
        )}
      </div>
    </div>
  );
};

export default AllTopBorrowedBooks;
