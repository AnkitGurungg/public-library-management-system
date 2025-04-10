import { useFetchMemberBorrowedBooks } from "@/hooks/useFetchMemberBorrowedBooks";
import { useEffect } from "react";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";

const UBorrowedBooksCard = ({ currBorrowedBook }) => {
  const { data: memberBorrowedBooks, refetch: refetchMemberBorrowedBooks } =
    useFetchMemberBorrowedBooks();

  useEffect(() => {
    refetchMemberBorrowedBooks();
  }, [currBorrowedBook]);

  return (
    <section>
      <div className="flex">
        <div>
          <img
            src={`${BACKEND_SERVER_BASE_URL}${currBorrowedBook.getImageURL}`}
            alt="Loading"
            className="bg-red-500 w-36 h-50"
          />
        </div>
        <div className="flex flex-col w-80 gap-14">
          <div className="flex flex-row gap-32">
            <div className="w-auto">
              <p>{currBorrowedBook.getTitle}</p>
              <p className="w-auto">By {currBorrowedBook.getAuthor}</p>
            </div>
            <div>
              <p>{currBorrowedBook.getCategoryName}</p>
              <p>{currBorrowedBook.getEdition}</p>
              <p>{currBorrowedBook.getBorrowDate}</p>
              <p>{currBorrowedBook.getDueDate}</p>
              <p>{currBorrowedBook.isReturnStatus ? "YES" : "NO"}</p>
            </div>
          </div>
          <div className="flex flex-row gap-32">
            <div className="w-auto"></div>
            <div>
              <button className="cursor-pointer">Remove</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </section>
  );
};

export default UBorrowedBooksCard;
