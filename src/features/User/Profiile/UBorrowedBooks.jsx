import { useFetchMemberBorrowedBooks } from "@/hooks/useFetchMemberBorrowedBooks";
import UBorrowedBooksCard from "./UBorrowedBooksCard";
import { useEffect } from "react";

const UBorrowedBooks = () => {
  const {
    data: memberBorrowedBooks,
    refetch: refetchMemberBorrowedBooks,
    isLoading,
  } = useFetchMemberBorrowedBooks();

  useEffect(() => {
    refetchMemberBorrowedBooks();
  }, []);

  useEffect(() => {
    console.log(Array.isArray(memberBorrowedBooks?.data));
    console.log(memberBorrowedBooks);
  }, [memberBorrowedBooks]);

  return (
    <section>
      <div className="flex flex-col">
        <div>
          {memberBorrowedBooks?.status === 200 &&
            Array.isArray(memberBorrowedBooks?.data) && (
              <h1 className="text-2xl text-black m-6 font-bold">
                Borrowed Books ({memberBorrowedBooks?.data?.length})
              </h1>
            )}
        </div>
        {memberBorrowedBooks?.status === 200 &&
          Array.isArray(memberBorrowedBooks?.data) &&
          memberBorrowedBooks?.data.map((currBorrowedBook) => (
            <UBorrowedBooksCard
              key={currBorrowedBook.bookId}
              currBorrowedBook={currBorrowedBook}
            />
          ))}

        {memberBorrowedBooks?.data?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              You have not borrowed any books yet
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UBorrowedBooks;
