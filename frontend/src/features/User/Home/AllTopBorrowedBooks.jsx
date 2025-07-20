import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import { useFetchTopBorrowedBooks } from "@/hooks/useFetchTopBorrowedBooks";

const AllTopBorrowedBooks = () => {
  const size = 10;
  const [page, setPage] = useState(0);

  const { data: topBorrowedBooks } = useFetchTopBorrowedBooks(page, size);

  useEffect(() => {
    // console.log(topBorrowedBooks);
  }, [topBorrowedBooks]);

  return (
    <section className="max-w-6xl mx-auto px-4 mt-6">
      <p className="text-2xl font-bold opacity-80 mb-1.5">Popular Choices</p>
      <p className="text-[16px] mb-5 ">
        Discover Your Next Favorite from Our Most Popular Picks.
      </p>
      <div className="flex flex-grow">
        <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {Array.isArray(topBorrowedBooks?.content) &&
          topBorrowedBooks?.content?.length !== 0 ? (
            topBorrowedBooks?.content?.map((element) => (
              <div key={element?.bookId}>
                <BookCard key={element?.bookId} curBook={element} />
              </div>
            ))
          ) : (
            <p className="col-span-2">
              {topBorrowedBooks?.data?.message ||
                "Book are currently unavailble!!!"}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className="
            px-4 py-2 rounded
            text-white
            bg-blue-600 
            hover:bg-blue-700
            disabled:bg-blue-300
            disabled:text-blue-100
            disabled:cursor-not-allowed
          "
        >
          Prev
        </button>

        <button
          disabled={topBorrowedBooks?.last}
          onClick={() => setPage((p) => p + 1)}
          className="
            px-4 py-2 rounded
            text-white
            bg-blue-600 
            hover:bg-blue-700
            disabled:bg-blue-300
            disabled:text-blue-100
            disabled:cursor-not-allowed
          "
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AllTopBorrowedBooks;
