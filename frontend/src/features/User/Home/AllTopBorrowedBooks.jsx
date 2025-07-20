import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import { useFetchTopBorrowedBooks } from "@/hooks/useFetchTopBorrowedBooks";

const AllTopBorrowedBooks = () => {
  const size = 10;
  const [page, setPage] = useState(0);

  const {
    data: topBorrowedBooks,
    isLoading,
    isError,
    error,
    isFetching,
  } = useFetchTopBorrowedBooks(page, size);

  useEffect(() => {
    // console.log(topBorrowedBooks);
  }, [topBorrowedBooks]);

  const booksAvailable =
    Array.isArray(topBorrowedBooks?.content) &&
    topBorrowedBooks?.content?.length > 0;

  return (
    <section className="max-w-6xl mx-auto px-4 mt-6">
      <p className="text-2xl font-bold opacity-80 mb-1.5">Popular Choices</p>
      <p className="text-[16px] mb-5 ">
        Discover Your Next Favorite from Our Most Popular Picks.
      </p>

      <div className="flex flex-grow">
        <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-5 gap-3 w-full min-h-[370px]">
          {isLoading ? (
            <div className="col-span-5 flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 text-lg">Loading...</p>
            </div>
          ) : isError ? (
            <p className="col-span-5 flex flex-col items-center justify-center py-20 text-gray-700">
              {error?.message || "Failed to load books."}
            </p>
          ) : !booksAvailable ? (
            <p className="col-span-5 flex flex-col items-center justify-center py-20 text-gray-500">
              No books available at the moment.
            </p>
          ) : (
            topBorrowedBooks.content.map((book) => (
              <BookCard key={book.bookId} curBook={book} />
            ))
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          disabled={page === 0 || isFetching || !booksAvailable}
          onClick={() => setPage((p) => p - 1)}
          className="
            px-4 py-2 rounded-md
            text-white
            bg-gray-500
            hover:bg-gray-600
            disabled:bg-gray-300
            disabled:text-gray-500
            disabled:cursor-not-allowed
            transition-colors
          "
        >
          Prev
        </button>

        <button
          disabled={topBorrowedBooks?.last || isFetching || !booksAvailable}
          onClick={() => setPage((p) => p + 1)}
          className="
            px-4 py-2 rounded-md
            text-white
            bg-gray-500
            hover:bg-gray-600
            disabled:bg-gray-300
            disabled:text-gray-500
            disabled:cursor-not-allowed
            transition-colors
          "
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default AllTopBorrowedBooks;
